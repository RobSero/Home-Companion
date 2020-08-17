from django.urls import path
from .views import LocationSetup, LocationMembers, LocationUpdates

urlpatterns = [
    path('setup/', LocationSetup.as_view()),
    path('setup/<int:pk>', LocationUpdates.as_view()),
    path('<int:pk>/<str:email>', LocationMembers.as_view()),
]
