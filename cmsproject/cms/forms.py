from django import forms
from django.core.exceptions import ObjectDoesNotExist

from .models import Page

class PageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ['title', 'url', 'content', 'published']

    def clean_url(self):
        url = self.cleaned_data.get('url', '')

        if not url:
            raise forms.ValidationError("You must enter a subject")
            # if you don't want this functionality, just remove it.

        #Generates a Unique slug for pages that may have the same slug.
        slug = url
        i = 1
        while (True):
            try:
                #Searches the db for an object with the slug
                p = Page.objects.get(url=slug)
            except ObjectDoesNotExist:
                #Exception runs if the slug doesn't exist, i.e. it's unique
                break
            slug = url + str(i)
            ++i

        return slug
