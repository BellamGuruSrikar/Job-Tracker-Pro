from django.shortcuts import render
from rest_framework import generics
from .models import JobApplication
from .serializers import JobApplicationSerializer

# Create your views here.
class JobApplicationListCreateView(generics.ListCreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class= JobApplicationSerializer

class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
