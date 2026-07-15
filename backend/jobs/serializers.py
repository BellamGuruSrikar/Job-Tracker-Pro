from rest_framework import serializers
from .models import JobApplication
from django.contrib.auth.models import User


class JobApplicationSerializer(serializers.ModelSerializer):
    # upload from frontend
    upload_resume = serializers.FileField(
        write_only=True,
        required=False,
    )

    class Meta:
        model = JobApplication
        fields = [
            "id",
            "company_name",
            "job_title",
            "resume_version",
            "resume_file",
            "upload_resume",
            "interview_date",
            "interview_notes",
            "location",
            "job_url",
            "date_applied",
            "status",
            "notes",
            "user",
        ]
        read_only_fields = ["user"]
    def create(self, validated_data):
        # REMOVE the temporary upload field before creating the model
        validated_data.pop("upload_resume", None)
        return JobApplication.objects.create(**validated_data)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)