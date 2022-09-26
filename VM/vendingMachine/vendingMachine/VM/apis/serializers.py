from rest_framework import serializers
from VM.models import VendingMachine
from Items.api.serializers import ItemSerializer
from Items.models import Items

class VendingMachineSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendingMachine
        fields = ('id',)