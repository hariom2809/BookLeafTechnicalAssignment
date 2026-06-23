from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Book
from .serializers import ListBookSerializer, GetBookSerializer

class BookView(generics.ListAPIView):
    serializer_class = ListBookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Book.objects.filter(author=self.request.user)

class GetBookView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = GetBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"
    lookup_url_kwarg = "bookId"