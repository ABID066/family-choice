import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common';
import BottomNavigation from '../../components/home/BottomNavigation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

export default function ProfilePage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const profileOptions = [
    { 
      icon: 'person', 
      iconType: 'Ionicons', 
      title: 'Account Details', 
      color: '#52A587',
      route: '/profile/details'
    },
    { 
      icon: 'language', 
      iconType: 'Ionicons', 
      title: 'Language', 
      color: '#52A587',
      route: '/profile/language'
    },
    { 
      icon: 'credit-card', 
      iconType: 'FontAwesome', 
      title: 'Payment methods', 
      color: '#52A587',
      route: '/profile/payment'
    },
    { 
       icon: 'headset', 
       iconType: 'MaterialIcons', 
       title: 'Contact support', 
       color: '#52A587',
       route: '/profile/support'
     },
    { 
      icon: 'log-out-outline', 
      iconType: 'Ionicons', 
      title: 'Logout', 
      color: '#52A587',
      action: 'logout'
    },
  ];

  const renderIcon = (iconName: string, iconType: string, color: string) => {
    const iconProps = { name: iconName as any, size: 20, color };
    
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons {...iconProps} />;
      case 'FontAwesome':
        return <FontAwesome {...iconProps} />;
      default:
        return <Ionicons {...iconProps} />;
    }
  };

  const handleOptionPress = (option: any) => {
    if (option.action === 'logout') {
      setShowLogoutModal(true);
    } else if (option.route) {
      router.push(option.route);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Add logout logic here
    Alert.alert('Logged Out', 'You have been successfully logged out.', [
      { text: 'OK', onPress: () => router.replace('/(Auth)/signin') }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader title="Profile" showBackButton={false} />
      
      <ScrollView className="flex-1 pb-20">
        {/* Profile Header */}
        <View className="items-center py-8 px-4">
          <View className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="font-poppins-semibold text-xl text-gray-800 mb-1">User 0123</Text>
          <Text className="font-poppins text-sm text-gray-500">abc......588l@gmail.com</Text>
        </View>

        {/* Profile Options */}
        <View className="px-4 pb-20">
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center mt-2 border border-gray-200 rounded-full py-5 px-3 "
              onPress={() => handleOptionPress(option)}
            >
              <View className="mr-4">
                {renderIcon(option.icon, option.iconType, option.color)}
              </View>
              <View className="flex-1">
                <Text className="font-poppins-medium text-[#52A587] text-md">{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#52A587" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <BottomNavigation />

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="log-out-outline" size={32} color="#EF4444" />
              </View>
              <Text className="font-poppins-semibold text-xl text-gray-800 text-center mb-2">
                Logout
              </Text>
              <Text className="font-poppins text-gray-600 text-center">
                Are you sure you want to logout from your account?
              </Text>
            </View>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                className="flex-1 bg-gray-100 py-3 rounded-lg"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-gray-700 text-center font-poppins-medium">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-1 bg-red-500 py-3 rounded-lg"
                onPress={handleLogout}
              >
                <Text className="text-white text-center font-poppins-medium">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}