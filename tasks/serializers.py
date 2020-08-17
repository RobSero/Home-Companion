from rest_framework import serializers
from jwt_auth.serializers import SimpleUserSerializer
from location.serializers import SimpleLocationSerializer
from .models import Tasks



class TaskSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Tasks
    fields = '__all__'

class PopulatedTaskSerializer(TaskSerializer):
  creator = SimpleUserSerializer()
  assigned_to = SimpleUserSerializer()
  completed_by = SimpleUserSerializer()
  location = SimpleLocationSerializer()
