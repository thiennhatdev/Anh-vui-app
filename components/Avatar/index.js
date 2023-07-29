import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './style';

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