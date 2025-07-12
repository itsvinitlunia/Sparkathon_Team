import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Products = () => {

    const {id}= useLocalSearchParams();

    return (
        <View>
            <Text>Products of : {id}</Text>
        </View>
    )
}

export default Products
