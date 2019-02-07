FROM python:3.7

RUN mkdir -p /srv/django/fileviewer
RUN mkdir -p /srv/django/fileviewer-backup
WORKDIR /srv/django/fileviewer

#install the rest of the dependencies
RUN pip install gunicorn requests Pillow django psycopg2-binary python-decouple djangorestframework djangorestframework_simplejwt

COPY . /srv/django/fileviewer
RUN cd fileviewerProject && python manage.py collectstatic --no-input

EXPOSE 8000

CMD ["gunicorn", "--chdir", "fileviewerProject", "--bind", ":8000", "fileviewerProject.wsgi:application"]
