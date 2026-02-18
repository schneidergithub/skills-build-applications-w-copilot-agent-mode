"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from tracker.models import User, Team, Activity, Leaderboard, Workout


def _base_url():
    name = os.environ.get('CODESPACE_NAME')
    if name:
        return f"https://{name}-8000.app.github.dev"
    return "http://localhost:8000"


def api_root(request):
    base = _base_url()
    return JsonResponse({
        'users': f"{base}/api/users/",
        'teams': f"{base}/api/teams/",
        'activities': f"{base}/api/activities/",
        'leaderboard': f"{base}/api/leaderboard/",
        'workouts': f"{base}/api/workouts/",
    })


def _serialize_user(u):
    return {'id': u.id, 'name': u.name, 'email': u.email, 'team_id': u.team_id}


def _serialize_team(t):
    return {'id': t.id, 'name': t.name}


def _serialize_workout(w):
    return {'id': w.id, 'name': w.name, 'description': w.description}


def _serialize_activity(a):
    return {'id': a.id, 'user_id': a.user_id, 'workout_id': a.workout_id, 'date': a.date.isoformat(), 'duration_minutes': a.duration_minutes, 'points': a.points}


def _serialize_leaderboard(l):
    return {'id': l.id, 'team_id': l.team_id, 'total_points': l.total_points}


@csrf_exempt
def users_list(request):
    data = [ _serialize_user(u) for u in User.objects.all() ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def teams_list(request):
    data = [ _serialize_team(t) for t in Team.objects.all() ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def workouts_list(request):
    data = [ _serialize_workout(w) for w in Workout.objects.all() ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def activities_list(request):
    data = [ _serialize_activity(a) for a in Activity.objects.all() ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def leaderboard_list(request):
    data = [ _serialize_leaderboard(l) for l in Leaderboard.objects.all() ]
    return JsonResponse(data, safe=False)


urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/users/', users_list, name='users-list'),
    path('api/teams/', teams_list, name='teams-list'),
    path('api/workouts/', workouts_list, name='workouts-list'),
    path('api/activities/', activities_list, name='activities-list'),
    path('api/leaderboard/', leaderboard_list, name='leaderboard-list'),
]
