from pymongo import MongoClient
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password, check_password  # ✨ Added this

# Load environment variables from .env
load_dotenv()

# Connect to MongoDB Atlas
client = MongoClient(os.getenv('MONGO_URI'))
db = client["LoginData"]
users_collection = db["Users"]

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data

            # Hash the password before saving
            user_data['password'] = make_password(user_data['password'])  # ✨ Hashing here

            users_collection.insert_one(user_data)

            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = users_collection.find_one({"email": email})

            if user and check_password(password, user['password']):
                # ✅ Return first_name for profile icon
                return Response({
                    "message": "Login successful",
                    "first_name": user.get("first_name", "")
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
