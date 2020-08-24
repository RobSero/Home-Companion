from .serializers import LocationSerializer, SimpleLocationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from django.contrib.auth import get_user_model
User = get_user_model()
from location.models import Location

def get_user(pk):
  try:
    return User.objects.get(pk=pk)
  except User.DoesNotExist:
    raise NotFound()

def get_user_by_email(email):
  try:
    return User.objects.get(email=email)
  except User.DoesNotExist:
    raise NotFound()

def get_location(pk):
  try:
    return Location.objects.get(pk=pk)
  except Location.DoesNotExist:
    raise NotFound()

class LocationSetup(APIView):
  permission_classes = (IsAuthenticated,)
  
  # -----------  CREATE NEW LOCATION --------------
  # POST request to /location/setup
  # Body required - as per model
  # Valid jwt token required
  def post(self,req):
    print('CREATING LOCATION')
    # get user
    creator = get_user(pk=req.user.id)
    # assign user to admin
    req.data['admin'] = creator.id
    req.data['members'] = [creator.id]
    # validate and serialize
    new_location = LocationSerializer(data=req.data)
    if new_location.is_valid():
      new_location.save()
      return Response(new_location.data, status=status.HTTP_201_CREATED)
    return Response(new_location.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    


class LocationUpdates(APIView):
      # -----------  EDIT LOCATION DETAILS --------------
      # PUT request to /location/setup/<locationID>
      # Body required - as per model
      # Valid jwt token required
  def put(self,req,pk):
    location_to_update = get_location(pk=pk)
    if req.user.id == location_to_update.admin.id:
      req.data['admin'] = req.user.id
      serialized_location = LocationSerializer(location_to_update, data=req.data)
      if serialized_location.is_valid():
        serialized_location.save()
        return Response(serialized_location.data, status=status.HTTP_200_OK)
      return Response(serialized_location.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    return PermissionDenied() 
        
      
      
      





#   ----------------------------- MEMBER HANDLING ---------------------------------

class LocationMembers(APIView):
  permission_classes = (IsAuthenticated,)
  # -----------  ADD MEMBERS TO LOCATION --------------
  # PUT request to /location/<locationID>/<memberEmail>
  # No body required
  # Valid jwt token required
  def put(self,req,pk,email):
    # find location
    location = get_location(pk=pk)
    print(location.members)
    # find member
    new_member = get_user_by_email(email=email)
    print(new_member.id)
    # check if already a member
    if not location.members.filter(id=new_member.id).exists():
      print('NOT A MEMBER')
      location.members.add(new_member)
      return Response({'message' : 'Member has been added to your property'}, status=status.HTTP_202_ACCEPTED)
    else:
      print('ALREADY MEMBER')
      return Response({'message' : 'The user is already a member of this group'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



  # -----------  REMOVE MEMBERS TO LOCATION --------------
  # DELETE request to /location/<locationID>/<memberEmail>
  # No body required
  # Valid jwt token required
  def delete(self,req,pk,email):
    # find location
    location = get_location(pk=pk)
    print(location.members)
    # find member
    member_to_remove = get_user_by_email(email=email)
    # check if user is admin or member
    if req.user.id == member_to_remove.id or req.user.id == location.admin.id:
      print('USER IS THE ADMIN OR A MEMBER')
      location.members.remove(member_to_remove)
      return Response({'message' : 'Member removed from property'}, status=status.HTTP_202_ACCEPTED)
    return PermissionDenied()




#  ----------- GET USERS LOCATIONS ---------------

# GET request to /location/user
#  no body required
#  valid token required
class UserLocations(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  def get(self,req):
    print('HELLO')
    # get the user from token
    user = get_user(pk=req.user.id)
    print(user)
    # get list of all locations they are member of (incl other members)
    location_list = Location.objects.filter(members=user.id)
    print(location_list)
    serialized_locations = SimpleLocationSerializer(location_list, many=True)
    # return the data
    return Response(serialized_locations.data)
  
  
class LocationInformation(APIView):
  permission_classes = (IsAuthenticated,)
  # GET request to /location/<int:locationId>
#  no body required
#  valid token required
  
  def get(self,req,pk):
    # get location from db
    location = get_location(pk=pk)
    serialized_location = SimpleLocationSerializer(location)
    return Response(serialized_location.data, status=status.HTTP_200_OK)