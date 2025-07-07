import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function MapSelectionPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  // Mock location data - in real implementation, this would come from map interaction
  const mockLocation = {
    latitude: 37.7749,
    longitude: -122.4194,
    address: "Dubai Outlet Mall, Route 66 - Al Ain - Dubai Road"
  };

  const handleMapPress = () => {
    // Simulate location selection
    setSelectedLocation(mockLocation);
  };

  const handlePickLocation = () => {
    if (selectedLocation) {
      Alert.alert(
        'Location Selected',
        `Selected: ${selectedLocation.address}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to next page or back to main flow
              router.back();
            }
          }
        ]
      );
    } else {
      Alert.alert('No Location Selected', 'Please select a location on the map first.');
    }
  };

  const openGoogleMaps = async () => {
    const url = 'https://maps.google.com/';
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Google Maps is not available on this device.');
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4 bg-white">
        <TouchableOpacity onPress={handleBackPress} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-poppins-semibold text-black">
          Select Location
        </Text>
        <View className="w-8" />
      </View>

      {/* Map Container */}
      <View className="flex-1 bg-gray-100 relative">
        {/* Google Maps Style Interface */}
        <TouchableOpacity 
          className="flex-1 bg-blue-50"
          onPress={handleMapPress}
        >
          {/* Map Grid Pattern */}
          <View className="flex-1 relative">
            {/* Street Lines */}
            <View className="absolute inset-0">
              {/* Horizontal lines */}
              {[...Array(8)].map((_, i) => (
                <View 
                  key={`h-${i}`}
                  className="absolute w-full h-px bg-gray-300"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                />
              ))}
              {/* Vertical lines */}
              {[...Array(6)].map((_, i) => (
                <View 
                  key={`v-${i}`}
                  className="absolute h-full w-px bg-gray-300"
                  style={{ left: `${(i + 1) * 16.66}%` }}
                />
              ))}
            </View>
            
            {/* Map Features */}
            <View className="absolute top-1/4 left-1/3 w-16 h-12 bg-green-200 rounded opacity-60" />
            <View className="absolute top-1/2 right-1/4 w-20 h-8 bg-blue-200 rounded opacity-60" />
            <View className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-60" />
            
            {/* Roads */}
            <View className="absolute top-1/3 left-0 right-0 h-2 bg-gray-400 opacity-70" />
            <View className="absolute top-0 bottom-0 left-2/3 w-2 bg-gray-400 opacity-70" />
            
            {/* Buildings */}
            <View className="absolute top-1/5 left-1/5 w-8 h-8 bg-gray-300 opacity-80" />
            <View className="absolute top-2/3 right-1/3 w-6 h-10 bg-gray-300 opacity-80" />
            <View className="absolute bottom-1/4 left-1/2 w-10 h-6 bg-gray-300 opacity-80" />
          </View>
        </TouchableOpacity>

        {/* Location Pin Indicator */}
        {selectedLocation && (
          <View className="absolute top-1/2 left-1/2 -ml-5 -mt-10">
            <View className="relative">
              <Ionicons name="location" size={40} color="#EF4444" />
              <View className="absolute -bottom-2 left-1/2 -ml-2 w-4 h-4 bg-red-500 rounded-full opacity-30" />
            </View>
          </View>
        )}

        {/* Search Bar */}
        <View className="absolute top-4 left-4 right-4">
          <View className="bg-white rounded-lg px-4 py-3 shadow-md flex-row items-center">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <Text className="ml-3 font-poppins text-gray-500 flex-1">
              {selectedLocation ? selectedLocation.address : "Search for a location..."}
            </Text>
          </View>
        </View>

        {/* Google Maps Button */}
        <View className="absolute top-20 right-4">
          <TouchableOpacity 
            className="bg-white rounded-full p-3 shadow-md"
            onPress={openGoogleMaps}
          >
            <Ionicons name="map" size={24} color="#4285F4" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="bg-white px-6 py-4 border-t border-gray-200">
        {selectedLocation && (
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={20} color="#6B7280" />
              <Text className="ml-2 font-poppins-medium text-gray-800">
                Selected Location
              </Text>
            </View>
            <Text className="font-poppins text-sm text-gray-600 ml-6">
              {selectedLocation.address}
            </Text>
          </View>
        )}

        {/* Open Google Maps Button */}
        <TouchableOpacity 
          className="bg-blue-500 rounded-full py-4 mb-3 flex-row items-center justify-center"
          onPress={openGoogleMaps}
        >
          <Ionicons name="map" size={20} color="white" />
          <Text className="text-center text-lg font-poppins-semibold text-white ml-2">
            Open Google Maps
          </Text>
        </TouchableOpacity>

        {/* Pick Location Button */}
        <TouchableOpacity 
          className={`rounded-full py-4 ${
            selectedLocation ? 'bg-gg' : 'bg-gray-300'
          }`}
          onPress={handlePickLocation}
          disabled={!selectedLocation}
        >
          <Text className={`text-center text-lg font-poppins-semibold ${
            selectedLocation ? 'text-white' : 'text-gray-500'
          }`}>
            Pick Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}