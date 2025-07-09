import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function LocationPage() {
  const handleUseCurrentLocation = () => {
    // Handle current location logic here
    console.log('Use current location');
    // Navigate to next page or main app
  };

  return (
    <ScrollView className="flex-1 mb-5 bg-white" contentContainerStyle={{ paddingHorizontal: 24, flexGrow: 1 }}>
      {/* Header */}
      <View className="pt-16 pb-8">
        <Text className="text-2xl font-poppins-bold text-center text-black">
          Location
        </Text>
      </View>

      {/* Center Content */}
      <View className="flex-1 justify-center items-center">
        <Image 
          source={require('../../assets/map.png')}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>

      {/* Bottom Buttons */}
      <View className="pb-8">
        {/* Use Current Location Button */}
        <TouchableOpacity 
          className="bg-gg rounded-full py-4 mb-4"
          onPress={handleUseCurrentLocation}
        >
          <Text className="text-white text-center text-md font-poppins-semibold">
            Use Current location
          </Text>
        </TouchableOpacity>

        {/* Set From Map Button */}
        <TouchableOpacity 
          className="bg-gray-200 rounded-full py-4"
          onPress={() => router.push('/(Auth)/map-selection')}
        >
          <Text className="text-gray-700 text-center text-md font-poppins-semibold">
            Set From Map
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}