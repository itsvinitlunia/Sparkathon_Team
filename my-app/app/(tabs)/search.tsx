import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recentSearches = ['milk', 'expired items', 'dairy', 'high risk', 'bread'];

  const quickFilters = [
    { title: 'Expiring Soon', color: 'bg-orange-500' },
    { title: 'High Risk', color: 'bg-red-500' },
    { title: 'Low Stock', color: 'bg-blue-500' },
    { title: 'New Items', color: 'bg-green-500' }
  ];

  const searchResults = [
    { name: 'Organic Milk', type: 'Product', risk: 'high', color: 'bg-red-100 text-red-800' },
    { name: 'Dairy Section', type: 'Location', risk: 'medium', color: 'bg-orange-100 text-orange-800' },
    { name: 'Fresh Farms Co.', type: 'Supplier', risk: 'low', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Search</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-3 mt-4">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Search anything..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm && (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Ionicons name="close-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {!searchTerm ? (
          <>
            {/* Recent Searches */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Recent</Text>
              <View className="bg-white rounded-lg shadow-sm">
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-4 flex-row items-center"
                    onPress={() => setSearchTerm(search)}
                  >
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-800 ml-3">{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Filters */}
            <View>
              <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Filters</Text>
              <View className="flex-row flex-wrap">
                {quickFilters.map((filter, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`${filter.color} rounded-lg px-4 py-2 mr-2 mb-2`}
                    onPress={() => setSearchTerm(filter.title.toLowerCase())}
                  >
                    <Text className="text-white font-medium">{filter.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Search Results */
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Results for "{searchTerm}"
            </Text>
            
            {searchResults.map((result, index) => (
              <View key={index} className="bg-white rounded-lg p-4 mb-3 shadow-sm">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">{result.name}</Text>
                    <Text className="text-gray-600 text-sm mt-1">{result.type}</Text>
                  </View>
                  <View className={`${result.color} px-3 py-1 rounded-full`}>
                    <Text className="text-xs font-medium">{result.risk.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default search;