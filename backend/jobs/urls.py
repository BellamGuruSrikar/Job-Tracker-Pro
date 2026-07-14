from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationDetailView,
    RegisterView, test_resume
    )

urlpatterns = [
    path('jobs/', JobApplicationListCreateView.as_view()),
    path('jobs/<int:pk>/', JobApplicationDetailView.as_view()),
    path('register/',RegisterView.as_view()),
    path("test-resume/", test_resume),
]