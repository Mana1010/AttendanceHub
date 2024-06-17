from django.shortcuts import render
from .models import User, SessionLog, Trash
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.

@csrf_exempt
def add_user(request):
    try:
        first_name = request.POST.get("firstname")
        last_name = request.POST.get("lastname")
        middle_name = request.POST.get("middlename")
        age = request.POST.get("age")
        gender = request.POST.get("gender")
        role = request.POST.get("role")
        time_in = request.POST.get("timeIn")
        reason = request.POST.get("reason")
        qr_code = request.POST.get("code")
        user = User.objects.create(first_name=first_name, last_name=last_name, middle_name = middle_name, age = age, gender = gender, role = role, reason = reason, time_in =  time_in, qr_code = qr_code, is_trash = False)
        SessionLog.objects.create(total_visit = 1, user = user)
        return JsonResponse({"message": "Successfully added a user", "code": user.qr_code, "first_name": user.first_name}, status=201)
    except Exception as e:
        print(e)
        return JsonResponse({'message': "Opps, something went wrong, please try again"}, status=400)

@csrf_exempt
def get_users(request):
    try:
        users = list(User.objects.values())
        return JsonResponse({'message': users}, status=200)
    except:
        return JsonResponse({'message': 'Something went wrong'}, status=500)

@csrf_exempt
def get_session_logs(request):
    try:
        users = list(User.objects.select_related("sessionlogs").values())
        return JsonResponse({'message': users}, status=200)
    except:
        return JsonResponse({'message': "Error"}, status=500)

@csrf_exempt
def get_session_log_details(request, user_id):
    try:
        session_log = list(SessionLog.objects.select_related("users").filter(user_id=user_id).values())
        user = list(User.objects.select_related("sessionlogs").filter(pk=user_id).values())
        return JsonResponse({'message': {"user": user, "session_log": session_log}}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'message': "User doesn't exist"})
    except:
        return JsonResponse({'message': 'Error'}, status=500)

@csrf_exempt
def time_out_user(request, user_id):
    try:
        time_consumed = request.POST.get("timeConsumed")
        time_out = request.POST.get("timeOut")
        User.objects.filter(pk=user_id).update(time_out = time_out)
        # SessionLog.objects.create()
        return JsonResponse({'message': "Successfully Time Out the user"})
    except:
        print("Error")

@csrf_exempt
def get_user_details(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user_data = {
            'user_id': user.user_id,
            'first_name': user.first_name,
            'middle_name': user.middle_name,
            'last_name': user.last_name,
            'age': user.age,
            'gender': user.gender,
            'role': user.role,
            'reason': user.reason,
            'qr_code': user.qr_code,
            'time_in': user.time_in,
            'time_out': user.time_out,
            'date_created': user.date_created,
            'date_updated': user.date_updated,
        }
        return JsonResponse({'message': user_data}, status=200)
    except:
        return JsonResponse({'message': 'Error'})
        
    
