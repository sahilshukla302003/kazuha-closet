from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from mongoengine.errors import DoesNotExist

class ProductDetailView(APIView):
    def get(self, request, id):
        try:
            product = Product.objects.get(id=str(id))
            return Response(product.to_mongo().to_dict(), status=200)
        except DoesNotExist:
            return Response({"error": "Product not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
