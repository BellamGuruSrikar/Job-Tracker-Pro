from rest_framework import serializers
from .models import JobApplication
from django.contrib.auth.models import User



class JobApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobApplication
        fields = "__all__"
        read_only_fields = ["user"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if instance.resume_file:
            url, _ = cloudinary.utils.cloudinary_url(
                instance.resume_file.public_id,
                resource_type="raw",
                type="upload",
                secure=True,
                format="pdf",
            )
            data["resume_file"] = url

        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )