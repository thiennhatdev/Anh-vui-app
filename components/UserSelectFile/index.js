import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import UploadImageModal from '../UploadImageModal';

const UserSelectFile = (props) => {
  const { navigation } = props;

  const [isShowModal, setIsShowModal] = useState(false);

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
    <>
    <View style={styles.wrapSelectFile}>
        <View style={styles.avatar}>
          <Ionicons name={"person-circle-outline"} size={30} />
        </View>
        <View style={styles.selectImage}>
          <TouchableOpacity
            // onPress={docPicker}
            onPress={() => setIsShowModal(true)}
            style={styles.selectImageInner}
          >
            <Icon name={"file-image-o"} size={20} />
            <Text style={styles.selectImageText}>Đăng ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <UploadImageModal 
        isShowModal={isShowModal} 
        toggle={() => setIsShowModal(false)}    
    />
      </>
  )
}

export default UserSelectFile
