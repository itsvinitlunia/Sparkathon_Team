import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: () => <Text className='text-2xl'>🏠</Text>
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: () => <Text className='text-2xl'>🔍</Text>
                }}
            />
            <Tabs.Screen
                name='products'
                options={{
                    title: "Products",
                    headerShown: false,
                    tabBarIcon: () => <Text className='text-2xl'>🧺</Text>
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: () => <Text className='text-2xl'>👤</Text>
                }}
            />
        </Tabs>
    )
}

export default _layout
