import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: 'AE', dial_code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' });

  // Example country codes - in a real app, you would have a complete list
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

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header */}
        <Text className="text-2xl font-poppins-bold text-black text-center mt-20 mb-8">
          Sign Up
        </Text>

        <View className="items-center mb-12">
        <View className="mb-6">
          <Image 
            source={require('../../assets/signup.png')} 
            className="w-30 h-30"
            resizeMode="contain"
          />
        </View>
        
        
      </View>

        {/* Full Name Input */}
        <View className="mb-4">
          <Text className="text-md font-poppins-medium text-black mb-2">
            Full Name
          </Text>
          <TextInput
            placeholder="Enter Your full name"
            value={fullName}
            onChangeText={setFullName}
            className="border border-gray-300 font-poppins text-gray-700 rounded-full  px-4 py-5"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-md font-poppins-medium text-black mb-2">
            Email
          </Text>
          <TextInput
            placeholder="abc*****@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300  rounded-full  px-4 py-5 font-poppins text-gray-700"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Phone Number Input */}
        <View className="mb-4">
          <Text className="text-md font-poppins-medium text-black mb-2">
            Phone number
          </Text>
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
              placeholder=""
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              className="flex-1 py-3 font-poppins text-gray-700 ml-3"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <Text className="text-md font-poppins-medium text-black mb-2">
            Password
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-full  px-4 py-2">
            <TextInput
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="flex-1 font-poppins text-gray-700"
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
        <View className="mb-6">
          <Text className="text-md font-poppins-medium text-black mb-2">
            Confirmation password
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-full  px-4 py-2">
            <TextInput
              placeholder="••••••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              className="flex-1 font-poppins text-gray-700"
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

        {/* Terms and Conditions Checkbox */}
        <View className="flex-row items-start mb-6">
          <TouchableOpacity 
            onPress={() => setAgreeToTerms(!agreeToTerms)}
            className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center ${
              agreeToTerms ? 'bg-gg border-gg' : 'border-gray-300'
            }`}
          >
            {agreeToTerms && (
              <Ionicons name="checkmark" size={12} color="white" />
            )}
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-sm font-poppins text-black leading-5">
              By log or registering, you agree to our{' '}
              <Link href="/privacy-policy" asChild>
                <Text className="text-gg font-poppins-medium">Privacy Policy</Text>
              </Link>
              {' '}and{' '}
              <Link href="/terms-of-service" asChild>
                <Text className="text-gg font-poppins-medium">Terms of Services</Text>
              </Link>
            </Text>
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity className="bg-gg rounded-full py-4 mb-6">
          <Text className="text-white text-center text-lg font-poppins-semibold">
            Register
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center">
          <Text className="text-md font-poppins text-black">
            Already have an account? 
          </Text>
          <Link href="/signin" asChild>
            <TouchableOpacity>
              <Text className="text-md pl-2 font-poppins-medium text-gg">
                Sign In
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

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
    </ScrollView>
  );
}