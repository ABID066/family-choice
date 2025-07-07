import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      {/* Logo and Title */}
      <View className="items-center mb-12">
        <View className="mb-6">
          <Image 
            source={require('../../assets/logo.png')} 
            className="w-30 h-30"
            resizeMode="contain"
          />
        </View>
        
        
      </View>

      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-md bord  font-poppins-medium text-black mb-2">
          Your Email
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-full  px-4 py-3">
          <Ionicons name="mail-outline" size={20} color="#52A587" className="mr-3" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1  font-poppins text-gray-700 ml-3"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="mb-2">
        <Text className="text-md font-poppins-medium text-black mb-2">
          Password
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-3">
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

      {/* Forgot Password */}
      <Link href="/reset-password" asChild>
        <TouchableOpacity className="self-start mb-8">
          <Text className="text-md font-poppins text-[#52A587]">
            Forgot password ?
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Login Button */}
      <TouchableOpacity className="bg-gg rounded-full py-4 mb-6">
        <Text className="text-white text-center text-lg font-poppins-semibold">
          Login
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View className="flex-row justify-center">
        <Text className="text-md font-poppins text-gray-600">
          New user ?  
        </Text>
        <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text className="text-md font-poppins-medium text-gg ml-2">
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}