# Generated by Django 4.2.7 on 2023-12-05 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('upnxt', '0004_review_user_favorite'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='title',
        ),
        migrations.RemoveField(
            model_name='review',
            name='user_review',
        ),
        migrations.RemoveField(
            model_name='review',
            name='user_score',
        ),
    ]