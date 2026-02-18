from django.core.management.base import BaseCommand
from tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Create workouts
        run = Workout.objects.create(name='Run', description='Running workout')
        swim = Workout.objects.create(name='Swim', description='Swimming workout')
        lift = Workout.objects.create(name='Lift', description='Weight lifting')

        # Create activities
        Activity.objects.create(user=tony, workout=run, date=timezone.now().date(), duration_minutes=30, points=50)
        Activity.objects.create(user=steve, workout=swim, date=timezone.now().date(), duration_minutes=45, points=70)
        Activity.objects.create(user=bruce, workout=lift, date=timezone.now().date(), duration_minutes=60, points=90)
        Activity.objects.create(user=clark, workout=run, date=timezone.now().date(), duration_minutes=20, points=30)

        # Calculate leaderboard
        for team in Team.objects.all():
            total = Activity.objects.filter(user__team=team).aggregate(points=models.Sum('points'))['points'] or 0
            Leaderboard.objects.create(team=team, total_points=total)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
