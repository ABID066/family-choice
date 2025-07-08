import { View, Image } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function HomePage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      {/* Logo */}
      <View className="mb-8">
        <Image 
          source={require('../assets/logo.png')} 
          className="w-30 h-30"
          resizeMode="contain"
        />
      </View>
      
      
    </View>
  );
}