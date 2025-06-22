from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('home.urls')),     # e.g., login, register, user APIs
    path('api/', include('product.urls')),  # product-related APIs
]