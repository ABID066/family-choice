import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavigationProps {
  // No props needed as we're using router navigation
}

export default function BottomNavigation({}: BottomNavigationProps = {}) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  
  const handleHomePress = () => {
    router.push('/home');
  };

  const handleLovePress = () => {
    router.push('/favorite');
  };

  const handleStorePress = () => {
    router.push('/shortList');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const isActive = (route: string) => pathname === route;
  const getIconColor = (route: string) => isActive(route) ? '#52A587' : '#9CA3AF';
  const getTextColor = (route: string) => isActive(route) ? 'text-gg' : 'text-gray-500';
  return (
    <View className="bg-[#E5F1ED] border-t border-gray-200" style={{ paddingBottom: insets.bottom }}>
      <View className="flex-row items-center justify-around py-2">
        <TouchableOpacity 
          className="items-center py-2"
          onPress={handleHomePress}
        >
          <Entypo name="home" size={20} color={getIconColor('/home')} />
          <Text className={`font-poppins text-xs ${getTextColor('/home')} mt-1`}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center py-2"
          onPress={handleLovePress}
        >
          <AntDesign name="heart" size={20} color={getIconColor('/favorite')} />
          <Text className={`font-poppins text-xs ${getTextColor('/favorite')} mt-1`}>Love</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center py-2"
          onPress={handleStorePress}
        >
          <Ionicons name="grid" size={20} color={getIconColor('/shortList')} />
          <Text className={`font-poppins text-xs ${getTextColor('/shortList')} mt-1`}>Sorted by</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center py-2"
          onPress={handleProfilePress}
        >
          <Ionicons name="person-sharp" size={20} color={getIconColor('/profile')} />
          <Text className={`font-poppins text-xs ${getTextColor('/profile')} mt-1`}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}