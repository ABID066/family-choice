import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  onFilterPress,
  placeholder = "Search Your Service"
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 font-poppins text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={onSearchChange}
      />
      <TouchableOpacity 
        className="bg-gg rounded-full p-2"
        onPress={onFilterPress}
      >
        <Ionicons name="options" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}