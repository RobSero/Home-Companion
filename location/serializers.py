from rest_framework import serializers
from .models import Location
from jwt_auth.serializers import SimpleUserSerializer

class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'
    

class SimpleLocationSerializer(serializers.ModelSerializer):
  members = SimpleUserSerializer(many=True)
  
  class Meta:
    model = Location
    fields = ('property_name','members','id')
    
    