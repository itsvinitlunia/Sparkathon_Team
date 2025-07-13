import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const stats = [
    { title: 'Total Items', value: '1,247', color: 'bg-blue-500' },
    { title: 'At Risk', value: '23', color: 'bg-orange-500' },
    { title: 'Expired', value: '5', color: 'bg-red-500' },
    { title: 'Saved', value: '89%', color: 'bg-green-500' }
  ];

  const alerts = [
    { product: 'Milk', days: '2 days', color: 'bg-orange-100 text-orange-800' },
    { product: 'Bread', days: '1 day', color: 'bg-red-100 text-red-800' },
    { product: 'Yogurt', days: '3 days', color: 'bg-yellow-100 text-yellow-800' }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-purple-600 px-6 py-8 pt-12">
        <Text className="text-white text-2xl font-bold">ShelfGuard</Text>
        <Text className="text-blue-100 mt-1">Smart Inventory Management</Text>
      </View>

      {/* Stats */}
      <View className="px-6 py-6">
        <View className="flex-row flex-wrap justify-between">
          {stats.map((stat, index) => (
            <View key={index} className={`${stat.color} rounded-xl p-4 w-[48%] mb-3`}>
              <Text className="text-white text-2xl font-bold">{stat.value}</Text>
              <Text className="text-white opacity-90 text-sm">{stat.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 pb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-white rounded-xl p-4 flex-1 mr-2 items-center shadow-sm">
            <Ionicons name="scan-outline" size={24} color="#3B82F6" />
            <Text className="text-gray-800 mt-2 font-medium">Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-xl p-4 flex-1 ml-2 items-center shadow-sm">
            <Ionicons name="add-outline" size={24} color="#10B981" />
            <Text className="text-gray-800 mt-2 font-medium">Add Item</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Alerts */}
      <View className="px-6 pb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Expiring Soon</Text>
        <View className="bg-white rounded-xl shadow-sm">
          {alerts.map((alert, index) => (
            <View key={index} className="p-4 flex-row justify-between items-center">
              <Text className="text-gray-800 font-medium">{alert.product}</Text>
              <View className={`${alert.color} px-3 py-1 rounded-full`}>
                <Text className="text-xs font-medium">{alert.days}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* AI Suggestion */}
      <View className="px-6 pb-8">
        <View className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="bulb-outline" size={20} color="white" />
            <Text className="text-white font-medium ml-2">AI Suggestion</Text>
          </View>
          <Text className="text-white text-sm">
            Move 15 milk units to Store B to reduce waste by 12%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;