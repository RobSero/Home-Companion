from django.urls import path
from .views import TaskSetup,TaskEdit, MyTasks, LocationTasks,ReassignTask

urlpatterns = [
    path('<int:pk>/', TaskSetup.as_view()), 
    path('edit/<int:pk>/', TaskEdit.as_view()),
    path('all/', MyTasks.as_view()),
    path('all/<int:locationId>', LocationTasks.as_view()),
    path('<int:taskId>/reassign/<int:userId>', ReassignTask.as_view()),
]
