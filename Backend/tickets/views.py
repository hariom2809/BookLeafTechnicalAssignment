from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers import ListTicketSerializer, CreateTicketSerializer

from .services.ai_service import classify_and_prioritize

class TicketView(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateTicketSerializer
        return ListTicketSerializer
    
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ticket.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        ticket = serializer.save(author=self.request.user)

        try:
            result = classify_and_prioritize(
                ticket.subject,
                ticket.description
            )

            ticket.ai_category = result["category"]
            ticket.ai_priority = result["priority"]

        except Exception as e:
            print("AI Error:", e)

            ticket.ai_category = (
                Ticket.TicketCategory.GENERAL_INQUERY
            )

            ticket.ai_priority = (
                Ticket.TicketPriority.MEDIUM
            )

        ticket.save(
            update_fields=[
                "ai_category",
                "ai_priority",
            ]
        )