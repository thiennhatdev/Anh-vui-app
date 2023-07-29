import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentBottomSheet from '../CommentBottomSheet';

import { useMutation } from 'react-query';
import { dislike, like } from '../../apis/likes';
import color from '../../commons/variable/color';
import variables from '../../constants/variables';
import { socket } from '../../hooks/socket';
import Avatar from '../Avatar';
import styles from './style';

let PostItem = (props) => {
    
    const { navigation, item } = props;
    const focus = useIsFocused(); 
    const { id, attributes: { description, createdAt, link, comments, likes, userId, path } } = item;
    const imageUrl = (link?.data && link.data[0].attributes.url) || path;

    const [userInfo, setUserInfo] = useState(false);
    const [likedUser, setLikedUser] = useState(false);
    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);

    const likeMutation = useMutation((data) => like(data), {
        onSuccess: async (data) => {
            setLikedUser(data.data);
            if (userId.data && userInfo.id !== userId.data?.id) {
                socket.emit('like', { 
                    content: `${userInfo.username} đã thích ảnh của bạn`, 
                    isRead: false, 
                    fromUserId: userInfo.id ,
                    toUserId: userId.data.id ,
                    imageId: id,
                    publishedAt: dayjs()
                })

            }
        },
    });
    const dislikeMutation = useMutation((id) => dislike(id), {
        onSuccess: async () => {
            setLikedUser(null);
        },
    });

    const desiredWidth = Dimensions.get('window').width;
    const [desiredHeight, setDesiredHeight] = useState(0)

    Image.getSize(imageUrl, (width, height) => {
        setDesiredHeight(desiredWidth / width * height)
    })
   
    
    
    const actionLike = async () => {
        if (!userInfo) {
            navigation.navigate(variables.User);
            return;
        }

        const body = {
            data: {
                imageId: id,
                userId: userInfo.id
            }
        }

        if (likedUser) {
            dislikeMutation.mutate(likedUser.id)
        } else {
            likeMutation.mutate(body);
        }
    }

    const fetchUserInfo = useCallback(async () => {
        const user = await AsyncStorage.getItem('user_info');
        const parseUser = JSON.parse(user);
        setLikedUser(_.find(likes.data, (item) => {
            return item.attributes.userId.data.id == parseUser?.id;
        }))
        setUserInfo(parseUser);
    }, [])

    useEffect( () => {
        fetchUserInfo();
    }, [fetchUserInfo, focus])

    useEffect( () => {
    }, [])

    return (
        < >
            <View style={styles.postWrapper}>
                <View style={styles.postAuthor}>
                    <Avatar photo={userId?.data?.attributes.photo} />
                    <View style={styles.postAuthorRight}>
                        <Text style={styles.name}>{userId?.data ? userId.data?.attributes.username : 'Anonymous'}</Text>
                        <Text style={styles.createdTime}>{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
                    </View>
                </View>
                <View style={styles.postTitle}>
                    <Text style={styles.postTitleText}>
                        {description}
                    </Text>
                </View>
                <View>
                    <Image
                        style={{
                            borderWidth: 1,
                            width: desiredWidth,
                            height: desiredHeight
                        }}
                        // style={styles.postImage}
                        source={{
                            uri: imageUrl
                        }}
                    />
                </View>
                <View style={styles.analytic}>
                    <View style={styles.analyticLike}>
                        <Icon name="smile-o" size={20} />
                        <Text style={styles.number}>{likes?.data?.length ? likes?.data?.length : null}</Text>
                    </View>
                    {
                        comments?.data?.length
                        ? <Text>
                            {comments?.data?.length} bình luận
                        </Text>
                        : null
                    }
                </View>
                <View style={styles.actionBar}>
                    <TouchableOpacity onPress={actionLike}>
                        <Text style={{ fontWeight: "700", color: likedUser ? `${color.blue}` : `${color.black}` }} >Haha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                                setVisibleBottomSheet(true)
                            }} >
                        <Text style={{ fontWeight: "700", color: color.black }} 
                        >Bình luận</Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "700" }} ></Text>
                    {/* <Icon name="share-alt" size={20} onPress={() => navigation.navigate('User')}/> */}
                </View>
            </View>

            {
                visibleBottomSheet &&
                <CommentBottomSheet
                    visibleBottomSheet={visibleBottomSheet}
                    onVisibleBottomSheet={() => {
                        setVisibleBottomSheet(!visibleBottomSheet)
                    }}
                    data={comments}
                    postId={id}
                    userId={userId}
                    numberLikes={likes?.data.length}
                    navigation={navigation}
                />
            }

        </>
    )
}

// PostItem = () => <NetworkLogger />;
export default PostItem;
