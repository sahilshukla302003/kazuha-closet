from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    RegisterSerializer, LoginSerializer, ProfileSerializer,
    UpdateProfileSerializer, AddToCartSerializer
)
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from .models import User
from mongoengine.errors import NotUniqueError

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"





# ---------------------- JWT UTILITY ----------------------
def create_jwt(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_jwt(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["user_id"]
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def get_user_from_token(request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None, Response({"error": "Authorization token missing"}, status=401)

    token = auth_header.split(" ")[1]
    user_id = decode_jwt(token)
    if not user_id:
        return None, Response({"error": "Invalid or expired token"}, status=401)

    try:
        user = User.objects.get(id=user_id)
        return user, None
    except User.DoesNotExist:
        return None, Response({"error": "User not found"}, status=404)


# ---------------------- VIEWS ----------------------
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user_data = serializer.validated_data
                
                user = User(
                    email=user_data['email'],
                    password=make_password(user_data['password']),
                    first_name=user_data.get('first_name', ''),
                    last_name=user_data.get('last_name', ''),
                    phone=user_data.get('phone', ''),
                    cart={}
                )
                user.save()
                token = create_jwt(user.id)
                return Response({"message": "User registered successfully", "token": token}, status=201)
            except NotUniqueError:
                return Response({"error": "Email already exists"}, status=400)
        else:
            # 👇 Log the serializer error
            return Response({"errors": serializer.errors}, status=400)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data['email'])
                if check_password(serializer.validated_data['password'], user.password):
                    token = create_jwt(user.id)
                    return Response({
                        "message": "Login successful",
                        "token": token,
                        "first_name": user.first_name,
                        "id": str(user.id)
                    }, status=200)
            except User.DoesNotExist:
                pass
            return Response({"error": "Invalid credentials"}, status=401)
        return Response(serializer.errors, status=400)


class AddToCartView(APIView):
    def post(self, request):
        user, error = get_user_from_token(request)
        if error:
            return error

        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            cart_value = [serializer.validated_data['quantity'], serializer.validated_data['size']]
            user.cart[product_id] = cart_value
            user.save()
            return Response({"message": "Item added to cart"}, status=200)
        return Response(serializer.errors, status=400)


class CartView(APIView):
    def get(self, request):
        user, error = get_user_from_token(request)
        if error:
            return error
        return Response({"cart": user.cart}, status=200)


class UserProfileView(APIView):
    def get(self, request):
        user, error = get_user_from_token(request)
        if error:
            return error

        user_data = {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone
        }
        serializer = ProfileSerializer(user_data)
        return Response(serializer.data, status=200)


class UpdateProfileView(APIView):
    def put(self, request):
        user, error = get_user_from_token(request)
        if error:
            return error

        serializer = UpdateProfileSerializer(data=request.data)
        if serializer.is_valid():
            for field, value in serializer.validated_data.items():
                setattr(user, field, value)
            user.save()
            return Response({"message": "Profile updated successfully"}, status=200)
        return Response(serializer.errors, status=400)


class Remove_Item(APIView):
    def delete(self, request, id):
        user, error = get_user_from_token(request)
        if error:
            return error

        if id in user.cart:
            del user.cart[id]
            user.save()
            return Response({"message": "Item removed from cart successfully"}, status=200)
        else:
            return Response({"error": "Item not found in cart"}, status=404)
