from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class JobApplication(models.Model):
    STATUS_CHOICES=[
        ('Applied','Applied'),
        ('Interview','Interview'),
        ('Rejected','Rejected'),
        ('Offer','Offer'),
    ]
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=200)
    job_title = models.CharField(max_length=200)
    resume_version= models.CharField(
        max_length=100,
        blank=True
    )
    resume_file = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )
    interview_date = models.DateField(null=True, blank=True)
    interview_notes = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    job_url = models.URLField(blank=True)
    date_applied = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    notes = models.TextField(blank=True)
    

    def __str__(self):
        return f"{self.company_name} - {self.job_title}"


