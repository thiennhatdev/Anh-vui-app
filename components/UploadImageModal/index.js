import { View, Text, Image, Modal, Pressable, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';

const UploadImageModal = ({ isShowModal, toggle }) => {
    
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowModal}
            onRequestClose={toggle}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headerModal}>Đăng ảnh</Text>
                    <View style={styles.bodyModal}>
                        <View style={styles.selectImage}>
                            <TouchableOpacity
                                onPress={docPicker}
                                style={styles.selectImageInner}
                            >
                                <Icon name={"file-image-o"} size={20} />
                                <Text style={styles.selectImageText}>Chọn ảnh</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput 
                            multiline
                            numberOfLines={5}
                            style={styles.captionInput}
                            placeholder="Caption"
                            // onChangeText={text => onChangeText(text)}
                        />
                    </View>
                    <View style={styles.footerModal}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={toggle}>
                            <Text style={styles.textStyle}>Đóng</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonSubmit]}
                            onPress={toggle}>
                            <Text style={styles.textStyle}>Tạo</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default UploadImageModal
