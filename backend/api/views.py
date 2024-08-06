from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateEventView(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(host=self.request.user)
        else:
            print(serializer.errors)


class DeleteEventView(generics.DestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(host=user)

class EventsView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

class CreatedEventsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        events = Event.objects.filter(host=user)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class JoinedEventsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        events = Event.objects.filter(participants=user)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
