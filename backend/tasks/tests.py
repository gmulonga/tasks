from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Task


class TaskModelTest(TestCase):
    def setUp(self):
        self.task = Task.objects.create(
            title="Test Task",
            description="Test Description"
        )

    def test_task_creation(self):
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.description, "Test Description")
        self.assertFalse(self.task.is_completed)
        self.assertIsNotNone(self.task.created_at)

    def test_task_str_method(self):
        self.assertEqual(str(self.task), "Test Task")


class TaskAPITest(APITestCase):
    def setUp(self):
        self.task1 = Task.objects.create(
            title="Task 1",
            description="Description 1",
            is_completed=False
        )
        self.task2 = Task.objects.create(
            title="Task 2",
            description="Description 2",
            is_completed=True
        )

    def test_get_all_tasks(self):
        url = reverse('task_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    def test_create_task(self):
        url = reverse('task_create')
        data = {
            'title': 'New Task',
            'description': 'New Description',
            'is_completed': False
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 3)

    def test_create_task_without_title(self):
        url = reverse('task_create')
        data = {'description': 'Description without title'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_single_task(self):
        url = reverse('task_detail', kwargs={'id': self.task1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Task 1')

    def test_update_task(self):
        url = reverse('task_update', kwargs={'id': self.task1.id})
        data = {
            'title': 'Updated Task',
            'description': 'Updated Description',
            'is_completed': True
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task1.refresh_from_db()
        self.assertEqual(self.task1.title, 'Updated Task')
        self.assertTrue(self.task1.is_completed)

    def test_partial_update_task(self):
        url = reverse('task_update', kwargs={'id': self.task1.id})
        data = {'is_completed': True}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task1.refresh_from_db()
        self.assertTrue(self.task1.is_completed)

    def test_delete_task(self):
        url = reverse('task_delete', kwargs={'id': self.task1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 1)

    def test_filter_completed_tasks(self):
        url = reverse('task_list')
        response = self.client.get(url, {'is_completed': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Task 2')

    def test_filter_incomplete_tasks(self):
        url = reverse('task_list')
        response = self.client.get(url, {'is_completed': 'false'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Task 1')

    def test_pagination(self):
        for i in range(10):
            Task.objects.create(title=f"Task {i+3}", description=f"Description {i+3}")

        url = reverse('task_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 5)
        self.assertIsNotNone(response.data['next'])
