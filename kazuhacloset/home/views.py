from pymongo import MongoClient
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    RegisterSerializer, LoginSerializer, ProfileSerializer,
    UpdateProfileSerializer, AddToCartSerializer
)
from django.contrib.auth.hashers import make_password, check_password  
from bson.objectid import ObjectId
import jwt
from datetime import datetime, timedelta

# Load environment variables from .env
load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client["LoginData"]
users_collection = db["Users"]

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

# Utility to create JWT
def create_jwt(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

# Utility to decode JWT and return user_id
def decode_jwt(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data
            user_data['password'] = make_password(user_data['password'])
            user_data['cart'] = {}
            result = users_collection.insert_one(user_data)
            user_id=result.inserted_id
            token=create_jwt(user_id)
            return Response({"message": "User registered successfully", "token":token},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = users_collection.find_one({"email": email})
            if user and check_password(password, user['password']):
                token = create_jwt(user["_id"])
                return Response({
                    "message": "Login successful",
                    "token": token,
                    "first_name": user.get("first_name", ""),
                    "id": str(user.get("_id"))
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddToCartView(APIView):
    def post(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"error": "Authorization token missing"}, status=401)
        token = auth_header.split(" ")[1]
        user_id=decode_jwt(token)
        print(user_id)
        if not user_id:
            return Response({"error": "Invalid or expired token"}, status=401)
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            product_id = data["product_id"]
            quantity = data["quantity"]
            size = data["size"]
            cart_key = product_id
            cart_value = [quantity, size]
            result = users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {f"cart.{cart_key}": cart_value}}
            )

            if result.modified_count == 1:
                return Response({"message": "Item added to cart"}, status=200)
            else:
                return Response({"error": "User not found or cart not updated"}, status=404)

        return Response(serializer.errors, status=400)


class CartView(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"error": "Authorization token missing"}, status=401)

        token = auth_header.split(" ")[1]
        user_id = decode_jwt(token)
        if not user_id:
            return Response({"error": "Invalid or expired token"}, status=401)

        user = users_collection.find_one({"_id": ObjectId(user_id)}, {"cart": 1})
        if not user:
            return Response({"error": "User not found"}, status=404)

        return Response({"cart": user.get("cart", {})}, status=200)


class UserProfileView(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"error": "Authorization token missing"}, status=status.HTTP_401_UNAUTHORIZED)

        token = auth_header.split(" ")[1]
        user_id = decode_jwt(token)

        if not user_id:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)

        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # 4. Prepare and return serialized user data
        user_data = {
            "id": str(user["_id"]),
            "email": user.get("email", ""),
            "first_name": user.get("first_name", ""),
            "last_name": user.get("last_name", ""),
            "phone": user.get("phone", "")
        }

        serializer = ProfileSerializer(user_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateProfileView(APIView):
    def put(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"error": "Authorization token missing"}, status=401)

        token = auth_header.split(" ")[1]
        user_id = decode_jwt(token)
        if not user_id:
            return Response({"error": "Invalid or expired token"}, status=401)

        serializer = UpdateProfileSerializer(data=request.data)
        if serializer.is_valid():
            update_data = serializer.validated_data

            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return Response({"error": "User not found"}, status=404)

            users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )

            return Response({"message": "Profile updated successfully"}, status=200)

        return Response(serializer.errors, status=400)
    
class Remove_Item(APIView):
    def delete(self, request, id):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"error": "Authorization token missing"}, status=401)

        token = auth_header.split(" ")[1]
        user_id = decode_jwt(token)
        if not user_id:
            return Response({"error": "Invalid or expired token"}, status=401)

        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return Response({"error": "User not found"}, status=404)

        cart = user.get("cart", {})
        if id not in cart:
            return Response({"error": "Item not found in cart"}, status=404)

        users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$unset": {f"cart.{id}": ""}}
        )
        return Response({"message": "Item removed from cart successfully"}, status=200)
    



