from pymongo import MongoClient
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer,ProfileSerializer,UpdateProfileSerializer,AddToCartSerializer
from django.contrib.auth.hashers import make_password, check_password  
from bson.objectid import ObjectId

# Load environment variables from .env
load_dotenv()

# Connect to MongoDB Atlas
client = MongoClient(os.getenv('MONGO_URI'))
db = client["LoginData"]
users_collection = db["Users"]

class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data
            # Hash the password before saving
            user_data['password'] = make_password(user_data['password'])  # ✨ Hashing here
            user_data['cart'] = {}
            users_collection.insert_one(user_data)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AddToCartView(APIView):
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user_id = data["user_id"]
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
    def get(self, request, user_id):
        user = users_collection.find_one({"_id": ObjectId(user_id)}, {"cart": 1})
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"cart": user.get("cart", {})}, status=status.HTTP_200_OK)
    
    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = users_collection.find_one({"email": email})

            if user and check_password(password, user['password']):
                return Response({
                    "message": "Login successful",
                    "first_name": user.get("first_name", ""),
                    "id": str(user.get("_id")),  
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    def get(self, request, user_id): 
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return Response({"error": "User not found"}, status=404)

        user_data = {
            "id": str(user["_id"]),
            "email": user.get("email", ""),
            "first_name": user.get("first_name", ""),
            "last_name": user.get("last_name", ""),
            "phone": user.get("phone", ""),
        }
        serializer = ProfileSerializer(user_data)
        return Response(serializer.data)
    

class UpdateProfileView(APIView):
    def put(self, request, user_id):
        serializer = UpdateProfileSerializer(data=request.data)
        if serializer.is_valid():
            update_data = serializer.validated_data

            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            
            users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )

            return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

