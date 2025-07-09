import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '../../components/common';

const LanguagePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Arabic');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  ];

  const handleLanguageSelect = (languageName: string) => {
    setSelectedLanguage(languageName);
  };

  const handleSaveLanguage = () => {
    // Handle save logic here
    console.log('Saving language:', selectedLanguage);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 mt-5 bg-white">
      <PageHeader title="Language" />
      
      <ScrollView className="flex-1 px-6">
        

        {/* Language Options */}
        <View className="space-y-4">
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => handleLanguageSelect(language.name)}
              className={`flex-row items-center p-4 mb-5 rounded-2xl ${
                selectedLanguage === language.name
                  ? 'bg-gg'
                  : 'bg-gray-100'
              }`}
            >
              <Text className="text-2xl mr-4">{language.flag}</Text>
              <Text className={`font-medium text-md ${
                selectedLanguage === language.name ? 'text-white' : 'text-gray-800'
              }`}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-gray-600 text-sm   text-left">
          You can change language later from menu bar
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleSaveLanguage}
          className="bg-gg rounded-2xl py-4 mt-12 mb-6"
        >
          <Text className="text-white text-center font-semibold text-md">Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguagePage;