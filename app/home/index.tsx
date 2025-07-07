import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Import components
import Header from '../../components/home/Header';
import SearchBar from '../../components/home/SearchBar';
import FamilyChoiceBanner from '../../components/home/FamilyChoiceBanner';
import CategoryTabs from '../../components/home/CategoryTabs';
import ServiceSection from '../../components/home/ServiceSection';
import BottomNavigation from '../../components/home/BottomNavigation';
import { ServiceItem, BannerItem } from '../../components/home/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  const screenWidth = Dimensions.get('window').width;
  const translateX = useSharedValue(0);
  
  const bannerImages: BannerItem[] = [
    {
      id: '1',
      title: 'Family Choice',
      subtitle: 'Best services for your family'
    },
    {
      id: '2',
      title: 'Quality Education',
      subtitle: 'Excellence in learning'
    },
    {
      id: '3',
      title: 'Safe Environment',
      subtitle: 'Your child\'s safety first'
    },
    {
      id: '4',
      title: 'Quality Education',
      subtitle: 'Excellence in learning'
    },{
      id: '5',
      title: 'Quality Education',
      subtitle: 'Excellence in learning'
    },
  ];
  
 
  
  const goToSlide = (index: number) => {
    translateX.value = withSpring(-(index * (screenWidth - 48)));
    setCurrentBannerIndex(index);
  };

  // Mock data for services
  const services: ServiceItem[] = [
    {
      id: '1',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/nursery.png'),
      type: 'nursery'
    },
    {
      id: '2',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/nursery.png'),
      type: 'nursery'
    },
    {
      id: '3',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/nursery.png'),
      type: 'nursery'
    },
    {
      id: '4',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/nursery.png'),
      type: 'nursery'
    },
    {
      id: '5',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/school.png'),
      type: 'school'
    },
    {
      id: '6',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/school.png'),
      type: 'school'
    },
    {
      id: '7',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/school.png'),
      type: 'school'
    },
    {
      id: '8',
      name: 'Rawad al khaleej International school',
      location: 'UAE, Dubai',
      rating: 4.9,
      seatsRemaining: 10,
      image: require('../../assets/school.png'),
      type: 'school'
    }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Services can be filtered by search query if needed
  // const filteredServices = services.filter(service => 
  //   service.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleBookNow = (serviceId: string) => {
    // Handle booking logic here
    console.log('Booking service:', serviceId);
  };

  // Filter services by type
  const nurseryServices = services.filter(service => service.type === 'nursery');
  const schoolServices = services.filter(service => service.type === 'school');

  return (
    <SafeAreaView className="flex-1 mt-10 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <Header />
        
        {/* Search Bar */}
        <View className="px-6">
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </View>
        
        {/* Family Choice Banner */}
        <FamilyChoiceBanner 
          bannerImages={bannerImages}
          currentBannerIndex={currentBannerIndex}
          translateX={translateX}
          onSlidePress={goToSlide}
        />
        
        {/* Category Tabs */}
        <CategoryTabs />
        
        {/* Nursery Section */}
        <ServiceSection 
          title="Nursery"
          services={nurseryServices}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onBookNow={handleBookNow}
        />

        {/* School Section */}
        <ServiceSection 
          title="School"
          services={schoolServices}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onBookNow={handleBookNow}
        />
      </ScrollView>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}