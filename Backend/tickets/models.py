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
        ROYALTY_AND_PAYMENT                 = "royalty_and_payment", "Royalty & Payments"
        ISBN_AND_METADATA_ISSUES            = "isbn_and_metadata_issues", "ISBN & Metadata Issues"
        PRINTING_AND_QUALITY                = "printing_and_quality"," Printing & Quality"
        DISTRIBUTION_AND_AVAILABILITY       = "distribution_and_availability", "Distribution & Availability"
        BOOK_STATUS_AND_PRODUCTION_UPDATES  = "book_status_and_production_updates", "Book Status & Production Updates"
        GENERAL_INQUERY                     = "general_inquery", "General Inquery"

    class TicketPriority(models.TextChoices):
        CRITICAL    = "critical", "Critical"
        HIGH        = "high", "High"
        MEDIUM      = "medium", "medium"
        LOW         = "low", "Low"

    author          = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tickets")
    book            = models.ForeignKey(Book, null=True, blank=True, on_delete=models.SET_NULL)
    subject         = models.CharField(max_length=100)
    description     = models.TextField()
    status          = models.CharField(max_length=15, choices=TicketStatus.choices, default=TicketStatus.OPEN)
    category        = models.CharField(max_length=100, choices=TicketCategory.choices, null=True, blank=True)
    priority        = models.CharField(max_length=10, choices=TicketPriority.choices, null=True, blank=True)
    ai_category     = models.CharField(max_length=100, choices=TicketCategory.choices, null=True, blank=True)
    ai_priority     = models.CharField(max_length=10, choices=TicketPriority.choices, null=True, blank=True)
    assigned_to     = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="assigned_tickets", null=True, blank=True)
    created_at      = models.DateTimeField(default=timezone.now)

class TicketResponse(models.Model):
    ticket              = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name="responses")
    response            = models.TextField()
    ai_draft_response   = models.TextField(null=True, blank=True)
    notes               = models.TextField(null=True, blank=True, max_length=250)
    created_at          = models.DateTimeField(default=timezone.now)