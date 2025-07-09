
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '../../components/common';

const ProfileDetailsPage = () => {
  // Profile data from JSON
  const profileData = {
    fullName: "User",
    email: "ab******@gmail.com",
    phoneNumber: "+971 000000",
    city: "Dubai",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const handleUpdatePress = () => {
    router.push('/profile/update');
  };

  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader title="Account Details" />
      
      <ScrollView className="flex-1 px-4 pb-20">
        {/* Profile Image Section */}
        <View className="items-center py-6">
          <Image
            source={{ uri: profileData.profileImage }}
            className="w-24 h-24 rounded-full"
          />
        </View>

        {/* Details Fields - Read Only */}
        <View className="flex-1 space-y-4">
          <View className="border-b border-gray-200 pb-4">
            <Text className="text-gray-800 text-lg">
              <Text className="text-gray-500">Full Name : </Text>
              <Text className="font-medium">{profileData.fullName}</Text>
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-4">
            <Text className="text-gray-800 text-lg">
              <Text className="text-gray-500">Email : </Text>
              <Text>{profileData.email}</Text>
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-4">
            <Text className="text-gray-800 text-lg">
              <Text className="text-gray-500">Number : </Text>
              <Text>{profileData.phoneNumber}</Text>
            </Text>
          </View>

          <View className="border-b border-gray-200 pb-4">
            <Text className="text-gray-800 text-lg">
              <Text className="text-gray-500">City : </Text>
              <Text>{profileData.city}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
       
       {/* Update Button - Fixed at bottom */}
       <View className="px-4 pb-6">
         <TouchableOpacity
           onPress={handleUpdatePress}
           className="bg-[#52A587] rounded-full py-4"
         >
           <Text className="text-white text-center font-semibold text-lg">Update Information</Text>
         </TouchableOpacity>
       </View>
    </SafeAreaView>
  );
};

export default ProfileDetailsPage;