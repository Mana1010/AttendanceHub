from django.urls import path
from . import views

urlpatterns = [
    path('add_user',views.add_user, name="add_user"),
    path('get_users', views.get_users, name="get_users"),
    path('get_session_logs', views.get_session_logs, name="get_session_logs"),
    path('enter_code', views.enter_code, name="enter_code"),
    path('time_out_user/<int:user_id>', views.time_out_user, name="time_out_user"),
    path('get_user_details/<int:user_id>', views.get_user_details, name="get_user_details"),
    path('get_session_log_details/<int:user_id>', views.get_session_log_details, name="get_session_log_details"),
    path('get_name_and_reason_user/<int:user_id>', views.get_name_and_reason_user, name="get_name_and_reason_user"),
    path('edit_reason/<int:user_id>', views.edit_reason, name="edit_reason"),
    path('get_user_details_edit_info/<int:user_id>', views.get_user_details_edit_info, name="get_user_details_edit_info")
]