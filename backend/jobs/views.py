from django.shortcuts import render
from rest_framework import generics
from .models import JobApplication
from .serializers import JobApplicationSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse, FileResponse, Http404
import os
from django.conf import settings

# Create your views here.
class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class= JobApplicationSerializer
    permission_classes=[IsAuthenticated]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def get_queryset(self):
        return JobApplication.objects.filter(
            user=self.request.user
        )
    def perform_create(self, serializer):
        obj = serializer.save(user=self.request.user)

        print("Saved path:", obj.resume_file.path)
        print("Exists:", obj.resume_file.storage.exists(obj.resume_file.name))

class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(
            user=self.request.user
        )
    
def home(request):
    return JsonResponse({
        "message": "Job Tracker Backend API",
        "status": "Running",
        "version": "1.0"
    })

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=RegisterSerializer

def test_resume(request):
    file_path = os.path.join(
        settings.MEDIA_ROOT,
        "resumes",
        "Guru_Srikar_Resume_247ai_ChatProcess.pdf"
    )

    print("Checking:", file_path)
    print("Exists:", os.path.exists(file_path))

    if os.path.exists(file_path):
        return FileResponse(open(file_path, "rb"), content_type="application/pdf")

    raise Http404("File not found")