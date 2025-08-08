from mongoengine import Document, StringField, DictField

class User(Document):
    meta = {'collection': 'Users'}  # 👈 Ensures it maps to the correct MongoDB collection

    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True, unique=True)
    phone = StringField(required=True)
    password = StringField(required=True)
    cart = DictField()
