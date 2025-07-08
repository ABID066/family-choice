import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader, ServiceCard, services, ServiceItem } from '../../components/common';
import { useRouter } from 'expo-router';

export default function NurseryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter()

  // Filter services to show only nursery type
  const nurseryServices = services.filter(service => service.type === 'nursery');

  // Filter services based on search query
  const filteredServices = nurseryServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleBookNow = (serviceId: string) => {
    // Handle booking logic here
    console.log('Booking nursery service:', serviceId);
    router.push(`/nursery/${serviceId}`)
  };



  return (
    <SafeAreaView className="flex-1 mt-10 bg-gray-50">
      {/* Header */}
      <PageHeader 
        title="Nursery" 
        subtitle="All top class nursery schools are listed here"
      />

      

      {/* Services List */}
      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-row flex-wrap justify-between">
          {filteredServices.map((item) => (
            <View key={item.id} className="w-[49%] mb-4">
              <ServiceCard
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={handleBookNow}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}