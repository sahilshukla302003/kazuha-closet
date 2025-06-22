from django.urls import path
from .views import ProductDetailView

urlpatterns = [
    path('productdetail/<str:id>/', ProductDetailView.as_view(), name='product-detail'),
]