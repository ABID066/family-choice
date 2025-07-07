import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendInstructions = () => {
    // Check if email is empty
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // If validation passes, navigate to OTP verification page with email parameter
     router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
  };

  return (
      <View className="flex-1 bg-white px-6 ">
      {/* Header */}
      <Text className="text-2xl font-poppins-bold text-black text-center mt-20 mb-4">
        Reset password
      </Text>
      
      {/* Description */}
      <Text className="text-sm font-poppins text-gray-600 text-center mb-12 px-4">
        Enter the email associated with your account and we'll send an email with instructions to reset your password.
      </Text>

      {/* Illustration */}
      <View className="items-center mb-12">
        <View className="mb-6">
          <Image 
            source={require('../../assets/resetPassword.png')} 
            className="w-64 h-48"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Email Input */}
      <View className="mb-8">
        <Text className="text-md font-poppins-medium text-black mb-2">
          Email Address
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-3">
          <Ionicons name="mail-outline" size={20} color="#52A587" className="mr-3" />
          <TextInput
            placeholder="abc*****@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 font-poppins text-gray-700 ml-3"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Send Instructions Button */}
      <TouchableOpacity 
        className="bg-gg rounded-full py-4 mb-6"
        onPress={handleSendInstructions}
      >
        <Text className="text-white text-center text-lg font-poppins-semibold">
          Send instructions
        </Text>
      </TouchableOpacity>

      
    </View>
  );
}