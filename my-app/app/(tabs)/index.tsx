import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16">
      <View className="items-center mb-8">
        <Text className="text-5xl font-extrabold text-blue-800 mb-2">🛒 ShelfGuard</Text>
        <Text className="text-center text-lg text-gray-700 font-medium">
          Smart Inventory Waste Prevention for Store Managers
        </Text>
      </View>

      <View className="mb-10">
        <Text className="text-base text-gray-600 mb-4 leading-6">
          ShelfGuard is your AI-powered assistant for smarter inventory handling.
          It helps store managers track perishable products, predict spoilage risk, and
          suggest actions like redistribution, discounts, or donation.
        </Text>
        <Text className="text-base text-gray-600 leading-6">
          Our goal is to reduce food waste, optimize logistics, and promote sustainability
          across retail chains. Built with predictive intelligence, ShelfGuard recommends
          optimal delivery routes based on expiration timelines and demand across nearby locations.
        </Text>
      </View>

      <View className="space-y-4 mb-10">
        <Pressable
          className="bg-red-600 px-6 py-4 rounded-xl shadow w-full"
          onPress={() => router.push('/products/mandar')}
        >
          <Text className="text-white text-center text-base font-semibold">📦 View Products</Text>
        </Pressable>

        <Pressable
          className="bg-green-600 px-6 py-4 rounded-xl shadow w-full"
          onPress={() => router.push('/profile')}
        >
          <Text className="text-white text-center text-base font-semibold">📊 View Analytics</Text>
        </Pressable>
      </View>

      <View className="flex-row justify-between">
        <Link
          href="/login"
          className="bg-gray-100 px-6 py-3 rounded-lg border border-gray-300 shadow"
        >
          <Text className="text-gray-800 text-base font-medium text-center">Login</Text>
        </Link>

        <Link
          href="/signup"
          className="bg-blue-700 px-6 py-3 rounded-lg shadow"
        >
          <Text className="text-white text-base font-medium text-center">Sign Up</Text>
        </Link>
      </View>

      <View className="mt-12">
        <Text className="text-center text-sm text-gray-400">© 2025 ShelfGuard Team</Text>
      </View>
    </ScrollView>
  );
}
