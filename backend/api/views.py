from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from .serializers import *
from django.db.models import F
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import *
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt

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
            user = request.user

            if user in event.participants.all():
                return JsonResponse({'message': 'You are already participating in this event.'}, status=400)
            
            event.participants.add(user)
            event.save()
            ticket, created = Ticket.objects.get_or_create(event=event, user=user, defaults={'ticket_type': 'Standard'})
            if not created:                
                Ticket.objects.filter(id=ticket.id).update(count=F('count') + 1)

            return JsonResponse({'message': 'You have successfully joined the event.'})

        except Event.DoesNotExist:
            return JsonResponse({'message': 'Event not found.'}, status=404)

@method_decorator(csrf_exempt, name='dispatch')
class EventDetailView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            is_participant = request.user in event.participants.all()
            is_host = event.host == request.user
            
            event_data = {
                'id': event.id,
                'name': event.name,
                'created': event.created,
                'host_username': event.host.username,
                'startdate': event.startdate,
                'enddate': event.enddate,
                'description': event.description,
            }
            
            if is_host:
                ticket_sales_data = Ticket.objects.filter(event=event).values('ticket_type').annotate(count=Count('id')).order_by('ticket_type')
                response_data = {
                    'event': event_data,
                    'is_participant': is_participant,
                    'ticket_sales_data': list(ticket_sales_data)
                }
            else:
                response_data = {
                    'event': event_data,
                    'is_participant': is_participant
                }
            
            return JsonResponse(response_data)
        
        except Event.DoesNotExist:
            return JsonResponse({'message': 'Event not found.'}, status=404)
