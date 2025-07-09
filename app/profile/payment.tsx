import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '../../components/common';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '4532',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '8901',
      expiryDate: '08/26',
      isDefault: false,
    },
  ]);

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return 'credit-card';
      case 'mastercard':
        return 'credit-card';
      case 'amex':
        return 'credit-card';
      default:
        return 'credit-card';
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case 'visa':
        return '#1A1F71';
      case 'mastercard':
        return '#EB001B';
      case 'amex':
        return '#006FCF';
      default:
        return '#6B7280';
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteCard = (id: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(methods => methods.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  const handleAddPaymentMethod = () => {
    // Navigate to add payment method screen
    console.log('Add new payment method');
  };

  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader title="Payment methods" />
      
      <View className="flex-1 items-center justify-center px-4">
        {/* Barcode Scanner Icon */}
        <View className="items-center">
          <Image 
            source={require('../../assets/barcode_reader.png')}
            className="w-32 h-32"
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodsPage;