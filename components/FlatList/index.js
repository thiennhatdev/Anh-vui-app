import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from './style';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53aohbb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29dg72',
      title: 'Third Item',
    },
    {
        id: 'bd7afcbea-c1b1-46c2-aegd5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68fafc-c605g-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694af0f-3da1-471f-bdg96-145571te29d72',
        title: 'Third Item',
      },
      {
        id: 'bd7acbeea-c1b1-46c2-gaede5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68aefc-c605-4t8d3-a4f8g-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694ae0f-3da1-4o71f-bdg96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: 'bd7acbeea-c1b1-46c2-aedg5-3ad5t3abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afyc-c60f5-48d3-a4f8-fbd9p1aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694ayf0f-3da1-471f-bod96-145571e29d72',
        title: 'Third Item',
      },
  ];

const FlatListComponent = () => {
  return (
    <FlatList
        data={DATA}
        renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
        keyExtractor={item => item.id}
      />
  )
}

export default FlatListComponent;