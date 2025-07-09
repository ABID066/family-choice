import { View, Text, TouchableOpacity, Alert, Linking, ActivityIndicator, StyleSheet, TextInput, FlatList, Keyboard, ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapSelectionPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 25.2048, // Dubai default
    longitude: 55.2708,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        
        // Get initial address for current location
        await reverseGeocode(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.log('Error getting location:', error);
      }
      setLoading(false);
    })();
  }, []);

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result.length > 0) {
        const address = result[0];
        const formattedAddress = `${address.street || ''} ${address.city || ''} ${address.region || ''} ${address.country || ''}`.trim();
        setSelectedLocation({
          latitude,
          longitude,
          address: formattedAddress || 'Unknown location'
        });
      }
    } catch (error) {
      console.log('Error reverse geocoding:', error);
      setSelectedLocation({
        latitude,
        longitude,
        address: 'Unable to get address'
      });
    }
  };

  const onRegionChangeComplete = (region: Region) => {
    setMapRegion(region);
    
    // Debounce the reverse geocoding to avoid too many API calls
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      reverseGeocode(region.latitude, region.longitude);
    }, 500);
  };

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await Location.geocodeAsync(query);
      const formattedResults = await Promise.all(
        results.slice(0, 5).map(async (result) => {
          try {
            const reverseResult = await Location.reverseGeocodeAsync({
              latitude: result.latitude,
              longitude: result.longitude,
            });
            const address = reverseResult[0];
            const formattedAddress = `${address?.street || ''} ${address?.city || ''} ${address?.region || ''} ${address?.country || ''}`.trim();
            return {
              ...result,
              formattedAddress: formattedAddress || 'Unknown location',
            };
          } catch {
            return {
              ...result,
              formattedAddress: 'Unknown location',
            };
          }
        })
      );
      setSearchResults(formattedResults);
      setShowSearchResults(true);
    } catch (error) {
      console.log('Search error:', error);
      Alert.alert('Search Error', 'Unable to search for locations. Please try again.');
    }
    setIsSearching(false);
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    
    searchTimer.current = setTimeout(() => {
      searchLocation(text);
    }, 800);
  };

  const selectSearchResult = (result: any) => {
    const newRegion = {
      latitude: result.latitude,
      longitude: result.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    
    setMapRegion(newRegion);
    setSelectedLocation({
      latitude: result.latitude,
      longitude: result.longitude,
      address: result.formattedAddress,
    });
    setSearchQuery(result.formattedAddress);
    setShowSearchResults(false);
    Keyboard.dismiss();
    
    // Animate map to the selected location
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    Keyboard.dismiss();
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
    <ScrollView className="flex-1 mb-8 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
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
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4285F4" />
            <Text className="mt-4 font-poppins text-gray-600">Loading map...</Text>
          </View>
        ) : (
          <>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={mapRegion}
              onRegionChangeComplete={onRegionChangeComplete}
              showsUserLocation={true}
              showsMyLocationButton={false}
              toolbarEnabled={false}
              mapType="standard"
              showsCompass={true}
              showsScale={true}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
            />
            
            {/* Center Pin */}
            <View className="absolute top-1/2 left-1/2 -ml-6 -mt-12 z-10">
              <View className="relative">
                <Ionicons name="location" size={48} color="#EF4444" />
                <View className="absolute -bottom-1 left-1/2 -ml-3 w-6 h-6 bg-red-500 rounded-full opacity-30" />
              </View>
            </View>
          </>
        )}

        {/* Search Bar */}
        <View className="absolute top-4 left-4 right-4 z-20">
          <View className="bg-white rounded-lg shadow-md">
            <View className="flex-row items-center px-4 py-3">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="ml-3 font-poppins text-gray-700 flex-1"
                placeholder="Search for a location..."
                value={searchQuery}
                onChangeText={handleSearchInputChange}
                onFocus={() => setShowSearchResults(searchResults.length > 0)}
                returnKeyType="search"
                onSubmitEditing={() => searchLocation(searchQuery)}
              />
              {(searchQuery.length > 0 || isSearching) && (
                <TouchableOpacity onPress={clearSearch} className="ml-2">
                  {isSearching ? (
                    <ActivityIndicator size="small" color="#9CA3AF" />
                  ) : (
                    <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              )}
            </View>
            
            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <View className="border-t border-gray-200">
                <FlatList
                  data={searchResults}
                  keyExtractor={(item, index) => `${item.latitude}-${item.longitude}-${index}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="px-4 py-3 border-b border-gray-100"
                      onPress={() => selectSearchResult(item)}
                    >
                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="#6B7280" />
                        <Text className="ml-3 font-poppins text-gray-700 flex-1" numberOfLines={2}>
                          {item.formattedAddress}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: 200 }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
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

        

        {/* Pick Location Button */}
        <TouchableOpacity 
          className={`rounded-full py-4 ${
            selectedLocation ? 'bg-gg' : 'bg-gray-300'
          }`}
          onPress={handlePickLocation}
          disabled={!selectedLocation}
        >
          <Text className={`text-center text-md font-poppins-semibold ${
            selectedLocation ? 'text-white' : 'text-gray-500'
          }`}>
            Pick Location
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});