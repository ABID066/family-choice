/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Linking,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common';

const { width } = Dimensions.get('window');

const images = [
  require('../../assets/nursery.png'),
  require('../../assets/nursery.png'),
  require('../../assets/nursery.png'),
];

export default function NurseryDetailsPage() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('information');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [initialRating, setInitialRating] = useState(0);
  const [rating, setRating] = useState({
    overall: 0,
    cleanliness: 0,
    education: 0,
  });
  const [review, setReview] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange('next');
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (showRating) {
      setRating({
        overall: initialRating,
        cleanliness: initialRating,
        education: initialRating,
      });
    }
  }, [showRating, initialRating]);

  const handleSlideChange = (direction: string) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({
      x: newIndex * width,
      animated: true,
    });
  };

  const renderInformation = () => (
    <View className="p-4">
      <Text className="mb-2 text-lg font-semibold">About School</Text>
      <Text className="mb-4 text-gray-600">
        Oman Al hayat school in one of the old international school in the country of Riyadh and has
        a group of experienced and competent pepole, inculding aministrators teachers,supervisors
        and supervisors.
      </Text>
      <Text className="mb-2 text-lg font-semibold">Our Approach</Text>
      <Text className="text-gray-600">
        Combining an inquistive teaching approach and future-focused skillset delivery, we work
        hand-in-hand with the community to nurture students to become independent and empathetic
        learners.
      </Text>
    </View>
  );

  const renderCourses = () => (
    <View className="p-4">
      <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
        <Text className="mb-2 text-lg font-semibold">Kindergarten Program</Text>
        <Text className="text-gray-600">Ages 3-5 years</Text>
        <Text className="mt-2 text-gray-600">
          Our kindergarten program focuses on early childhood development through play-based
          learning.
        </Text>
      </View>
      <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
        <Text className="mb-2 text-lg font-semibold">Preschool Program</Text>
        <Text className="text-gray-600">Ages 2-3 years</Text>
        <Text className="mt-2 text-gray-600">
          A nurturing environment for toddlers to develop social and cognitive skills.
        </Text>
      </View>
    </View>
  );

  const renderReview = () => (
    <View className="flex-1 p-4">
      <View className="flex-1 rounded-lg bg-white">
        {!showRating ? (
          <View>
            <View style={{ boxShadow: '2px 2px 4px 0px rgba(82, 165, 135, 0.15)' }} className='px-8 py-4 rounded-md' >
              <Text className="mb-2 text-gray-600">Click on the stars of this service</Text>
              <View className="mb-4 flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setInitialRating(star)}>
                    <Ionicons
                      name={star <= initialRating ? 'star' : 'star-outline'}
                      size={24}
                      color="#4CAF50"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            <TouchableOpacity
              className="rounded-lg bg-[#52A587] py-3"
              onPress={() => setShowRating(true)}>
              <Text className="text-center font-semibold text-white">Record your rating</Text>
            </TouchableOpacity>
            </View>

            <View className="mt-6">
              <View  style={{boxShadow: '2px 2px 4px 0px rgba(82, 165, 135, 0.15)'}}  className='px-3 pb-2 pt-3rounded-md' >
                <Text className="mb-4 text-lg font-semibold">Review&apos;s</Text>
              <View className="mb-4 flex-row items-center">
                <Image
                  source={require('../../assets/icon.png')}
                  className="h-10 w-10 rounded-full"
                />
                <View className="ml-3">
                  <Text className="font-semibold">Sanjida</Text>
                  <View className="flex-row items-center">
                    <Text className="font-semibold text-[#52A587]">4.9/5</Text>
                    <Text className="ml-4 text-gray-400">JUNE 03-2023</Text>
                  </View>
                </View>
              </View>
              <Text className="text-gray-600">
                This summary provides key points from our privacy notice, but you can find out more
                details about any of these topics by clicking the link following each key point or
                by using our table of contents below to find the section you are looking for.
              </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{boxShadow: '2px 2px 4px 0px rgba(82, 165, 135, 0.15)'}} className="min-h-[45vh] flex-1 p-4 rounded-md">
            <ScrollView>
              <Text className="mb-4 text-lg font-semibold">Record your rating</Text>
              {['overall', 'cleanliness', 'education'].map((type) => (
                <View key={type} className="mb-4">
                  <Text className="mb-2 capitalize text-gray-600">
                    {type === 'overall' ? 'Follow up with the Guardian' : type}
                  </Text>
                  <View className="flex-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => setRating({ ...rating, [type]: star })}>
                        <Ionicons
                          name={
                            star <=
                            (type === 'overall'
                              ? rating.overall
                              : type === 'cleanliness'
                                ? rating.cleanliness
                                : rating.education)
                              ? 'star'
                              : 'star-outline'
                          }
                          size={24}
                          color="#52A587"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
              <TextInput
                className="mt-2 rounded-lg border border-gray-300 p-2"
                placeholder="Write your review..."
                multiline
                value={review}
                onChangeText={setReview}
              />
            </ScrollView>
            <TouchableOpacity
              className="mt-4 rounded-lg bg-[#52A587] py-3"
              onPress={() => {
                // Handle submit rating
                setShowRating(false);
                setInitialRating(0);
              }}>
              <Text className="text-center font-semibold text-white">Send Rate</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        <PageHeader title="Nursery" />

        {/* Image Slider */}
        <View className="relative">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(newIndex);
            }}>
            {images.map((image, index) => (
              <Image key={index} source={image} className="h-64 w-screen" resizeMode="cover" />
            ))}
          </ScrollView>

          {/* Navigation Arrows */}
          <TouchableOpacity
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2"
            onPress={() => handleSlideChange('prev')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2"
            onPress={() => handleSlideChange('next')}>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* School Info */}
        <View className="p-4">
          <Text className="text-2xl font-bold">Rowad al khaleej international school</Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="location" size={16} color="#666" />
            <Text className="ml-1 text-gray-600">UAE, Dubai</Text>
          </View>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="ml-1 text-gray-600">4.8/5</Text>
            <Text className="ml-4 text-gray-400">10 seats remaining</Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-200 px-4">
          {['information', 'courses offered', 'review'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-[#52A587]' : ''}`}>
              <Text
                className={`${activeTab === tab ? 'font-semibold text-[#52A587]' : 'text-gray-600'} capitalize`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'information' && renderInformation()}
        {activeTab === 'courses offered' && renderCourses()}
        {activeTab === 'review' && renderReview()}
      </ScrollView>
      {!showRating && (
        <>
          {/* Fixed Bottom Buttons */}
          <View className="flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
            <TouchableOpacity onPress={() => router.push("/nursery/book")} className="mx-1 flex-1 rounded-lg bg-[#52A587] py-3">
              <Text className="text-center font-semibold text-white">Book now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-1 h-12 w-12 items-center justify-center rounded-full bg-blue-500"
              onPress={() => Linking.openURL('tel:+1234567890')}>
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-1 h-12 w-12 items-center justify-center rounded-full bg-green-500"
              onPress={() => Linking.openURL('whatsapp://send?phone=1234567890')}>
              <Ionicons name="logo-whatsapp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
