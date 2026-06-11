from django.shortcuts import render
from rest_framework import generics
from .models import JobApplication
from .serializers import JobApplicationSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class= JobApplicationSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(
            user=self.request.user
        )
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(
            user=self.request.user
        )

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=RegisterSerializer