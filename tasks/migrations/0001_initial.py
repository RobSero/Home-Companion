# Generated by Django 3.1 on 2020-08-16 16:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=150)),
                ('completed', models.BooleanField(default=False)),
                ('private', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('assigned_to', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='task_assigned', to=settings.AUTH_USER_MODEL)),
                ('completed_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='task_completed', to=settings.AUTH_USER_MODEL)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='task_creator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
