from django.urls import path
form . import views

urlpatterns = [
    path("/", views.BookView.as_view()),
    path("<int:bookId>/", views.GetBookView.as_view()),
]