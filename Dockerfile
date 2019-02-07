FROM python:3.7

RUN mkdir -p /srv/django/cms
WORKDIR /srv/django/cms

#install the rest of the dependencies
RUN pip install gunicorn requests Pillow django psycopg2-binary python-decouple djangorestframework djangorestframework_simplejwt

#COPY . /srv/django/cms
#RUN cd cmsproject && python manage.py collectstatic --no-input

EXPOSE 8000

CMD ["gunicorn", "--chdir", "cmsproject", "--bind", ":8000", "cmsproject.wsgi:application"]
