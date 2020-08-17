from django.db import models

# Create your models here.
class Tasks(models.Model):
  description = models.CharField(max_length= 150)
  completed = models.BooleanField(default=False)
  private = models.BooleanField(default=True)
  creator = models.ForeignKey(
    'jwt_auth.User',
    related_name='task_creator',
    on_delete=models.CASCADE
  )
  completed_by = models.ForeignKey(
    'jwt_auth.User',
    related_name='task_completed',
    on_delete=models.PROTECT,
    blank=True,
    null=True
  )
  assigned_to = models.ForeignKey(
    'jwt_auth.User',
    related_name='task_assigned',
    on_delete=models.PROTECT
  )
  updated_at = models.DateTimeField(auto_now=True)
  location = models.ForeignKey(
    'location.Location',
    related_name='task_location',
    on_delete=models.CASCADE,
    null=True
  )
  