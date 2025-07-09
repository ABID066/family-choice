
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
  id: string;
  userId?: string;
  userName: string;
  userImage: string;
  message: string;
  timestamp: Date;
};

export default function NotificationPage() {
  const notifications: Notification[] = [
    {
      id: '1',
      userId: 'User#0123',
      userName: 'User 0123',
      userImage: require('@/assets/icon.png'),
      message: 'partial payment succeeded',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    {
      id: '2',
      userId: 'User 01234',
      userName: 'User 01234',
      userImage: require('@/assets/icon.png'),
      message: 'partial payment succeeded',
      timestamp: new Date('2024-02-02'),
    },
  ];

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: false });
    } else {
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      });
    }
  };

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center">
      <Ionicons name="chatbox-outline" size={96} color="#868686" />
      <Text className="mt-4 text-[#52A587]">Empty notification</Text>
    </View>
  );

  const NotificationItem = ({ item }: { item: Notification }) => (
    <View className="flex-row items-center border-b border-gray-100 p-4">
      <Image
        source={typeof item.userImage === 'string' ? { uri: item.userImage } : item.userImage}
        className="h-12 w-12 rounded-full"
        resizeMode="cover"
      />
      <View className="ml-3 flex-1">
        <Text className="font-medium text-sm text-[#000000]">{item.userName}</Text>
        <Text className="text-[#000000] text-xs">{item.message}</Text>
      </View>
      <Text className="text-gray-400">{formatTimestamp(item.timestamp)}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white pt-6">
      <PageHeader title="Notification" />
      {notifications.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
}