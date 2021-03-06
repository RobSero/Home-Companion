from django.urls import path
from .views import LocationSetup, LocationMembers, LocationUpdates, UserLocations, LocationInformation, LocationDetails

urlpatterns = [
    path('setup/', LocationSetup.as_view()),
    path('setup/<int:pk>', LocationUpdates.as_view()),
    path('<int:pk>/<str:email>', LocationMembers.as_view()),
    path('user/', UserLocations.as_view()),
    path('<int:pk>/', LocationInformation.as_view()),
    path('details/<int:pk>/', LocationDetails.as_view()),
]
