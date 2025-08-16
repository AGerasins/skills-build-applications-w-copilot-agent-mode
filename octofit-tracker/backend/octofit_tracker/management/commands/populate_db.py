from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models as djongo_models
from django.db import connection
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all users
        User.objects.all().delete()
        # Insert test users (superheroes)
        marvel = ['Iron Man', 'Captain America', 'Black Widow', 'Thor', 'Hulk']
        dc = ['Superman', 'Batman', 'Wonder Woman', 'Flash', 'Aquaman']
        users = []
        for name in marvel:
            email = f"{name.lower().replace(' ', '')}@marvel.com"
            users.append(User(username=name, email=email))
        for name in dc:
            email = f"{name.lower().replace(' ', '')}@dc.com"
            users.append(User(username=name, email=email))
        User.objects.bulk_create(users)
        self.stdout.write(self.style.SUCCESS('Inserted test users for Marvel and DC.'))
        # Create unique index on email using pymongo
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db['users'].create_index('email', unique=True)
        self.stdout.write(self.style.SUCCESS('Ensured unique index on email.'))
        # TODO: Add teams, activities, leaderboard, workouts collections and populate with test data
        self.stdout.write(self.style.SUCCESS('Populate_db command completed.'))
