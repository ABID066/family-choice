import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { PageHeader } from '../../components/common';
import BottomNavigation from '../../components/home/BottomNavigation';

export default function ShortListPage() {
  return (
    <SafeAreaView className="flex-1 mt-16 bg-white">
      <PageHeader title="Shorte by" showBackButton={false} />
      
      <ScrollView className="flex-1 px-4">
        
      </ScrollView>
      
      <BottomNavigation />
    </SafeAreaView>
  );
}