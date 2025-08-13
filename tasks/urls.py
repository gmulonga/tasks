from django.urls import path
from .views import (
    task_list,
    task_create,
    task_detail,
    task_update,
    task_delete,
)

urlpatterns = [
    path('', task_list, name='task_list'),
    path('<int:id>/', task_detail, name='task_detail'),
    path('create/', task_create, name='task_create'),
    path('<int:id>/update/', task_update, name='task_update'),
    path('<int:id>/delete/', task_delete, name='task_delete'),
]
