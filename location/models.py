from django.db import models

# Create your models here.
class Location(models.Model):
  property_name = models.CharField(max_length=100)
  postcode = models.CharField(max_length=8)
  address = models.TextField()
  admin = models.ForeignKey(
    'jwt_auth.User',
    related_name='location',
    on_delete=models.CASCADE
  )
  landlord_name = models.CharField(max_length=30)
  landlord_email = models.CharField(max_length=60)
  landlord_number = models.IntegerField()
  members = models.ManyToManyField(
     'jwt_auth.User',
      related_name='location_members',
      blank=True
  )