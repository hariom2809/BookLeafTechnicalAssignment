from rest_framework import serializers

from .models import Ticket, TicketResponse


class TicketResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketResponse
        fields = ["id", "response", "notes", "created_at"]


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["subject", "description", "book"]

class ListTicketSerializer(serializers.ModelSerializer):
    has_response = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ["id", "subject", "status", "has_response"]

    def get_has_response(self, obj):
        return obj.responses.exists()


class GetTicketSerializer(serializers.ModelSerializer):
    responses = TicketResponseSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = [
            "id",
            "subject",
            "description",
            "status",
            "category",
            "priority",
            "ai_category",
            "ai_priority",
            "created_at",
            "book",
            "assigned_to",
            "responses",
        ]

