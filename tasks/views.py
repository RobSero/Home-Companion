from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
from .serializers import TaskSerializer
from .models import Tasks

def get_all_tasks():
  return Tasks.objects.all()

def get_user(userId):
  try:
    return get_user_model(pk=userId)
  except:
    return PermissionDenied()
  



class Task(APIView):
  permission_classes = (IsAuthenticated,)
  
  #  -------- CREATE A NEW TASK ---------------
  # POST request to /task/new
  # Requires valid auth token
  # body required = {
    # description: string, 
  #   assigned_to:string, 
  #   private:Bool
  #  }
  def post(self,req):
    # get creators profile, add to json body
    
    # get assigned user profile, add to json body
    # seralize and valid
    # save and respond