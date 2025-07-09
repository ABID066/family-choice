import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

interface CategoryTabsProps {
  onNurseryPress?: () => void;
  onSchoolPress?: () => void;
}

export default function CategoryTabs({ onNurseryPress, onSchoolPress }: CategoryTabsProps) {
  const handleNurseryPress = () => {
    if (onNurseryPress) {
      onNurseryPress();
    } else {
      router.push('/nursery');
    }
  };

  const handleSchoolPress = () => {
    if (onSchoolPress) {
      onSchoolPress();
    } else {
      router.push('/school');
    }
  };

  return (
    <View className="mx-6 mb-6">
      <View className="flex-row bg-white rounded-lg p-1">
        
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3 rounded-full bg-white shadow-sm"
            onPress={handleNurseryPress}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 2,
            }}
          >
            <Image 
              source={require('../../assets/nursery-icon.png')}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="ml-2 font-poppins-medium text-gray-600">
              Nursery
            </Text>
          </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 flex-row items-center justify-center py-3 rounded-full bg-white shadow-sm"
          onPress={handleSchoolPress}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Image 
            source={require('../../assets/school-icon.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
          <Text className="ml-2 font-poppins-medium text-gray-600">
            School
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}