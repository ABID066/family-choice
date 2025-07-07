import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  showBackButton = true, 
  onBackPress 
}: PageHeaderProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="px-6 py-4 bg-white">
      <View className="flex-row items-center justify-between">
        {showBackButton && (
          <TouchableOpacity 
            onPress={handleBackPress}
            className="p-2 -ml-2"
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
        
        <View className="flex-1 items-center">
          <Text className="font-poppins-semibold text-lg text-gray-900 text-center">
            {title}
          </Text>
          {subtitle && (
            <Text className="font-poppins text-sm text-gray-600 mt-1 text-center">
              {subtitle}
            </Text>
          )}
        </View>
        
        {showBackButton && (
          <View className="w-10" />
        )}
      </View>
    </View>
  );
}