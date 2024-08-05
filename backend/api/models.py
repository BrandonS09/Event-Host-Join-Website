from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    participants = models.ManyToManyField(User, related_name="participants", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    date = models.DateTimeField(null=True)
    
    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return self.name