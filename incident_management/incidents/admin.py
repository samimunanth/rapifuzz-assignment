from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import User,Incident
# Register your models here.


# Define a custom UserAdmin class
class UserAdmin(DefaultUserAdmin):
    # Specify the fields to be displayed in the list view
    list_display = [field.name for field in User._meta.fields if field.name != 'password']

# Register the custom user admin
admin.site.register(User, UserAdmin)

class IncidentAdmin(admin.ModelAdmin):
    # Specify the fields to be displayed in the list view
    list_display = [field.name for field in Incident._meta.fields]
admin.site.register(Incident, IncidentAdmin)