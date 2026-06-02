from django.urls import path
from .views import (JobApplicationListCreateView, JobApplicationDetailView)

urlpatterns = [
    path('jobs/', JobApplicationListCreateView.as_view()),
    path('jobs/<int:pk>/', JobApplicationDetailView.as_view()),
]