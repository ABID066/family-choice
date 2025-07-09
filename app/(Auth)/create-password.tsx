import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function CreatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Add password validation logic here
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Navigate to success page or signin page
    console.log('Password reset successfully');
  };

  return (
    <ScrollView className="flex-1 mb-6 bg-white" contentContainerStyle={{ paddingHorizontal: 24 }}>
      {/* Header */}
      <Text className="text-2xl font-poppins-bold text-black text-center mt-16 mb-4">
        Create password
      </Text>
      
      {/* Description */}
      <Text className="text-sm font-poppins text-gray-600 text-center mb-12 px-4">
        Your new password must be different from previous used passwords
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

      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-md font-poppins-medium text-black mb-2">
          Password
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2">
          <Ionicons name="lock-closed-outline" size={20} color="#52A587" className="mr-3" />
          <TextInput
            placeholder="••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className="flex-1 font-poppins text-gray-700 ml-3"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-3">
            <Ionicons 
              name={showPassword ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation Password Input */}
      <View className="mb-8">
        <Text className="text-md font-poppins-medium text-black mb-2">
          Confirmation password
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2">
          <Ionicons name="lock-closed-outline" size={20} color="#52A587" className="mr-3" />
          <TextInput
            placeholder="••••••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            className="flex-1 font-poppins text-gray-700 ml-3"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-3">
            <Ionicons 
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity 
        className="bg-gg rounded-full py-4 mb-6"
        onPress={handleResetPassword}
      >
        <Text className="text-white text-center text-lg font-poppins-semibold">
          Reset password
        </Text>
      </TouchableOpacity>

      
    </ScrollView>
  );
}