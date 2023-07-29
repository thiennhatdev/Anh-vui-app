import React from 'react'
import { Image, View } from 'react-native'
import styles from './style'

const TopLogo = () => {
  return (
    <View style={styles.wrapLogo}>
      <Image style={ styles.logo } source={require('../../assets/images/logo-anhhaihuoc.png')} />
    </View>
  )
}

export default TopLogo