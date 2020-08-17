from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'
    

class SimpleLocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = ('property_name',)