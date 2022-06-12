from locust import HttpUser, TaskSet, task
import random


class UserBehavior(TaskSet):
    @task(1)
    def detailTest(self):
        params = {
            'region': 'China(Mainland)',
            'startDate': '2020-01-22',
            'endDate': '2022-06-01',
            'step': random.randint(1, 7)
        }
        self.client.get("/api/data/getStat", params=params)


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    host = 'http://192.168.0.103:8080'
    min_wait = 3000
    max_wait = 6000

