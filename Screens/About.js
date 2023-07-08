import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const About = () => {
  return (
    <View>
      <Text>About</Text>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://znews-photo.zingcdn.me/w480/Uploaded/hointt/2023_02_22/44_zing_1_1.jpg',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default About