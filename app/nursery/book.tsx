import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common';

type FormData = {
  fullName: string;
  phoneNumber: string;
  detailedAddress: string;
  idNumber: string;
  dateOfBirth: string;
  gender: 'boy' | 'girl' | null;
  studentImage: string;
  birthCertificate: string;
  healthCard: string;
  stage: string;
  services: string[];
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    detailedAddress: '',
    idNumber: '',
    dateOfBirth: '',
    gender: null,
    studentImage: '',
    birthCertificate: '',
    healthCard: '',
    stage: '',
    services: [],
  });

  const steps = ['Guardian data', 'Children', 'Attachments', 'Choices'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderGuardianData = () => (
    <View className="p-4">
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="Enter Your full name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
      />
      <View className="mb-4 flex-row items-center rounded-lg border border-gray-300 p-3">
        <View className="mr-2 flex-row items-center">
          <Image
            source={require('../../assets/icon.png')}
            className="h-6 w-6"
            resizeMode="contain"
          />
          <Text className="ml-1">+971</Text>
        </View>
        <TextInput
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          keyboardType="phone-pad"
          className="flex-1"
        />
      </View>
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="Detailed address"
        value={formData.detailedAddress}
        onChangeText={(text) => setFormData({ ...formData, detailedAddress: text })}
        multiline
      />
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="ID Number"
        value={formData.idNumber}
        onChangeText={(text) => setFormData({ ...formData, idNumber: text })}
      />
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="Date of birth (mm/dd/year)"
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
      />
    </View>
  );

  const renderChildren = () => (
    <View className="p-4">
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="Enter Your full name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
      />
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="Date of birth (mm/dd/year)"
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
      />
      <View className="flex-row justify-around">
        <TouchableOpacity
          className={`flex-row items-center rounded-lg p-4 ${formData.gender === 'boy' ? 'bg-[#E8F5F1]' : 'bg-gray-100'}`}
          onPress={() => setFormData({ ...formData, gender: 'boy' })}>
          <Ionicons name="male" size={24} color={formData.gender === 'boy' ? '#52A587' : '#666'} />
          <Text className={`ml-2 ${formData.gender === 'boy' ? 'text-[#52A587]' : 'text-gray-600'}`}>
            Boy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-row items-center rounded-lg p-4 ${formData.gender === 'girl' ? 'bg-[#E8F5F1]' : 'bg-gray-100'}`}
          onPress={() => setFormData({ ...formData, gender: 'girl' })}>
          <Ionicons name="female" size={24} color={formData.gender === 'girl' ? '#52A587' : '#666'} />
          <Text className={`ml-2 ${formData.gender === 'girl' ? 'text-[#52A587]' : 'text-gray-600'}`}>
            Girl
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAttachments = () => (
    <View className="p-4">
      <View className="mb-4 rounded-lg border border-gray-300 p-4">
        <Text className="mb-2 font-semibold">Student Image</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="images" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="cloud-upload" size={24} color="#52A587" />
            <Text className="ml-2 text-[#52A587]">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mb-4 rounded-lg border border-gray-300 p-4">
        <Text className="mb-2 font-semibold">Birth Certificate</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="images" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="cloud-upload" size={24} color="#52A587" />
            <Text className="ml-2 text-[#52A587]">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mb-4 rounded-lg border border-gray-300 p-4">
        <Text className="mb-2 font-semibold">Health Card</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="images" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="cloud-upload" size={24} color="#52A587" />
            <Text className="ml-2 text-[#52A587]">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderChoices = () => (
    <View className="p-4">
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3"
        placeholder="Stage/year"
        value={formData.stage}
        onChangeText={(text) => setFormData({ ...formData, stage: text })}
      />
      <View className="mb-4 flex-row justify-between">
        <Text className="text-gray-600">0 administrative expenses</Text>
        <Text className="text-[#52A587]">1500 dirhams</Text>
      </View>
      <Text className="mb-4 font-semibold">Service we provided to you</Text>
      {[
        { name: 'Caring for children under two years', price: '1500 dirhams' },
        { name: 'School uniforms and supplies', price: '1500 dirhams' },
        { name: 'Pool subscription', price: '500 dirhams' },
        { name: 'Pool subscription', price: '500 dirhams' },
      ].map((service, index) => (
        <TouchableOpacity
          key={index}
          className="mb-2 flex-row items-center justify-between rounded-lg border border-gray-200 p-3"
          onPress={() => {
            const services = formData.services.includes(service.name)
              ? formData.services.filter((s) => s !== service.name)
              : [...formData.services, service.name];
            setFormData({ ...formData, services });
          }}>
          <View className="flex-row items-center">
            <View
              className={`h-6 w-6 items-center justify-center rounded-md border ${formData.services.includes(service.name) ? 'border-[#52A587] bg-[#52A587]' : 'border-gray-300'}`}>
              {formData.services.includes(service.name) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <Text className="ml-3">{service.name}</Text>
          </View>
          <Text className="text-[#52A587]">{service.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <PageHeader title="Book now" />
      <View className="flex-row border-b border-gray-200 px-4">
        {steps.map((step, index) => (
          <View
            key={step}
            className={`flex-1 border-b-2 px-4 py-2 ${currentStep === index ? 'border-[#52A587]' : 'border-transparent'}`}>
            <Text
              className={`text-center ${currentStep === index ? 'text-[#52A587]' : 'text-gray-400'}`}>
              {step}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView>
        {currentStep === 0 && renderGuardianData()}
        {currentStep === 1 && renderChildren()}
        {currentStep === 2 && renderAttachments()}
        {currentStep === 3 && renderChoices()}
      </ScrollView>
      <View className="flex-row border-t border-gray-200 p-4">
        {currentStep > 0 && (
          <TouchableOpacity
            className="mr-2 flex-1 rounded-lg bg-gray-100 py-3"
            onPress={handleBack}>
            <Text className="text-center font-semibold text-gray-600">Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="flex-1 rounded-lg bg-[#52A587] py-3"
          onPress={currentStep === steps.length - 1 ? () => {} : handleNext}>
          <Text className="text-center font-semibold text-white">
            {currentStep === steps.length - 1 ? 'By Now' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}