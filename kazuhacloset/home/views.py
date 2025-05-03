from pymongo import MongoClient
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
import logging

# Load environment variables from .env
load_dotenv()

# Setup logging
logger = logging.getLogger(__name__)

# Connect to MongoDB Atlas
try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client["LoginData"]
    users_collection = db["Users"]
    logger.info("✅ Connected to MongoDB Atlas")
except Exception as e:
    logger.error(f"❌ MongoDB connection failed: {e}")
    raise

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data

            # Hash the password before saving
            user_data['password'] = make_password(user_data['password'])

            try:
                result = users_collection.insert_one(user_data)
                logger.info(f"✅ User inserted with ID: {result.inserted_id}")
                return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"❌ Failed to insert user: {e}")
                return Response({"error": "Database write failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            try:
                user = users_collection.find_one({"email": email})
            except Exception as e:
                logger.error(f"❌ Failed to query MongoDB: {e}")
                return Response({"error": "Database query failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if user and check_password(password, user['password']):
                # MongoDB documents don't have a Django `User` instance, so manually create token
                class TempUser:
                    def __init__(self, email, user_id):
                        self.email = email
                        self.id = user_id  # Add 'id' to be used by RefreshToken
                        self.pk = str(user_id)

                temp_user = TempUser(email=email, user_id=str(user["_id"]))
                refresh = RefreshToken.for_user(temp_user)
                access_token = str(refresh.access_token)

                return Response({
                    "message": "Login successful",
                    "access": access_token,
                    "refresh": str(refresh),
                    "first_name": user.get("first_name", "")
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

