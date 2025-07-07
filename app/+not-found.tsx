import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-red-500 mb-4">
          This screen doesn't exist.
        </Text>
        <Link href="/" className="text-blue-500 underline">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}