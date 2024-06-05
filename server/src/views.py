from django.shortcuts import render
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.

@csrf_exempt
def add_user(request):
    first_name = request.POST.get("firstname")
    last_name = request.POST.get("last_name")
    print(first_name)
    return JsonResponse({"name": "Hello"})
    # create_user = User.objects.create()