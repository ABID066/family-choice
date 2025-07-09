import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
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
    <ScrollView className="flex-1 mb-4 bg-white" contentContainerStyle={{ paddingHorizontal: 24 }}>
      {/* Header */}
      <Text className="mb-4 mt-16 text-center font-poppins-bold text-2xl text-black">
        Reset password
      </Text>

      {/* Description */}
      <Text className="mb-12 px-4 text-center font-poppins text-sm text-gray-600">
        Enter the email associated with your account and we&apos;ll send an email with instructions
        to reset your password.
      </Text>

      {/* Illustration */}
      <View className="mb-12 items-center">
        <View className="mb-6">
          <Image
            source={require('../../assets/resetPassword.png')}
            className="h-48 w-64"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Email Input */}
      <View className="mb-8">
        <Text className="text-md mb-2 font-poppins-medium text-black">Email Address</Text>
        <View className="flex-row items-center rounded-full border border-gray-300 px-4 py-1">
          <Ionicons name="mail-outline" size={20} color="#52A587" className="mr-3" />
          <TextInput
            placeholder="abc*****@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="ml-3 flex-1 font-poppins text-gray-700"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Send Instructions Button */}
      <TouchableOpacity className="mb-6 rounded-full bg-gg py-4" onPress={handleSendInstructions}>
        <Text className="text-center font-poppins-semibold text-md text-white">
          Send instructions
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
