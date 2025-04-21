from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views import View

# User Registration View
class RegisterView(View):
    def get(self, request):
        # Render registration page if needed (you can create an HTML form for registration)
        return render(request, 'register.html')

    def post(self, request):
        # Handle the registration logic
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        phone_number = request.POST.get('phone_number')

        # Basic validation
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)

        # Check if the email already exists
        if get_user_model().objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email is already in use'}, status=400)

        # Create the user
        user = get_user_model().objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number
        )

        return JsonResponse({
            'message': 'User created successfully',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        })


# User Login View
class LoginView(View):
    def post(self, request):
        # Handle user login
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Basic validation
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)

        # Authenticate user
        user = authenticate(request, username=email, password=password)

        if user is not None:
            if user.is_active:
                # Log the user in (this will set the session data)
                login(request, user)
                return JsonResponse({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name
                    }
                })
            else:
                return JsonResponse({'error': 'Account is inactive'}, status=400)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
