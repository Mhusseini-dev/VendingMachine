from django.shortcuts import render
from django.http import HttpResponse
from VM.models import VendingMachine
from rest_framework.views import APIView
from VM.apis.serializers import VendingMachineSerializer
from rest_framework import status
from rest_framework.response import Response


def index(self):
    return HttpResponse('hello')

class CreateVendingMachine(APIView):
    def post(self,request):
        if request.method == 'POST':
            serializer = VendingMachineSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return HttpResponse('an error has occured')
        
class GetVendingMachine(APIView):
    def get(self,request):
        if request.method == 'GET':
            VMs = VendingMachine.objects.all()
            serializer = VendingMachineSerializer(VMs, many=True)
            return Response(serializer.data)
        
