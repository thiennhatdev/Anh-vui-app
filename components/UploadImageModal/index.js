import { View, Text, Image, Modal, Pressable, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from "../../apis/upload";
import NetworkLogger from 'react-native-network-logger';
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_KEY } from "@env";

import styles from './style';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createImage } from '../../apis/image';

let UploadImageModal = ({ isShowModal, toggle }) => {
    const inputRef = useRef();
    const [userInfo, setUserInfo] = useState(false);
    const [imageSelected, setImageSelected] = useState({});

    const uploadImageMutation = useMutation((body) => uploadImage(body), {
        onSuccess: async (res) => {
            const { data } = res;

            const { url, bytes, original_filename, asset_id } = data || {};
            const cap = inputRef.current?.value || '';
            const body = {
                data: {
                    name: cap,
                    description: cap,
                    // size: `${bytes}`,
                    // extension: format,
                    publishedAt: null,
                    path: url,
                    userId: userInfo.id,
                    // link: {
                    //     data: [
                    //         {
                    //             id: asset_id,
                    //             attributes: {
                    //                 name: original_filename,
                    //                 url
                    //             }
                    //         }
                    //     ]
                    // }
                }
            }
            if (!url) return;

            createImageMutation.mutate(body);
        },
    });

    const createImageMutation = useMutation((body) => createImage(body), {
        onSuccess: async (data) => {
            toggle();
            setImageSelected({});
            Alert.alert('Tạo thành công', 'Đợi phê duyệt từ admin',
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                },
            );
        },
    });
     
    const docPicker = async () => {
        try {
            const data = await launchImageLibrary({
                type: "image/*"
            });
            setImageSelected(data.assets[0]);
        } catch (err) {
            console.log(err, 'errrrrrr')
        }
    }

    const onCreateImage = async () => {
        try {
            if (!imageSelected.uri) {
                Alert.alert('Lỗi', "Vui lòng chọn ảnh",
                    [
                        {
                            text: 'OK',
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: true,
                    },
                );
                return
            }
            let { fileName, type, uri } = imageSelected;
            let formData = new FormData()
            formData.append("file", {
                name: fileName,
                type,
                uri,
            })
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
            formData.append("api_key", CLOUDINARY_KEY);

            uploadImageMutation.mutate(formData);
            

        } catch (error) {
            Alert.alert('Lỗi', error?.message || "Đã xảy ra lỗi. Vui lòng thử lại",
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                },
            );
        }
    }

    const fetchUserInfo = useCallback(async () => {
        const user = await AsyncStorage.getItem('user_info');
        const parseUser = JSON.parse(user);
        setUserInfo(parseUser);
    }, [])

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo])


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowModal}
            onRequestClose={() => {
                setImageSelected({});
                toggle();
            }}
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
                        {
                            imageSelected.uri &&
                            <View style={styles.previewImageWrap}>
                                <Text style={styles.previewImageText}>Xem trước</Text>
                                <Image style={styles.previewImage} source={{ uri: imageSelected.uri }} />
                            </View>
                        }
                        <TextInput
                            ref={inputRef}
                            multiline={true}
                            numberOfLines={6}
                            style={styles.captionInput}
                            placeholder="Tiêu đề"
                            onChangeText={(e) => inputRef.current.value = e}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.footerModal}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setImageSelected({});
                                toggle();
                            }}>
                            <Text style={styles.textStyle}>Đóng</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonSubmit]}
                            onPress={onCreateImage}
                            disabled={
                                uploadImageMutation.status === 'loading' ||
                                createImageMutation.status === 'loading'
                            }
                        >
                            <Text style={styles.textStyle}>Tạo</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

// UploadImageModal = () => <NetworkLogger />;


export default UploadImageModal
