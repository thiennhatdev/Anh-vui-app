import { Keyboard, View, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';

import styles from './style'

const Avatar = (props) => {
    const isAvatar = false;
    // const isAvatar = "https://znews-photo.zingcdn.me/w480/Uploaded/hointt/2023_02_22/44_zing_1_1.jpg";

    return (
        <View style={styles.wrapAvatar}>
            {
                isAvatar
                    ? <Image source={{ uri: isAvatar }} style={styles.imageAvatar}/>
                    : <Text style={styles.textAvatar}>AD</Text>
            }
        </View>
    )
}

export default Avatar