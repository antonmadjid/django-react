from django.shortcuts import render
from django.views.generic import View


class MainApp(View):
    def get(self, request):
        return render(request, template_name="dashboard/index.html")
