import { ImageSourcePropType } from 'react-native';

export interface ServiceItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  seatsRemaining: number;
  image: ImageSourcePropType;
  type: 'nursery' | 'school';
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
}

// Mock data for services
export const services: ServiceItem[] = [
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

export const bannerImages: BannerItem[] = [
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
  },
  {
    id: '5',
    title: 'Quality Education',
    subtitle: 'Excellence in learning'
  }
];