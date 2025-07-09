
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '../../components/common';

const SupportPage = () => {

  const contactOptions = [
    {
      id: 'phone',
      title: 'Contact using phone call',
      icon: 'call',
      iconType: 'Ionicons' as const,
      iconColor: '#3B82F6',
      action: () => Linking.openURL('tel:+15551234567'),
    },
    {
      id: 'whatsapp',
      title: 'Contact using Whatsapp',
      icon: 'logo-whatsapp',
      iconType: 'Ionicons' as const,
      iconColor: '#25D366',
      action: () => Linking.openURL('https://wa.me/15551234567'),
    },
  ];

  const renderIcon = (iconName: string, iconType: 'Ionicons' | 'MaterialIcons', size: number = 24, color: string = '#10B981') => {
    if (iconType === 'Ionicons') {
      return <Ionicons name={iconName as any} size={size} color={color} />;
    } else {
      return <MaterialIcons name={iconName as any} size={size} color={color} />;
    }
  };



  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader title="Contact Support" />
      
      <ScrollView className="flex-1 px-6">
        {/* Contact Options */}
        <View className="mt-8">
          {contactOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={option.action}
              className="flex-row rounded-full items-center justify-between p-4 bg-white border border-gray-200  mb-4"
            >
              <Text className="font-medium text-gray-800 flex-1">{option.title}</Text>
              <View className="w-10 h-10 rounded-full items-center justify-center">
                {renderIcon(option.icon, option.iconType, 28, option.iconColor)}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportPage;