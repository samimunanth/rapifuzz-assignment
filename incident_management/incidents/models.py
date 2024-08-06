from django.contrib.auth.models import AbstractUser
from django.db import models

import datetime
import random
from django.db import models

class User(AbstractUser):
    INDIVIDUAL = 'Individual'
    ENTERPRISE = 'Enterprise'
    GOVERNMENT = 'Government'
    USER_TYPE_CHOICES = [
        (INDIVIDUAL, 'Individual'),
        (ENTERPRISE, 'Enterprise'),
        (GOVERNMENT, 'Government'),
    ]

    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    mobile_number = models.CharField(max_length=15)
    fax = models.CharField(max_length=15, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    password = models.CharField(max_length=128) 


class Incident(models.Model):
    ENTERPRISE = 'Enterprise'
    GOVERNMENT = 'Government'
    REPORTER_CHOICES = [
        (ENTERPRISE, 'Enterprise'),
        (GOVERNMENT, 'Government'),
    ]

    HIGH = 'High'
    MEDIUM = 'Medium'
    LOW = 'Low'
    PRIORITY_CHOICES = [
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (LOW, 'Low'),
    ]

    OPEN = 'Open'
    IN_PROGRESS = 'In progress'
    CLOSED = 'Closed'
    STATUS_CHOICES = [
        (OPEN, 'Open'),
        (IN_PROGRESS, 'In progress'),
        (CLOSED, 'Closed'),
    ]

    reporter = models.ForeignKey(User, on_delete=models.CASCADE)
    reporter_type = models.CharField(max_length=20, choices=REPORTER_CHOICES)
    incident_id = models.CharField(max_length=20, unique=True, editable=False)
    incident_details = models.TextField()
    reported_date = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=OPEN)

    def save(self, *args, **kwargs):
        if not self.incident_id:
            self.incident_id = self.generate_incident_id()
        super().save(*args, **kwargs)

    def generate_incident_id(self):
        year = datetime.datetime.now().year
        random_number = random.randint(10000, 99999)
        return f'RMG{random_number}{year}'