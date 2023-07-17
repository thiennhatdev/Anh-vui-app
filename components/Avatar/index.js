import { Keyboard, View, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';

import styles from './style'

const Avatar = (props) => {
    const { photo } = props;
    return (
        <View style={styles.wrapAvatar}>
            {
                photo
                    ? <Image source={{ uri: photo }} style={styles.imageAvatar}/>
                    : <Text style={styles.textAvatar}>AD</Text>
            }
        </View>
    )
}

export default Avatar