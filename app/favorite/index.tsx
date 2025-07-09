import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common';
import BottomNavigation from '../../components/home/BottomNavigation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Rawad al khaleeji international school',
      location: 'UAE, Dubai',
      rating: 4.9,
      remaining: '5 years remaining',
      image: require('../../assets/school.png'),
    },
    {
      id: '2', 
      name: 'Rawad al khaleeji international school',
      location: 'UAE, Dubai',
      rating: 4.9,
      remaining: '5 years remaining',
      image: require('../../assets/school.png'),
    },
    {
      id: '3',
      name: 'Rawad al khaleeji international school', 
      location: 'UAE, Dubai',
      rating: 4.9,
      remaining: '5 years remaining',
      image: require('../../assets/school.png'),
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader  title="Favorite" showBackButton={false} />
      
      <ScrollView className="flex-1 px-4 pb-20">
        {favorites.length > 0 ? (
          <View className="py-4">
            {favorites.map((item) => (
              <View key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
                <View className="flex-row">
                  {/* Image */}
                  <Image 
                    source={item.image}
                    className="w-38 h-28 rounded-xl"
                    resizeMode="cover"
                  />
                  
                  {/* Content */}
                  <View className="flex-1 p-3">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text className="font-poppins-bold text-sm text-black flex-1 mr-2" numberOfLines={2}>
                        {item.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                        <Ionicons name="heart" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                    
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="location-outline" size={14} color="#6B7280" />
                      <Text className="font-poppins text-xs text-gray-600 ml-1">{item.location}</Text>
                      <View className="flex-row items-center ml-3">
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text className="font-poppins-medium text-xs text-gray-800 ml-1">{item.rating}</Text>
                        
                      </View>
                    </View>
                    
                    <View className="flex-row items-center justify-between">
                      <Text className="font-poppins text-[9px] text-gray-500 mr-1">{item.remaining}</Text>
                      
                      <TouchableOpacity className="bg-[#52A587] px-1.5 py-1.5 rounded-lg">
                        <Text className="font-poppins-medium text-white text-xs">Book now</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-gray-200 px-1.5 py-1.5 rounded-full ml-2">
                        <FontAwesome6 name="arrow-trend-up" size={12} color="#52A587" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
            <Text className="font-poppins text-lg text-gray-800 text-center mt-4">
              No favorites yet
            </Text>
            <Text className="font-poppins text-sm text-gray-500 text-center mt-2">
              Start exploring and add your favorites!
            </Text>
          </View>
        )}
      </ScrollView>
      
      <BottomNavigation />
    </SafeAreaView>
  );
}