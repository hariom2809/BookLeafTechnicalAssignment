from django.db import models

from accounts.models import User

class Book(models.Model):

    class BookStatus(models.TextChoices):
        PUBLISHED       = "published", "Published"
        COVER_DESIGN    = "cover_design", "In Production - Cover Design"
        TYPESETTING     = "typesetting", "In Production - Typesetting"

    author                      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="books")
    book_id                     = models.CharField(max_length=20, unique=True)
    title                       = models.CharField(max_length=100)
    isbn                        = models.CharField(max_length=20, unique=True)
    genre                       = models.CharField(max_length=100)
    publication_date            = models.DateField(null=True, blank=True)
    status                      = models.CharField(max_length=20, choices=BookStatus.choices)
    mrp                         = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    author_royalty_per_copy     = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    total_copies_sold           = models.PositiveIntegerField(default=0) 
    royalty_paid                = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_royalty_payout_date    = models.DateField(null=True, blank=True)
    print_partner               = models.CharField(max_length=50, null=True, blank=True)
    available_on                = models.JSONField(default=list, blank=True) 

    @property
    def total_royalty_earned(self):
        if self.author_royalty_per_copy is None:
            return 0
        return self.author_royalty_per_copy * self.total_copies_sold

    @property
    def royalty_pending(self):
        return self.total_royalty_earned - self.royalty_paid
        
    def save(self, *args, **kwargs):
        is_new = self.pk is None

        super().save(*args, **kwargs)

        if is_new and not self.book_id:
            self.book_id = f"BK{self.pk:03d}"
            super().save(update_fields=["book_id"])