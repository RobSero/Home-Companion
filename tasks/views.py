from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()
from django.conf import settings
from .serializers import TaskSerializer, PopulatedTaskSerializer
from .models import Tasks
from location.models import Location

def get_task(pk):
  try:
    return Tasks.objects.get(pk=pk)
  except Tasks.DoesNotExist:
    raise NotFound()

def get_user(userId):
  try:
    return User.objects.get(pk=userId)
  except:
    raise PermissionDenied()
  
def get_location(pk):
  try:
    return Location.objects.get(pk=pk)
  except Location.DoesNotExist:
    raise NotFound()
  
def get_all_user_tasks(userId):
  return Tasks.objects.all().filter(assigned_to=userId).filter(completed=False)

def get_location_tasks(locationId):
  return Tasks.objects.all().filter(location=locationId)


class TaskSetup(APIView):
  permission_classes = (IsAuthenticated,)
  
  #  -------- CREATE A NEW TASK ---------------
  # POST request to /task/propertyId
  # Requires valid auth token
  # body required = {
    # description: string, 
  #   assigned_to:userId - int, 
  #   private:Bool
  #  }
  def post(self,req,pk):
    # get creators profile, add to json body
    creator = get_user(userId=req.user.id)
    req.data['creator'] = creator.id
    print(creator.username)
    # get location
    location = get_location(pk=pk)
    print(location.property_name)
    req.data['location'] = location.id
    # check if creator is member of group
    if not location.members.filter(pk=creator.id).exists():
      raise PermissionDenied()
    # get assigned user profile, add to json body
    assigned_user = get_user(userId=req.data['assigned_to'])
    print(assigned_user.username)
    #  Check assigned_user is a member of that group
    if not location.members.filter(pk=assigned_user.id).exists():
      return Response({'message':'User is not in this group, cannot assign task'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    else:
      # validate and save
      new_task = TaskSerializer(data=req.data)
      if new_task.is_valid():
        new_task.save()
        return Response({'message':'Task assigned'}, status=status.HTTP_201_CREATED)
      return Response(new_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TaskEdit(APIView):
  permission_classes = (IsAuthenticated,)

  #  -------- DELETE TASK ---------------
  # DELETE request to /task/edit/taskId
  # Requires valid auth token & user is owner of task
  # No body required
  def delete(self,req,pk):
    # get task and location by id
    task_to_delete = get_task(pk=pk)
    location = get_location(pk=task_to_delete.location.id)
    # check if user is the creator or admin
    if req.user.id == task_to_delete.creator.id or req.user.id == location.admin.id:
      return Response({'message': 'Not authorized sadly'}, status=status.HTTP_401_UNAUTHORIZED)
      # delete
    task_to_delete.delete()
    return Response({'message': 'Successfully Deleted'}, status=status.HTTP_202_ACCEPTED)


 #  -------- COMPLETE TASK ---------------
  # PUT request to /task/edit/taskId
  # Requires valid auth token
  # No body required
  def put(self,req,pk):
    # get user
    user_completed = get_user(userId=req.user.id)
    print(user_completed.username)
    # get task
    task_completed = get_task(pk=pk)
    print(task_completed.description)
    # Check if already completed
    if task_completed.completed == True:
      return Response({'message' : 'Task has already been completed'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    # mark as complete
    task_completed.completed_by = user_completed
    task_completed.completed = True
     # save
    task_completed.save()
    return Response({'message': 'Task Completed'}, status=status.HTTP_202_ACCEPTED)



#  -------------------- REQUESTING TASK LISTS ------------------------

class MyTasks(APIView):
  permission_classes = (IsAuthenticated,)
  
   #  -------- GET DASHBOARD TASKLIST ---------------
  # GET request to /task/all
  # Requires valid auth token
  # No body required
  
  def get(self,req):
    # get user
    # user = get_user(userId=req.user.id)
    # print(user.username)
    # get tasks by userId
    task_list = get_all_user_tasks(userId=req.user.id)
    print(task_list)
    # sort in order of date
    serialized_tasks = PopulatedTaskSerializer(task_list, many=True)
    # return top 10 tasks
    return Response(serialized_tasks.data)
  
class LocationTasks(APIView):
  permission_classes = (IsAuthenticated,)
  
   # GET request to /task/all/locationId
  # Requires valid auth token and be a member of that location
  # No body required
  def get(self,req,locationId):
    # get the location
    location = get_location(pk=locationId)
    # get the user
    logged_in_user = get_user(userId=req.user.id)
    # check if user is a member
    if not location.members.filter(pk=logged_in_user.id).exists():
      raise PermissionDenied()
    # get location tasks
    location_task_list = get_location_tasks(locationId=location.id)
    print(location_task_list)
    # serialize and send
    serialized_tasks = PopulatedTaskSerializer(location_task_list, many=True)
    return Response(serialized_tasks.data, status=status.HTTP_200_OK)