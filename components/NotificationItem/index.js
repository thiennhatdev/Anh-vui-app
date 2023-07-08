import { View, Text, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style'

const NotificationItem = (props) => {
    const { } = props;

    return (
        <View style={styles.notificationItem}>
            <Icon name="user-circle" size={20}/>
            <View style={styles.notificationItemRight}>
                <Text>Nội dung thông báo tttttttttttttttttttttttttttttttttttttt sdfsdf sdf </Text>
                <Text style={styles.notificationTime}>05/07/2023</Text>
            </View>
        </View>
    )
}

export default NotificationItem;
