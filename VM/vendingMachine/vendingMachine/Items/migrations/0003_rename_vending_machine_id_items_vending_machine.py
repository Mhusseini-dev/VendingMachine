# Generated by Django 4.0.7 on 2022-09-24 08:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Items', '0002_items_vending_machine_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='items',
            old_name='vending_machine_id',
            new_name='vending_machine',
        ),
    ]
