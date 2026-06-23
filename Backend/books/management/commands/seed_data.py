import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password

from accounts.models import User
from books.models import Book


class Command(BaseCommand):
    help = "Seed authors and books data"

    def handle(self, *args, **kwargs):

        file_path = Path("data/authors_books.json")

        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        self.stdout.write("Deleting old data...")

        Book.objects.all().delete()
        User.objects.filter(role=User.UserRole.AUTHOR).delete()

        for author_data in data["authors"]:

            first_name, *rest = author_data["name"].split(" ")
            last_name = " ".join(rest)

            author = User.objects.create(
                author_id=author_data["author_id"],
                first_name=first_name,
                last_name=last_name,
                email=author_data["email"],
                phone_number=author_data["phone"],
                city=author_data["city"],
                joined_date=author_data["joined_date"],
                role=User.UserRole.AUTHOR,
                password=make_password("password123"),
            )

            for book_data in author_data["books"]:

                status = self.get_status(book_data["status"])

                Book.objects.create(
                    author=author,
                    book_id=book_data["book_id"],
                    title=book_data["title"],
                    isbn=book_data["isbn"],
                    genre=book_data["genre"],
                    publication_date=book_data["publication_date"],
                    status=status,
                    mrp=book_data["mrp"],
                    author_royalty_per_copy=book_data["author_royalty_per_copy"],
                    total_copies_sold=book_data["total_copies_sold"],
                    royalty_paid=book_data["royalty_paid"],
                    last_royalty_payout_date=book_data["last_royalty_payout_date"],
                    print_partner=book_data["print_partner"],
                    available_on=book_data["available_on"],
                )

        self.stdout.write(
            self.style.SUCCESS("Database seeded successfully!")
        )

    def get_status(self, status):

        if status == "Published & Live":
            return Book.BookStatus.PUBLISHED

        if status == "In Production - Cover Design":
            return Book.BookStatus.COVER_DESIGN

        if status == "In Production - Typesetting":
            return Book.BookStatus.TYPESETTING

        raise ValueError(f"Unknown status: {status}")