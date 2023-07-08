import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker'
import PostItem from '../../components/PostItem';

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
      <View style={styles.topHome}>
        <View style={styles.avatar}>
          <Ionicons name={"person-circle-outline"} size={30} />
        </View>
        <View style={styles.selectImage}>
          <TouchableOpacity
            onPress={docPicker}
            style={styles.selectImageInner}
          >
            <Ionicons name={"folder-outline"} size={20} />
            <Text style={styles.selectImageText}>Đăng ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>
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