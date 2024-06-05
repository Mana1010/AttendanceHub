from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.BigAutoField(primary_key=True, blank=False)
    first_name = models.CharField(max_length=55, blank=False)
    middle_name = models.CharField(max_length=55, blank=True)
    last_name = models.CharField(max_length=55, blank=False)
    age = models.IntegerField(blank=False)
    gender = models.CharField(max_length=10, blank=False)
    role = models.CharField(max_length=25, blank=False)
    reason = models.TextField(blank=False)
    time_in = models.DateTimeField(blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    
    class Meta:
        db_table = "users"
   