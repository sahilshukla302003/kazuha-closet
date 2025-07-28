"""
WSGI config for kazuhacloset project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kazuhacloset.settings')

# Create application
application = get_wsgi_application()

# 👇 Run migrations and collectstatic automatically on startup
try:
    import django
    from django.core.management import call_command

    django.setup()
    call_command('migrate', interactive=False)
    call_command('collectstatic', interactive=False, verbosity=0)
    print("Migrations and static collection completed.")
except Exception as e:
    print("Error during startup script execution:", e)
