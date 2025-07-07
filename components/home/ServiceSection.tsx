import React from 'react';
import { View, Text } from 'react-native';
import { ServiceCard, ServiceItem } from '../common';

interface ServiceSectionProps {
  title: string;
  services: ServiceItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBookNow: (serviceId: string) => void;
}

export default function ServiceSection({ 
  title, 
  services, 
  favorites, 
  onToggleFavorite, 
  onBookNow 
}: ServiceSectionProps) {
  return (
    <View className="mx-6 mb-6">
      <Text className="font-poppins-semibold text-lg text-gg mb-4">
        {title}
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {services.map((item) => (
          <View key={item.id} className="w-[49%]">
            <ServiceCard
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
              onBookNow={onBookNow}
            />
          </View>
        ))}
      </View>
    </View>
  );
}