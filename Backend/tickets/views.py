from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers import ListTicketSerializer, CreateTicketSerializer

class TicketView(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateTicketSerializer
        return ListTicketSerializer
    
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ticket.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)