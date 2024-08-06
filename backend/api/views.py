from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import *
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
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

@method_decorator(csrf_exempt, name='dispatch')
class JoinEventView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, event_id):
            try:
                event = Event.objects.get(id=event_id)
                if request.user not in event.participants.all():
                    event.participants.add(request.user)
                    return JsonResponse({'message': 'Successfully joined the event.'})
                else:
                    return JsonResponse({'message': 'Already joined the event.'}, status=400)
            except Event.DoesNotExist:
                return JsonResponse({'message': 'Event not found.'}, status=404)

@method_decorator(csrf_exempt, name='dispatch')
class EventDetailView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            is_participant = request.user in event.participants.all()
            return JsonResponse({
                'event': {
                    'id': event.id,
                    'name': event.name,
                    'created': event.created,
                    'host_username': event.host.username,
                    'startdate': event.startdate,
                    'enddate': event.enddate
                },
                'is_participant': is_participant
            })
        except Event.DoesNotExist:
            return JsonResponse({'message': 'Event not found.'}, status=404)
