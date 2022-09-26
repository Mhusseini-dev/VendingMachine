# Generated by Django 4.0.7 on 2022-09-24 08:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('VM', '0004_remove_vendingmachine_items'),
        ('Items', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='items',
            name='vending_machine_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='VM.vendingmachine'),
            preserve_default=False,
        ),
    ]