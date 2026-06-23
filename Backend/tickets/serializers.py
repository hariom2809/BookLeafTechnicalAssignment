from rest_framework import serializers

from .models import Ticket

class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["subject", "description", "category", "book"]

class ListTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "subject", "status"]