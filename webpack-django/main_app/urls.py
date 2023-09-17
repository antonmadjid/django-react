from django.urls import path
from .views import MainApp

app_name = "main_app"

urlpatterns = [path("", MainApp.as_view(), name="index")]
