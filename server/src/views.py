from django.shortcuts import render
from .models import User, SessionLog
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict


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
        users = list(User.objects.all().values())
        return JsonResponse({'message': users}, status=200)
    except:
        return JsonResponse({'message': 'Something went wrong'}, status=500)

@csrf_exempt
def get_session_logs(request):
    try:
        users = list(User.objects.all().values())
        return JsonResponse({'message': users}, status=200)
    except:
        return JsonResponse({'message': "Error"}, status=500)

@csrf_exempt
def get_session_log_details(request, user_id):
    try:
        session_log = list(SessionLog.objects.select_related('user').filter(user_id=user_id).values())
        user = list(User.objects.filter(pk=user_id).values())
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
        SessionLog.objects.filter(user_id=user_id).update(total_time_consumed = time_consumed)
        return JsonResponse({'message': "Successfully Time Out the user"})
    except:
        print("Error")
@csrf_exempt
def enter_code(request):
    code = request.POST.get("code")
    try:
        check_code = User.objects.filter(qr_code = code).exists()
        user= list(User.objects.filter(qr_code = code).values("user_id", "time_out", "is_trash"))
        if check_code and not user[0]["is_trash"]:
            if user[0]["time_out"]:
                 return JsonResponse({'message': "Successfully logged in", 'success': True, 'user_id': user[0]["user_id"]})
            else:
                return JsonResponse({'message': "The user is online", 'success': False})   
        else:
            raise ValueError(f"{code} code doesn't exist!")
      
    except ValueError as e:
        return JsonResponse({'message': str(e), 'success': False})
    except Exception as e:
        return JsonResponse({'message': 'Error', 'success': False})
@csrf_exempt
def get_user_details(request, user_id):
    try:
        user_data = list(User.objects.filter(pk=user_id).values())
        return JsonResponse({'message': user_data}, status=200)
    except:
        return JsonResponse({'message': 'Error'})
        
@csrf_exempt
def get_name_and_reason_user(request, user_id):
    user = list(User.objects.filter(pk=user_id).values("first_name", "reason"))
    return JsonResponse({'message': {
        'name': user[0]["first_name"],
        "reason": user[0]["reason"]
    }})

@csrf_exempt
def edit_reason(request, user_id):
    reason = request.POST.get("reason")
    time_in = request.POST.get("timeIn")
    User.objects.filter(pk=user_id).update(reason=reason, time_out = None, time_in = time_in)
    session = SessionLog.objects.get(user_id=user_id)
    session.total_visit += 1
    session.save()
    return JsonResponse({'message': "Successfully time in"}, status=201)

@csrf_exempt
def get_user_details_edit_info(request, user_id):
    try:
        user = list(User.objects.filter(pk=user_id).values("first_name", "middle_name", "last_name", "age", "gender", "role", "reason"))
        return JsonResponse({'message': user, 'success': True}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'message': "This user does not exist", 'success': False})
        
         
    
@csrf_exempt
def edit_user(request, user_id):
    first_name = request.POST.get("first_name")
    middle_name = request.POST.get("middle_name")
    last_name = request.POST.get("last_name")
    age = request.POST.get("age")
    gender = request.POST.get("gender")
    role = request.POST.get("role")
    reason = request.POST.get("reason")
    time_in = request.POST.get("timeIn")
    try:
        User.objects.filter(pk=user_id).update(first_name = first_name, middle_name = middle_name, last_name = last_name, age = age, gender = gender, role = role, reason = reason, time_out = None, time_in = time_in)
        session = SessionLog.objects.get(user_id = user_id)
        session.total_visit += 1
        session.save()
        return JsonResponse({'message': "Successfully update the profile", "success": True}, status=201)
    except ObjectDoesNotExist:
        return JsonResponse({'message': "User not found", "success": False}, status=404)
    except:
        return JsonResponse({'message': "Error", "success": False}, status=400)

@csrf_exempt
def trash_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        check_user_status = list(User.objects.filter(pk=user_id).values("time_out"))
        if check_user_status[0]["time_out"]:
            user.is_trash = True
            user.save()
            return JsonResponse({'message': 'The user successfully deleted', 'success': True}, status=201)
        else:
            return JsonResponse({'message': 'The user is online', 'success': False})
    except ObjectDoesNotExist as e:
        return JsonResponse({'message': str(e), 'success': False}, status=404)

@csrf_exempt
def get_all_trash(request):
    try:
       users = list(User.objects.filter(is_trash = True).values("user_id", "first_name", "middle_name", "last_name", "role", "reason"))
       return JsonResponse({'message': users, 'success': True}, status=200)
    except:
        return JsonResponse({'message': 'Error wtf'})
@csrf_exempt
def restore_user(request, user_id):
    try:
        User.objects.filter(pk=user_id).update(is_trash = False)
        return JsonResponse({'message': "Successfully restore the user"}, status=200)
    except ObjectDoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=404)
@csrf_exempt
def delete_user_permanently(request, user_id):
    try:
        User.objects.filter(pk=user_id).delete()
        SessionLog.objects.filter(user_id = user_id).delete()
        return JsonResponse({'message': "Successfully deleted the user permanently"}, status=200)
    except ObjectDoesNotExist as e:
        return JsonResponse({'mesage': str(e)}, status=404)

@csrf_exempt
def delete_all_user_permanently(request):
    confirmation = request.POST.get("confirmation")
    try:
        if confirmation == "attendance_hub_confirm_deletion":
             User.objects.filter(is_trash = True).delete()
             return JsonResponse({'message': "Successfullty delete all the trash permanently", 'success': True}, status=201)
        else:
            return JsonResponse({'message': "Wrong confirmation text", 'success': False})
    except:
        return JsonResponse({'message': "Error"}, status=500)
    