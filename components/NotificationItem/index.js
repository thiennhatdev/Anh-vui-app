import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';
import color from '../../commons/variable/color';
import Avatar from '../Avatar';

import styles from './style';

const NotificationItem = (props) => {
    const { item } = props;
    const { id, attributes: { createdAt, content, fromUserId, isRead } } = item || {};
    return (
        <View style={[styles.notificationItem, {backgroundColor: !isRead ? color.lightBlue : color.white}]}>
            <Avatar photo={fromUserId.data.attributes.photo} />
            <View style={styles.notificationItemRight}>
                <Text style={styles.notificationContent}>{content}</Text>
                <Text style={styles.notificationTime}>{dayjs(createdAt).format('HH:mm DD/MM/YYYY')}</Text>
            </View>
        </View>
    )
}

export default NotificationItem;
