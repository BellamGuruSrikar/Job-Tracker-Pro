from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .models import JobApplication
from .serializers import JobApplicationSerializer, RegisterSerializer
from .supabase_storage import upload_resume,delete_resume

from django.contrib.auth.models import User
from django.http import JsonResponse


# Create your views here.
class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):

        uploaded_file = request.FILES.get("upload_resume")

        data = request.data.copy()

        if uploaded_file:
            url = upload_resume(uploaded_file)
            data["resume_file"] = url

        # remove upload_resume before serializer validation
        data.pop("upload_resume", None)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):

        job = self.get_object()

        data = request.data.copy()

        uploaded_file = request.FILES.get("upload_resume")

        old_resume = job.resume_file

        if uploaded_file:

            # 1. Upload the new resume first
            new_url = upload_resume(uploaded_file)

            # 2. Save the new URL
            data["resume_file"] = new_url

        serializer = self.get_serializer(
            job,
            data=data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        # 3. Delete the old resume ONLY after everything succeeded
        if uploaded_file and old_resume:
            delete_resume(old_resume)

        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):

        job = self.get_object()

        if job.resume_file:
            delete_resume(job.resume_file)

        job.delete()

        return Response(status=status.HTTP_204_NO_CONTENT) 
    
def home(request):
    return JsonResponse({
        "message": "Job Tracker Backend API",
        "status": "Running",
        "version": "1.0"
    })

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=RegisterSerializer
