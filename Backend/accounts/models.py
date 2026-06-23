from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from .manager import CustomUserManager

class User(AbstractBaseUser, PermissionsMixin):
    class UserRole(models.TextChoices):
        ADMIN   = "admin", "Admin"
        AUTHOR  = "author", "Author"

    author_id       = models.CharField(max_length=20, unique=True, null=True, blank=True)
    first_name      = models.CharField(max_length=50, null=False, blank=False)
    last_name       = models.CharField(max_length=50, null=True, blank=True)
    email           = models.EmailField(unique=True, null=False, blank=False)
    phone_number    = models.CharField(max_length=15, blank=True)
    city            = models.CharField(max_length=50, null=True, blank=True)
    role            = models.CharField(max_length=10, choices=UserRole.choices, default=UserRole.AUTHOR)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    joined_date     = models.DateField(default=timezone.now)

    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = []
    objects         = CustomUserManager()

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        super().save(*args, **kwargs)

        if is_new and not self.author_id:
            self.author_id = f"AUTH{self.pk:03d}"
            super().save(update_fields=["author_id"])
