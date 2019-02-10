from django.shortcuts import render
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist

from .forms import PageForm
from .models import Page

# Create your views here.

def hello(request, slug):
    return HttpResponse("Hello, world. You're at the "+slug+" view.")

def home(request):
    return render(request, 'home.html')
    #return HttpResponse("Hello, world. You're home.")

def squares(request):
    return render(request, 'squares.html')
    #return HttpResponse("Hello, world. You're home.")

@login_required
def newPage(request):
    if request.method == 'POST':
        form = PageForm(request.POST)

        if form.is_valid():
            post = form.save(commit=False)
            post.createdBy = request.user

            try:
                post.save()
            except IntegrityError as e:
                return render(request, 'pageForm.html', {'form': form, 'error': e})
            return render(request, 'home.html')
        else:
            #return render(request, 'home.html')
            return render(request, 'pageForm.html', {'form':form})

    else:
        form = PageForm()
    return render(request, 'pageForm.html', {'form':form})
