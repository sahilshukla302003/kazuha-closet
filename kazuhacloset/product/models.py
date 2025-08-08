from django.db import models

# Create your models here.
# models.py
from mongoengine import Document, StringField, IntField

class Product(Document):
    id = StringField(required=True, unique=True)
    name = StringField(required=True)
    description = StringField()
    price = IntField()
    size = StringField()
    image_url = StringField()

    meta = {'collection': 'product_id'}  # maps to your existing MongoDB collection
