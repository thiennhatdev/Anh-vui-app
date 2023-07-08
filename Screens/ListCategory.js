import { View, Text } from 'react-native'
import React from 'react'

const ListCategory = ({ navigation }) => {

    const navigateDetailCategory = () => {
        navigation.navigate('DetailCategory', {
            title: 'máy ảnh',
            id: 1231
        })
    }

  return (
    <View>
      <Text onPress={navigateDetailCategory}>Click to navigate to detail category</Text>
    </View>
  )
}

export default ListCategory