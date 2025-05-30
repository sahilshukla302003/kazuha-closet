from django.urls import path
from .views import RegisterView, LoginView,UserProfileView,UpdateProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/<str:user_id>/', UserProfileView.as_view(), name='user-profile'),
    path('updateprofile/<str:user_id>/', UpdateProfileView.as_view(), name='update-profile'),
]
