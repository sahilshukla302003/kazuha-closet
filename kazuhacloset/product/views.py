from django.shortcuts import render
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response



load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db=client["Product"]
product_collection = db["product_id"]


class ProductDetailView(APIView):
    def get(self, request, id):
        try:
            product = product_collection.find_one({"id": str(id)})
            if not product:
                return Response({"error": "Product not found"}, status=404)
            product["_id"] = str(product["_id"])
            return Response(product, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        