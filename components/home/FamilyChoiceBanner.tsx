import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
}

interface FamilyChoiceBannerProps {
  bannerImages: BannerItem[];
  currentBannerIndex: number;
  translateX: SharedValue<number>;
  onSlidePress: (index: number) => void;
}

export default function FamilyChoiceBanner({ 
  bannerImages, 
  currentBannerIndex, 
  translateX, 
  onSlidePress 
}: FamilyChoiceBannerProps) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <>
      {/* Family Choice Banner */}
      <View className="my-4 bg-[#E5F1ED]">
        <Animated.View className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl overflow-hidden">
          <Animated.View 
            className="flex-row"
            style={[{ transform: [{ translateX: translateX }] }]}
          >
            {bannerImages.map((banner, index) => (
              <View key={index} className="w-full p-6 items-center" style={{ width: screenWidth - 48 }}>
                <View className="flex-row items-center mb-2">
                  <View className="bg-green-500 rounded p-1 mr-1">
                    <Text className="text-white font-bold text-xs">F</Text>
                  </View>
                  <View className="bg-orange-500 rounded p-1 mr-1">
                    <Text className="text-white font-bold text-xs">C</Text>
                  </View>
                  <View className="bg-purple-500 rounded p-1">
                    <Text className="text-white font-bold text-xs">h</Text>
                  </View>
                </View>
                <Text className="font-poppins-bold text-lg text-gray-800 mb-1">
                  {banner.title}
                </Text>
                <Text className="font-poppins text-sm text-gray-600">
                  {banner.subtitle}
                </Text>
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </View>
      
      {/* Dots Indicator */}
      <View className="flex-row bg-white justify-center mb-10 space-x-2">
        {bannerImages.map((_, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => onSlidePress(index)}
            className={`h-2 rounded-full mx-1 ${
              index === currentBannerIndex ? 'w-4 bg-green-500' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </View>
    </>
  );
}