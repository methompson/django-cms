from django.shortcuts import render
from django.http import HttpResponse, Http404

# Create your views here.

def hello(request, slug):
    return HttpResponse("Hello, world. You're at the "+slug+" view.")
