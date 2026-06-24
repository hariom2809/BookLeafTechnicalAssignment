from rest_framework import serializers

from .models import Ticket, TicketResponse


class AdminTicketListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)

    class Meta:
        model = Ticket
        fields = ["id", "subject", "status", "ai_category", "ai_priority", "author_name", "created_at"]


class TicketResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketResponse
        fields = ["id", "response", "notes", "created_at"]


class AdminTicketDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    responses = TicketResponseSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = [
            "id",
            "subject",
            "description",
            "status",
            "ai_category",
            "ai_priority",
            "author_name",
            "created_at",
            "responses",
        ]