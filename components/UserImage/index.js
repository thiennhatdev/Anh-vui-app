import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../../commons/variable/color';
import UserSelectFile from '../UserSelectFile';
import PostItem from '../PostItem';
import ProfileLayout from '../../layouts/ProfileLayout/index.js';

import styles from './style';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53aohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },
  {
    id: 'bd7acdbea-c1b1-46c2-ased5-3ad53aohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },
  {
    id: 'bd7dacbea-c1b1-46c2-aed5-3ad53aohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },
  {
    id: 'bd7dacbea-c1b1-46c2-aed5-3ad53agohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },

];

const UserImage = (props) => {
  const { children, navigation } = props;

  return (
    <ProfileLayout navigation={navigation}>
      <View style={styles.contentUserImage}>
        <UserSelectFile />
        <View style={styles.imagesOfUser}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <PostItem item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ProfileLayout>
  )
}

export default UserImage;