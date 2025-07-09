import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/common';

type FormData = {
  fullNameOfGuardian: string;
  phoneNumberOfGuardian: string;
  detailedAddressOfGuardian: string;
  idNumberOfGuardian: string;
  dateOfBirthOfGuardian: string;
  fullNameOfStudent: string;
  dateOfBirthOfStudent: string;
  genderOfStudent: 'boy' | 'girl' | null;
  studentImage: string;
  birthCertificate: string;
  healthCard: string;
  stage: string;
  services: string[];
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullNameOfGuardian: '',
    phoneNumberOfGuardian: '',
    detailedAddressOfGuardian: '',
    idNumberOfGuardian: '',
    dateOfBirthOfGuardian: '',
    fullNameOfStudent: '',
    dateOfBirthOfStudent: '',
    genderOfStudent: null,
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

  const renderHeader = () => (
    <View className="bg-white px-4">
      <View className="mb-4 items-center justify-center">
        <Text className="text-sm font-medium text-[#000000]">
          Rowad al khaleej international school
        </Text>
        <View className="mt-1 flex-row items-center gap-4">
          <View className="flex-row gap-1">
            <Ionicons name="location" size={14} color="#666" />
            <Text className="text-[10px] font-medium text-[#868686]">UAE, Dubai</Text>
          </View>
          <Text className="text-[10px] font-medium text-[#868686]">10 seats remaining</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="ml-1 text-[10px] font-semibold text-[#000000]">4.8/5</Text>
          </View>
        </View>
      </View>
      <View className="my-4">
        <Image
          source={require('../../assets/nursery.png')}
          className="h-48 w-full rounded-lg"
          resizeMode="cover"
        />
      </View>
    </View>
  );

  const renderGuardianData = () => (
    <View className="p-4">
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Full Name</Text>
        <TextInput
          className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
          placeholder="Enter Your full name"
          value={formData.fullNameOfGuardian}
          onChangeText={(text) => setFormData({ ...formData, fullNameOfGuardian: text })}
        />
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Phone number</Text>
        <View className="mb-4 flex-row items-center rounded-[92px] bg-white shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]">
          <View className="mr-2 flex-row items-center p-4">
            <Image
              source={require('../../assets/icon.png')}
              className="h-6 w-6"
              resizeMode="contain"
            />
            <Text className="ml-1">+971</Text>
          </View>
          <TextInput
            placeholder="Phone number"
            value={formData.phoneNumberOfGuardian}
            onChangeText={(text) => setFormData({ ...formData, phoneNumberOfGuardian: text })}
            keyboardType="phone-pad"
            className="flex-1"
          />
        </View>
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Detailed address</Text>
        <TextInput
          className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
          placeholder="Detailed address"
          value={formData.detailedAddressOfGuardian}
          onChangeText={(text) => setFormData({ ...formData, detailedAddressOfGuardian: text })}
          multiline
        />
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">ID Number</Text>
        <TextInput
          className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
          placeholder="ID Number"
          value={formData.idNumberOfGuardian}
          onChangeText={(text) => setFormData({ ...formData, idNumberOfGuardian: text })}
        />
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">ID Number</Text>
        <TextInput
          className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
          placeholder="ID Number"
          value={formData.dateOfBirthOfGuardian}
          onChangeText={(text) => setFormData({ ...formData, dateOfBirthOfGuardian: text })}
        />
      </View>
    </View>
  );

  const renderChildren = () => (
    <View className="p-4">
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Full Name</Text>
        <TextInput
          className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
          placeholder="Enter Your full name"
          value={formData.fullNameOfStudent}
          onChangeText={(text) => setFormData({ ...formData, fullNameOfStudent: text })}
        />
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Date of birth</Text>
        <TextInput
          className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
          placeholder="(mm/day/year)"
          value={formData.dateOfBirthOfStudent}
          onChangeText={(text) => setFormData({ ...formData, dateOfBirthOfStudent: text })}
        />
      </View>
      <View className="flex-row gap-4">
        <TouchableOpacity
          className="flex-1 flex-row items-center gap-3 rounded-lg bg-[rgba(82,165,135,0.1)] p-4 shadow-[4px_4px_0px_0px_rgba(82,165,135,0.8)] "
          onPress={() => setFormData({ ...formData, genderOfStudent: 'boy' })}>
          <View
            className={`h-6 w-6 items-center justify-center rounded-md border ${
              formData.genderOfStudent === 'boy'
                ? 'border-[#52A587] bg-[#52A587]'
                : 'border-gray-300'
            }`}>
            {formData.genderOfStudent === 'boy' && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons
              name="male"
              size={24}
              color={formData.genderOfStudent === 'boy' ? '#52A587' : '#666'}
            />
            <Text className={`text-[#000000]`}>Boy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center gap-3 rounded-lg bg-[rgba(82,165,135,0.1)] p-4  shadow-[4px_4px_0px_0px_rgba(82,165,135,0.8)] "
          onPress={() => setFormData({ ...formData, genderOfStudent: 'girl' })}>
          <View
            className={`h-6 w-6 items-center justify-center rounded-md border ${
              formData.genderOfStudent === 'girl'
                ? 'border-[#52A587] bg-[#52A587]'
                : 'border-gray-300'
            }`}>
            {formData.genderOfStudent === 'girl' && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons
              name="female"
              size={24}
              color={formData.genderOfStudent === 'girl' ? '#52A587' : '#666'}
            />
            <Text className={`text-[#000000]`}>Girl</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAttachments = () => (
    <View className="p-4">
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Student Image</Text>
        <View className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]">
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="images" size={24} color="#666" />
              <Text className="ml-2 text-gray-600">Gallery</Text>
            </TouchableOpacity>
            <View style={{ width: 2, height: 20, backgroundColor: '#52A587' }} />
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="cloud-upload" size={24} color="#52A587" />
              <Text className="ml-2 text-[#52A587]">Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Birth Certificate</Text>
        <View className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]">
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="images" size={24} color="#666" />
              <Text className="ml-2 text-gray-600">Gallery</Text>
            </TouchableOpacity>
            <View style={{ width: 2, height: 20, backgroundColor: '#52A587' }} />
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="cloud-upload" size={24} color="#52A587" />
              <Text className="ml-2 text-[#52A587]">Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="gap-1">
        <Text className="text-xs font-medium text-[#000000]">Health Card</Text>
        <View className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]">
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="images" size={24} color="#666" />
              <Text className="ml-2 text-gray-600">Gallery</Text>
            </TouchableOpacity>
            <View style={{ width: 2, height: 20, backgroundColor: '#52A587' }} />
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="cloud-upload" size={24} color="#52A587" />
              <Text className="ml-2 text-[#52A587]">Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderChoices = () => (
    <View className="p-4">
      <View className='gap-1'>
      <Text className="text-xs font-medium text-[#000000]">Stage/year</Text>
      <TextInput
        className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)]"
        placeholder="First Primary"
        value={formData.stage}
        onChangeText={(text) => setFormData({ ...formData, stage: text })}
      />
      </View>
      <View className="mb-4 rounded-[92px] bg-white p-4 shadow-[3px_2px_5px_0px_rgba(82,165,135,0.8)] flex-row justify-between">
        <Text className="text-gray-600">0 administrative expenses</Text>
        <Text className="text-[#52A587]">1500 dirhams</Text>
      </View>
      <Text className="mb-4 text-xs text-[#000000]">Service we provided to you</Text>
      <View  className="mb-4 rounded-md bg-white p-4 shadow-[2px_2px_4px_0px_rgba(82,165,135,0.8)]">

      {[
        { name: 'Caring for children under two years', price: '1500 dirhams' },
        { name: 'School uniforms and supplies', price: '1500 dirhams' },
        { name: 'Pool subscription', price: '500 dirhams' },
        { name: 'Pool subscription', price: '500 dirhams' },
      ].map((service, index) => (
        <TouchableOpacity
          key={index}
          className="mb-2 flex-row items-center justify-between rounded-lg p-3"
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
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="pt-4">
        <PageHeader title="Book Now" />
      </View>
      {renderHeader()}
      <Text className="p-4 text-sm font-medium text-[#000000]">Book Process</Text>
      <View className="border-bn flex-row justify-between gap-2 border-gray-200 px-4">
        {steps.map((step, index) => (
          <View
            key={step}
            className={`flex-1 py-1 ${currentStep === index ? 'border-b border-[#52A587]' : 'border-transparent'}`}>
            <Text
              numberOfLines={1}
              className={`text-center text-xs ${currentStep === index ? 'font-medium text-[#52A587]' : 'font-normal text-[#868686]'}`}>
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
