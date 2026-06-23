from rest_framework import serializers

from .models import Book

class ListBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "book_id", "title", "isbn"]

class GetBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        