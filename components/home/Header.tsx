import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface HeaderProps {
  onNotificationPress?: () => void;
  onLibraryPress?: () => void;
  onLocationPress?: () => void;
}

export default function Header({ 
  onNotificationPress, 
  onLibraryPress, 
  onLocationPress 
}: HeaderProps) {
  return (
    <View className="bg-white px-6 py-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="font-poppins-semibold text-2xl text-gray-900">
            Good Morning
          </Text>
        </View>
        
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity 
            className="bg-gg rounded-full mr-4 p-3"
            onPress={onLibraryPress}
          >
            <MaterialIcons name="library-add" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gg rounded-full p-3"
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Location Selector */}
      <TouchableOpacity 
        className="bg-gg rounded-full px-4 py-2 self-start mb-4"
        onPress={onLocationPress}
      >
        <View className="flex-row items-center">
          <Ionicons name="location" size={16} color="white" />
          <Text className="font-poppins-medium text-white ml-2">
            UAE, Dubai
          </Text>
          <Ionicons name="chevron-down" size={16} color="white" className="ml-1" />
        </View>
      </TouchableOpacity>
    </View>
  );
}