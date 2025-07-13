import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = () => {
  const items = [
    { name: 'Organic Milk', qty: 24, days: 2, risk: 'high', color: 'bg-red-500' },
    { name: 'Fresh Bread', qty: 8, days: 1, risk: 'critical', color: 'bg-red-600' },
    { name: 'Strawberries', qty: 15, days: 4, risk: 'medium', color: 'bg-orange-500' },
    { name: 'Greek Yogurt', qty: 32, days: 8, risk: 'low', color: 'bg-green-500' },
    { name: 'Chicken Breast', qty: 12, days: 3, risk: 'high', color: 'bg-red-500' },
    { name: 'Frozen Berries', qty: 28, days: 180, risk: 'low', color: 'bg-green-500' }
  ];

  const categories = ['All', 'Dairy', 'Produce', 'Bakery', 'Meat', 'Frozen'];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Products</Text>
        <Text className="text-gray-600 mt-1">{items.length} items</Text>
        
        {/* Search */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mt-4">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Search products..."
          />
        </View>
      </View>

      {/* Categories */}
      <View className="px-6 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`mr-3 px-4 py-2 rounded-full ${
                  index === 0 ? 'bg-blue-500' : 'bg-white'
                }`}
              >
                <Text className={`font-medium ${
                  index === 0 ? 'text-white' : 'text-gray-700'
                }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Products List */}
      <ScrollView className="flex-1 px-6">
        {items.map((product, index) => (
          <View key={index} className="bg-white rounded-lg p-4 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{product.name}</Text>
                <Text className="text-gray-600 text-sm mt-1">Qty: {product.qty}</Text>
              </View>
              <View className="items-end">
                <View className={`${product.color} px-3 py-1 rounded-full`}>
                  <Text className="text-white text-xs font-medium">{product.risk.toUpperCase()}</Text>
                </View>
                <Text className="text-gray-600 text-sm mt-1">{product.days}d left</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default products;