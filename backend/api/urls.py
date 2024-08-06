from django.urls import path
from . import views

urlpatterns = [
    path("events/", views.EventsView.as_view(), name="event-list"),
    path('create-event/', views.CreateEventView.as_view(), name="create-event"),
    path('events.delete/<int:pk>/', views.DeleteEventView.as_view(), name="delete-event"),
    path('joined-events/', views.JoinedEventsView.as_view(), name="joined-events"),
    path('created-events/', views.CreatedEventsView.as_view(), name="created-events")
]
