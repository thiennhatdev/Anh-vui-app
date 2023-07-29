import React from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import styles from './style'

const Item = () => {
    const onDelete = () => Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ])

  return (
    <TouchableOpacity onPress={() => onDelete()}>
        <Text style={styles.text}>bottom component</Text>          
    </TouchableOpacity>
  )
}

export default Item