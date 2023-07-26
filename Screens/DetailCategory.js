import { View, Text } from 'react-native'
import React from 'react'

const DetailCategory = ({ route }) => {
  return (
    <View>
      <Text>This is category detail page: {route?.params?.title}</Text>
    </View>
  )
}

export default DetailCategory