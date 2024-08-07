from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    participants = models.ManyToManyField(User, related_name="participants", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    startdate = models.DateTimeField(null=True)
    enddate = models.DateTimeField(null=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.name

class Ticket(models.Model):
    event = models.ForeignKey(Event, related_name='tickets', on_delete=models.CASCADE)
    ticket_type = models.CharField(max_length=255, default='General Admission')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    count = models.PositiveIntegerField(default=0)
