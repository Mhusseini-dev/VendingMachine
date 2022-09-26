from rest_framework import serializers
from Items.models import Items

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Items 
        fields = ('id','item_name', 'item_quantity', 'vending_machine','item_price')
