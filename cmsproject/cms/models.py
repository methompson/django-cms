from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Page(models.Model):
    title = models.CharField(max_length=1023)
    slug = models.SlugField()
    content = models.TextField()
    published = models.BooleanField()
    createdDate = models.DateTimeField(blank=True, auto_now_add=True)
    publishedDate = models.DateTimeField(blank=True, null=True)
    updatedDate = models.DateTimeField(blank=True, auto_now=True)
    createdBy = models.ForeignKey(User, null=True, related_name='pages', on_delete=models.SET_NULL)
    updatedBy = models.ForeignKey(User, blank=True, null=True, related_name='+', on_delete=models.SET_NULL)
    parent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return slug

class Media(models.Model):
    name = models.CharField(max_length=1023)
    link = models.URLField(max_length=1023)
    Image = models.ImageField()
    File = models.FileField()
    size = models.FloatField()
    published = models.BooleanField()
    createdDate = models.DateTimeField(blank=True, auto_now_add=True)
    publishedDate = models.DateTimeField(blank=True, null=True)
    createdBy = models.ForeignKey(User, null=True, related_name='media', on_delete=models.SET_NULL)
    updatedBy = models.ForeignKey(User, blank=True, null=True, related_name='+', on_delete=models.SET_NULL)

    def __str__(self_):
        return link
