from django.urls import path
from . import views

urlpatterns = [
    path("", views.TicketView.as_view(), name="ticket-list-create"),
    path("<int:pk>/", views.GetTicketView.as_view(), name="ticket-detail"),
]
