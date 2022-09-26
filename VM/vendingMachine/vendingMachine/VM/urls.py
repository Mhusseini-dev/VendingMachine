from django.urls import path 
from VM.views import CreateVendingMachine, GetVendingMachine

urlpatterns = [
    path('/create', CreateVendingMachine.as_view()),
    path('/get', GetVendingMachine.as_view()),
]
