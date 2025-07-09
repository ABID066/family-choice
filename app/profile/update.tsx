import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '../../components/common';

const ProfileUpdatePage = () => {
  const [fullName, setFullName] = useState('User');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: 'AE', dial_code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' });

  // Country codes array
  const countryCodes = [
    { code: 'AE', dial_code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: 'AR', dial_code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: 'AT', dial_code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: 'AU', dial_code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'BD', dial_code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: 'BE', dial_code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: 'BG', dial_code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: 'BR', dial_code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: 'CA', dial_code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: 'CH', dial_code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: 'CL', dial_code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: 'CN', dial_code: '+86', flag: '🇨🇳', name: 'China' },
    { code: 'CO', dial_code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: 'CZ', dial_code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: 'DE', dial_code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: 'DK', dial_code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: 'EG', dial_code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: 'ES', dial_code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: 'FI', dial_code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: 'FR', dial_code: '+33', flag: '🇫🇷', name: 'France' },
    { code: 'GB', dial_code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'GR', dial_code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: 'HK', dial_code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
    { code: 'HU', dial_code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: 'ID', dial_code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: 'IE', dial_code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: 'IL', dial_code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: 'IN', dial_code: '+91', flag: '🇮🇳', name: 'India' },
    { code: 'IT', dial_code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: 'JP', dial_code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: 'KR', dial_code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: 'MX', dial_code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: 'MY', dial_code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: 'NG', dial_code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: 'NL', dial_code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: 'NO', dial_code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: 'NZ', dial_code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: 'PH', dial_code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: 'PK', dial_code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: 'PL', dial_code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: 'PT', dial_code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: 'RO', dial_code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: 'RU', dial_code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: 'SA', dial_code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: 'SE', dial_code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: 'SG', dial_code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: 'TH', dial_code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: 'TR', dial_code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: 'TW', dial_code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: 'UA', dial_code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: 'US', dial_code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: 'VN', dial_code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: 'ZA', dial_code: '+27', flag: '🇿🇦', name: 'South Africa' }
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile updates...');
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader title="Account Details" />
      
      <ScrollView className="flex-1 px-4 pb-20">
        {/* Profile Image Section */}
        <View className="items-center py-6">
          <View className="relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#52A587] rounded-full p-2">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          <View>
            <Text className="text-md font-medium text-black mb-2">Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              className="border border-gray-300 rounded-full mb-3 px-4 py-4 text-gray-700"
              placeholder="Enter Your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-md font-medium text-black mb-2">Email</Text>
            <View className="border border-gray-300 rounded-full mb-3 px-4 py-4 bg-gray-100">
              <Text className="text-gray-500">ab******@gmail.com</Text>
            </View>
          </View>

          <View className='mb-3'>
            <Text className="text-md font-medium text-black mb-2">Phone number</Text>
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2">
              <TouchableOpacity
                className="flex-row items-center px-1 border-r border-gray-200"
                onPress={() => setShowCountryModal(true)}
              >
                <Text className="mr-1">{selectedCountry.flag}</Text>
                <Text className="text-sm">{selectedCountry.dial_code}</Text>
                <Ionicons name="chevron-down" size={16} color="gray" className="ml-1" />
              </TouchableOpacity>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                className="flex-1 py-3 text-gray-700 ml-3"
                placeholder=""
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View>
            <Text className="text-md font-medium text-black mb-2">City</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              className="border border-gray-300 rounded-full px-4 py-5 text-gray-700"
              placeholder="Type here..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-[#52A587] rounded-full py-4 mx-4 mt-8 mb-6"
        >
          <Text className="text-white text-center font-semibold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Country Code Selection Modal */}
      <Modal
        visible={showCountryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl h-2/3">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-bold">Select Country Code</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-100 flex-row items-center"
                  onPress={() => {
                    setSelectedCountry(item);
                    setShowCountryModal(false);
                  }}
                >
                  <Text className="text-xl mr-3">{item.flag}</Text>
                  <Text className="flex-1">{item.name}</Text>
                  <Text className="font-medium">{item.dial_code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileUpdatePage;