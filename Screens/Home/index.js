import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker'
import PostItem from '../../components/PostItem';

import styles from './style';
import UserSelectFile from '../../components/UserSelectFile';

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

const Home = (props) => {
  const { navigation } = props;

  const docPicker = async () => {
    try {
      let result = await DocumentPicker.pick({
        allowMultiSelection: true
      });
      console.log(result, ' result');
      // console.log(result);
    } catch (err) {
      console.log(err)
      // if (DocumentPicker.isCancel(err)) {
      //   console.log("error -----", err);
      // } else {
      //   throw err;
      // }
    }
  }

  return (
    <View style={styles.wrapper}>
      {/* <ScrollView>  */}
      <UserSelectFile />
      <View style={styles.contentHome}>
        <FlatList
          data={DATA}
          renderItem={({item}) => <PostItem item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

export default Home