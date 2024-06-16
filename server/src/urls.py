from django.urls import path
from . import views

urlpatterns = [
    path('add_user',views.add_user, name="add_user"),
    path('get_users', views.get_users, name="get_users"),
    path('get_session_logs', views.get_session_logs, name="get_session_logs"),
    path('time_out_user/<int:user_id>', views.time_out_user, name="time_out_user"),
    path('get_user_details/<int:user_id>', views.get_user_details, name="get_user_details")
]