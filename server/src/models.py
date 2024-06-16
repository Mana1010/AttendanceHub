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
    is_trash = models.BooleanField(blank=True, null=True)
    reason = models.TextField(blank=False)
    qr_code = models.CharField(max_length=10, blank=False)
    time_in = models.BigIntegerField(blank=False, null=True)
    time_out = models.BigIntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "users"
   

class SessionLog(models.Model):
    session_id = models.BigAutoField(primary_key=True, blank=False)
    total_time_consumed = models.BigIntegerField(blank=False, null=True)
    total_visit = models.IntegerField(blank=False, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        db_table = "sessionlogs"
    
class Trash(models.Model):
    trash_id = models.BigAutoField(primary_key=True, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
    class Meta:
        db_table = "trashes"