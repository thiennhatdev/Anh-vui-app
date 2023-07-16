import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import UploadImageModal from '../UploadImageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import variables from '../../constants/variables';
import { useIsFocused } from '@react-navigation/native';

const UserSelectFile = (props) => {
  const { navigation } = props;
  const focus = useIsFocused(); 

  const [isShowModal, setIsShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const showModalUpload = () => {
    if (!userInfo) {
      navigation.navigate(variables.User);
      return
    }
    
    setIsShowModal(true)
  }

  const fetchUserInfo = useCallback(async () => {
    const user = await AsyncStorage.getItem('user_info');
    const parseUser = JSON.parse(user);
    setUserInfo(parseUser);
  }, [])

  useEffect(() => {
      fetchUserInfo();
  }, [fetchUserInfo, focus])

  return (
    <>
    <View style={styles.wrapSelectFile}>
        <View style={styles.avatar}>
          <Ionicons name={"person-circle-outline"} size={30} />
        </View>
        <View style={styles.selectImage}>
          <TouchableOpacity
            // onPress={docPicker}
            onPress={showModalUpload}
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
