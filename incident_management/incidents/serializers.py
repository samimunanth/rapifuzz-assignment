from rest_framework import serializers
from .models import User, Incident
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username', 'first_name', 'last_name', 'email', 'address', 'country', 
            'state', 'city', 'pincode', 'mobile_number', 'fax', 'phone', 
            'user_type', 'password', 'confirm_password'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.pop('confirm_password', None)

        if password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})

        return attrs

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            address=validated_data['address'],
            country=validated_data['country'],
            state=validated_data['state'],
            city=validated_data['city'],
            pincode=validated_data['pincode'],
            mobile_number=validated_data['mobile_number'],
            fax=validated_data.get('fax'),
            phone=validated_data.get('phone'),
            user_type=validated_data['user_type']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class IncidentSerializer(serializers.ModelSerializer):
    reporter = serializers.ReadOnlyField(source='reporter.username')

    class Meta:
        model = Incident
        fields = ['id', 'reporter', 'reporter_type', 'incident_id', 'incident_details', 'reported_date', 'priority', 'status']
        

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def validate(cls, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials')

        # Call the parent method to get the token
        data = super().validate(attrs)
        return data 
        