from django.db import models
from django.utils import timezone

from accounts.models import User
from books.models import Book

class Ticket(models.Model):

    class TicketStatus(models.TextChoices):
        OPEN        = "open", "Open"
        IN_PROGRESS = "in_progress", "In Progress"
        RESOLVED    = "resolved", "Resolved"
        CLOSED      = "closed", "Closed"

    class TicketCategory(models.TextChoices):
        BOOK    = "book", "Book"
        GENERAL = "general", "General"

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tickets")
    book    = models.ForeignKey(Book, null=True, blank=True, on_delete=models.SET_NULL)
    subject     = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=15, choices=TicketStatus.choices, default=TicketStatus.OPEN)
    category = models.CharField(max_length=15, choices=TicketCategory.choices, default=TicketCategory.GENERAL)
    created_at = models.DateTimeField(default=timezone.now)