from django.urls import path
from . import views

urlpatterns = [
    path('add_user',views.add_user, name="add_user"),
    path('get_users', views.get_users, name="get_users")
]