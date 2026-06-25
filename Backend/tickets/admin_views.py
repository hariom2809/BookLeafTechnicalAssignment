from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .admin_serializers import (
    AdminTicketDetailSerializer,
    AdminTicketListSerializer,
    AdminTicketUpdateSerializer,
)
from .filters import TicketFilter
from .models import Ticket, TicketResponse
from .services.ai_service import generate_draft_response


class AdminTicketListView(generics.ListAPIView):
    serializer_class = AdminTicketListSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TicketFilter
    queryset = Ticket.objects.select_related("author").order_by("-created_at")


class AdminTicketDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Ticket.objects.select_related("author").prefetch_related("responses")

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return AdminTicketUpdateSerializer
        return AdminTicketDetailSerializer


class GenerateDraftView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        ticket = self.get_ticket(pk)
        draft = generate_draft_response(ticket)
        return Response({"draft": draft}, status=status.HTTP_200_OK)

    def get_ticket(self, pk):
        return Ticket.objects.select_related("author").get(pk=pk)


class RespondToTicketView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        ticket = self.get_ticket(pk)
        response_text = request.data.get("response", "").strip()
        notes = request.data.get("notes", "") or ""

        if not response_text:
            return Response({"detail": "response is required."}, status=status.HTTP_400_BAD_REQUEST)

        TicketResponse.objects.create(ticket=ticket, response=response_text, notes=notes)
        ticket.status = Ticket.TicketStatus.RESOLVED
        ticket.save(update_fields=["status"])

        return Response({"message": "Response Sent"}, status=status.HTTP_201_CREATED)

    def get_ticket(self, pk):
        return Ticket.objects.select_related("author").get(pk=pk)