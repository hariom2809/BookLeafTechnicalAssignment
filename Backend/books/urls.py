from django.urls import path
from . import views

urlpatterns = [
    path("", views.BookView.as_view()),
    path("<int:bookId>/", views.GetBookView.as_view()),
]