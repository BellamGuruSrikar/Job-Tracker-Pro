from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationDetailView,
    RegisterView
    )

urlpatterns = [
    path('jobs/', JobApplicationListCreateView.as_view()),
    path('jobs/<int:pk>/', JobApplicationDetailView.as_view()),
    path('register/',RegisterView.as_view()),
]