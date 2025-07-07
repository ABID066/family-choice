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