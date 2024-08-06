from django.urls import path
from .views import CreateUserView, IncidentListCreateView, IncidentDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView, TokenRefreshView

urlpatterns = [
    path('api/register/', CreateUserView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/incidents/', IncidentListCreateView.as_view(), name='incident_list_create'),
    path('api/incidents/<int:pk>/', IncidentDetailView.as_view(), name='incident_detail'),
]
