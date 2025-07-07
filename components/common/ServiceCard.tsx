import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceItem } from './data';

interface ServiceCardProps {
  item: ServiceItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBookNow: (serviceId: string) => void;
}

export default function ServiceCard({ 
  item, 
  isFavorite, 
  onToggleFavorite, 
  onBookNow 
}: ServiceCardProps) {
  return (
    <View className="bg-white rounded-lg mb-4 shadow-sm">
      <View className="relative">
        <Image 
          source={item.image}
          className="w-full h-32 rounded-t-lg"
          resizeMode="cover"
        />
        <TouchableOpacity 
          className="absolute top-3 right-3 bg-white rounded-full p-2"
          onPress={() => onToggleFavorite(item.id)}
        >
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={20} 
            color={isFavorite ? '#EF4444' : '#9CA3AF'} 
          />
        </TouchableOpacity>
      </View>
      
      <View className="py-4 px-2">
        <Text className="font-poppins-semibold text-md justify-between text-gray-900 mb-1">
          {item.name}
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text className="font-poppins-medium text-sm text-gray-900 ml-1">
              {item.rating}/5
            </Text>
          </View>
        </Text>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text className="font-poppins text-sm text-gray-600 ml-1">
            {item.location}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-3">
          <Text className="font-poppins text-xs text-gray-600">
            {item.seatsRemaining} seats remaining
          </Text>

          <TouchableOpacity 
            className="bg-gg rounded-lg ml-2 py-2 px-2"
            onPress={() => onBookNow(item.id)}
          >
            <Text className="text-center text-xs font-poppins-semibold text-white">
              Book now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}