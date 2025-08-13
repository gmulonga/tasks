from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer


class TaskPagination(PageNumberPagination):
    """Custom pagination class for tasks.

    Returns:
        PageNumberPagination: Custom pagination for task list.
    """

    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 20


@api_view(['GET'])
def task_list(request):
    """Retrieve a list of tasks with optional filtering and pagination.

    Args:
        request: The HTTP request object containing query parameters for
        filtering and pagination.

    Returns:
        Response: A paginated response containing the list of tasks,
        filtered by completion status if specified. If an invalid
        ordering field is provided, returns a 400 Bad Request response.
    """

    queryset = Task.objects.all()

    is_completed = request.query_params.get('is_completed')
    if is_completed is not None:
        if is_completed.lower() == 'true':
            queryset = queryset.filter(is_completed=True)
        elif is_completed.lower() == 'false':
            queryset = queryset.filter(is_completed=False)

    ordering = request.query_params.get('ordering', '-created_at')
    try:
        queryset = queryset.order_by(ordering)
    except Exception:
        return Response(
            {"error": "Invalid ordering field."},
            status=status.HTTP_400_BAD_REQUEST
        )

    paginator = TaskPagination()
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = TaskSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def task_detail(request, id):
    """Retrieve the details of a specific task by its ID.

    Args:
        request: The HTTP request object.
        id (int): The ID of the task to retrieve.

    Returns:
        Response: A response containing the task details if found, or a
        404 Not Found response if the task does not exist.
    """

    task = get_object_or_404(Task, id=id)
    serializer = TaskSerializer(task)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def task_create(request):
    """Create a new task.

    Args:
        request: The HTTP request object containing the task data.

    Returns:
        Response: A response containing the created task data if valid,
        or a 400 Bad Request response with validation errors.
    """

    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def task_update(request, id):
    """Update an existing task.

    Args:
        request: The HTTP request object containing the updated task data.
        id (int): The ID of the task to update.

    Returns:
        Response: A response containing the updated task data if valid,
        or a 400 Bad Request response with validation errors.
    """

    task = get_object_or_404(Task, id=id)
    serializer = TaskSerializer(task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def task_delete(request, id):
    """Delete a specific task by its ID.

    Args:
        request: The HTTP request object.
        id (int): The ID of the task to delete.

    Returns:
        Response: A response indicating the success of the deletion,
        or a 404 Not Found response if the task does not exist.
    """

    task = get_object_or_404(Task, id=id)
    task.delete()
    return Response(
        {"message": "Task deleted successfully."},
        status=status.HTTP_204_NO_CONTENT
    )
