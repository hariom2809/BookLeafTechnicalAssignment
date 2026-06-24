from django.test import TestCase

from .serializers import CreateTicketSerializer


class CreateTicketSerializerTests(TestCase):
    def test_legacy_frontend_category_values_are_normalized(self):
        serializer = CreateTicketSerializer(
            data={
                "subject": "Test subject",
                "description": "Test description",
                "category": "general",
                "book": None,
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data["category"], "general_inquery")
