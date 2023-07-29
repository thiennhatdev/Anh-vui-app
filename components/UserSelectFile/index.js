import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import variables from '../../constants/variables';
import Avatar from '../Avatar';
import UploadImageModal from '../UploadImageModal';
import styles from './style';

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
          <Avatar photo={userInfo?.photo} />
          {/* <Ionicons name={"person-circle-outline"} size={30} /> */}
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
