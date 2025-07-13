import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const profile = () => {
  const stats = [
    { title: 'Waste Reduced', value: '89%', color: 'bg-green-500' },
    { title: 'Products Saved', value: '2,847', color: 'bg-blue-500' },
    { title: 'CO2 Saved', value: '1.2 tons', color: 'bg-purple-500' }
  ];

  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile', color: 'text-blue-600' },
    { icon: 'business-outline', title: 'Store Settings', color: 'text-green-600' },
    { icon: 'analytics-outline', title: 'Reports', color: 'text-purple-600' },
    { icon: 'notifications-outline', title: 'Notifications', color: 'text-orange-600' },
    { icon: 'help-circle-outline', title: 'Help Center', color: 'text-indigo-600' },
    { icon: 'star-outline', title: 'Rate App', color: 'text-yellow-600' }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-indigo-600 px-6 py-8 pt-12">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
            <Text className="text-indigo-600 text-xl font-bold">SC</Text>
          </View>
          <View className="ml-4">
            <Text className="text-white text-xl font-bold">Rohit Sharma</Text>
            <Text className="text-indigo-100">Store Manager</Text>
            <Text className="text-indigo-200 text-sm">Walmart Pune</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View className="px-6 py-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Your Impact</Text>
        <View className="flex-row justify-between">
          {stats.map((stat, index) => (
            <View key={index} className={`${stat.color} rounded-xl p-4 flex-1 mx-1`}>
              <Text className="text-white text-xl font-bold">{stat.value}</Text>
              <Text className="text-white opacity-90 text-sm">{stat.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View className="px-6 pb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Achievements</Text>
        <View className="bg-white rounded-xl shadow-sm p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-yellow-500 rounded-full items-center justify-center">
                <Ionicons name="trophy-outline" size={20} color="white" />
              </View>
              <View className="ml-3">
                <Text className="font-semibold text-gray-800">Waste Warrior</Text>
                <Text className="text-gray-600 text-sm">Reduced waste by 50%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="px-6 pb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Settings</Text>
        <View className="bg-white rounded-xl shadow-sm">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`p-4 flex-row items-center ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <Ionicons name={item.icon} size={20} color="#6B7280" />
              <Text className="text-gray-800 ml-3 font-medium flex-1">{item.title}</Text>
              <Ionicons name="chevron-forward-outline" size={16} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sign Out */}
      <View className="px-6 pb-8">
        <TouchableOpacity className="bg-red-500 rounded-xl p-4 flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white font-medium ml-2">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default profile;