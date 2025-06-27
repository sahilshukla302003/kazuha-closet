from django.urls import path
from .views import RegisterView, LoginView,UserProfileView,UpdateProfileView,AddToCartView,CartView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('updateprofile/', UpdateProfileView.as_view(), name='update-profile'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/', CartView.as_view(), name='get_cart'),
]
