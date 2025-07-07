import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

interface BottomNavigationProps {
  onHomePress?: () => void;
  onLovePress?: () => void;
  onStorePress?: () => void;
  onProfilePress?: () => void;
}

export default function BottomNavigation({ 
  onHomePress, 
  onLovePress, 
  onStorePress, 
  onProfilePress 
}: BottomNavigationProps) {
  return (
    <View className="bg-[#E5F1ED] border-t border-gray-200">
      <View className="flex-row items-center justify-around py-3">
        <TouchableOpacity 
          className="items-center py-2"
          onPress={onHomePress}
        >
          <Entypo name="home" size={24} color="#52A587" />
          <Text className="font-poppins text-xs text-gg mt-1">Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center py-2"
          onPress={onLovePress}
        >
          <AntDesign name="heart" size={24} color="#9CA3AF" />
          <Text className="font-poppins text-xs text-gray-500 mt-1">Love</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center py-2"
          onPress={onStorePress}
        >
          <Ionicons name="grid-outline" size={24} color="#9CA3AF" />
          <Text className="font-poppins text-xs text-gray-500 mt-1">Store by</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center py-2"
          onPress={onProfilePress}
        >
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text className="font-poppins text-xs text-gray-500 mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}