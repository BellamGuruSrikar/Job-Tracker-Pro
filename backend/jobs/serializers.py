from rest_framework import serializers
from .models import JobApplication
from django.contrib.auth.models import User

class JobApplicationSerializer(serializers.ModelSerializer):
    resume_file = serializers.SerializerMethodField()

    class Meta:
        model = JobApplication
        fields = "__all__"
        read_only_fields = ["user"]
    
    def get_resume_file(self, obj):
        if obj.resume_file:
            return obj.resume_file.build_url()
        return None

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user