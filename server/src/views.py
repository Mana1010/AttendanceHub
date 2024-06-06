from django.shortcuts import render
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

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
        user = User.objects.create(first_name=first_name, last_name=last_name, middle_name = middle_name, age = age, gender = gender, role = role, reason = reason, time_in =  time_in, qr_code = qr_code)
        return JsonResponse({"message": "Successfully added a user", "code": user.qr_code, "first_name": user.first_name}, status=201)
    except Exception as e:
        print(e)
        return JsonResponse({'message': "Opps, something went wrong, please try again"})
