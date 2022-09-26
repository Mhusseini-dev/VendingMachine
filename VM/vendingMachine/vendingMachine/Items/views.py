from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .api.serializers import ItemSerializer
from .models import Items
from rest_framework.response import Response
from rest_framework import status
from VM.models import VendingMachine
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def PurchaseItem(request,id):
    
    selected_item = Items.objects.get(id=id)
    data = json.loads(request.body)
    if (selected_item.item_quantity > 0 and int(data['payment']) >= selected_item.item_price ):
        selected_item.item_quantity -= 1
        selected_item.save()
        return HttpResponse('Enjoy!')
    return Response(status=status.HTTP_400_BAD_REQUEST)

class GetAllItems(APIView):
    def get(self,request):
        if request.method == 'GET':
            items = Items.objects.all()
            serializer = ItemSerializer(items,many=True)
            return Response(serializer.data)
        
class CreateItem(APIView):
    def post(self,request,vm_id):
        if request.method == 'POST':
            request.data._mutable = True
            vm = VendingMachine.objects.get(id=vm_id)
            request.data['vending_machine'] = vm.id
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return HttpResponse("an error has occured")

class GetItemById(APIView):
    def get(self,request,id):
        if request.method == 'GET':
            item = Items.objects.get(id=id)
            serializer = ItemSerializer(item)
            return Response(serializer.data)
        return HttpResponse("an error has occured")
    
class GetItemsFromVendingMachine(APIView):
    def get(self,request,id):
        if request.method == 'GET':
            vm = VendingMachine.objects.get(id=id)
            items = Items.objects.filter(vending_machine = vm)
            serializer = ItemSerializer(items,many=True)
            return Response(serializer.data)
        return HttpResponse('an error has occured')
        
