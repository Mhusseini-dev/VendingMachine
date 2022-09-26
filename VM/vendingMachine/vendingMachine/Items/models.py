from django.db import models
from VM.models import VendingMachine
class Items(models.Model):
    item_name = models.CharField(max_length=255)
    item_quantity = models.IntegerField()
    item_price = models.IntegerField()
    vending_machine = models.ForeignKey(VendingMachine, on_delete=models.CASCADE)