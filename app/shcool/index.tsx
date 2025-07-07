import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader, ServiceCard, services, ServiceItem } from '../../components/common';

export default function SchoolPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter services to show only school type
  const schoolServices = services.filter(service => service.type === 'school');

  // Filter services based on search query
  const filteredServices = schoolServices.filter(service =>
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
    console.log('Booking school service:', serviceId);
  };

  const renderServiceCard = ({ item }: { item: ServiceItem }) => (
    <View className="w-[49%] mb-4">
      <ServiceCard
        item={item}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={toggleFavorite}
        onBookNow={handleBookNow}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 mt-10 bg-gray-50">
      {/* Header */}
      <PageHeader 
        title="School" 
        subtitle="All top class schools are listed here"
      />

      {/* Services List */}
      <View className="flex-1 px-6">
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}