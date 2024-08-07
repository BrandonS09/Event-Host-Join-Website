from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['ticket_type', 'price', 'count']
        
class EventSerializer(serializers.ModelSerializer):
    host_username = serializers.SerializerMethodField()
    tickets = TicketSerializer(many=True)

    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'participants', 'created', 'startdate', 'enddate', 'host_username', 'tickets']
    def create(self, validated_data):
        tickets_data = validated_data.pop('tickets', [])
        event = Event.objects.create(**validated_data)
        for ticket_data in tickets_data:
            Ticket.objects.create(event=event, **ticket_data)
        return event
    def get_host_username(self, obj):
        return obj.host.username if obj.host else None