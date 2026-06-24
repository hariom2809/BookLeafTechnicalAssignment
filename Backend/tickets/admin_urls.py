from django.urls import path

from .admin_views import (
    AdminTicketListView,
    AdminTicketDetailView,
    GenerateDraftView,
    RespondToTicketView,
)

urlpatterns = [
    path("", AdminTicketListView.as_view()),
    path("<int:pk>/", AdminTicketDetailView.as_view()),
    path("<int:pk>/draft/", GenerateDraftView.as_view()),
    path("<int:pk>/respond/", RespondToTicketView.as_view()),
]