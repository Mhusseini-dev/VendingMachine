from django.db import models

class VendingMachine(models.Model):
    id = models.AutoField(primary_key=True)