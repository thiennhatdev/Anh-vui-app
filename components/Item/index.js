import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import styles from './style'

const Item = () => {
console.log('hello')
    const onDelete = () => Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])

  return (
    <TouchableOpacity onPress={() => onDelete()}>
        <Text style={styles.text}>bottom component</Text>          
    </TouchableOpacity>
  )
}

export default Item