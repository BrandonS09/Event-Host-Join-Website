# Generated by Django 5.0.7 on 2024-08-05 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_event_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='time',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='date',
            field=models.DateField(null=True),
        ),
    ]
