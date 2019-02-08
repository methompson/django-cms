from django import forms
from .models import Page

class NewPageForm(forms.ModelForm):
    model Page
    fields = ['title', 'url', 'content']
