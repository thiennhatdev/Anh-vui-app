import { View, Text, FlatList } from 'react-native'
import React from 'react'
import NotificationItem from '../../components/NotificationItem'

import styles from './style';

const DATA = [
  {
    id: 'bd7acgbea-c1b1-46c2-aed5-3ad53aohbb28ba',
    content: "Nội dung thong báo ttttttttttttttttttttttttttttttttttttttttttt"
  },
  {
    id: 'bd7achbea-c1b1-46c2-aed5-3ad53aohbb28ba',
    content: "Nội dung thong báo"
  },
  {
    id: 'bd7acbeja-c1b1-46c2-aed5-3ad53aohbb28ba',
    content: "Nội dung thong báo"
  },
]
const Notification = () => {
  return (
    <View style={styles.notificationWrap}>
      <FlatList
          data={DATA}
          renderItem={({item}) => <NotificationItem item={item} />}
          keyExtractor={item => item.id}
        />
      <Text style={styles.loadMore}>Tải thêm</Text>
    </View>
  )
}

export default Notification;
