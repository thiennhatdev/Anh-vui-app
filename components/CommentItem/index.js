import { View, Text, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style'
import dayjs from 'dayjs';
import _ from 'lodash';
import Avatar from '../Avatar';
import { useMutation } from 'react-query';
import { dislike, like } from '../../apis/likes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import variables from '../../constants/variables';
import color from '../../commons/variable/color';

const CommentItem = (props) => {
    const { navigation, item, showInputReply } = props;
    const { id, attributes } = item;
    const { content, createdAt, likes } = attributes || {};

    const [userInfo, setUserInfo] = useState(false);
    const [likedUser, setLikedUser] = useState(false);


    const likeMutation = useMutation((data) => like(data), {
        onSuccess: async (data) => {
            setLikedUser(data.data)
        },
    });
    const dislikeMutation = useMutation((id) => dislike(id), {
        onSuccess: async () => {
            setLikedUser(null);
        },
        onError: (err) => {
        }
    });

    const actionLike = async () => {
        if (!userInfo) navigation.navigate(variables.User);

        const body = {
            data: {
                commentId: id,
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
        console.log(likes, 'likes...///.111...')
        setLikedUser(_.find(likes?.data, (item) => {
            return item?.attributes.userId?.data.id == parseUser.id;
        }))
        setUserInfo(parseUser);
    }, [])

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo])

    return (
        <View style={styles.commentItem}>
            {/* <Icon name="user-circle" size={20}/> */}
            <Avatar />
            <View style={styles.commentItemRight}>
                <View style={styles.commentItemContent}>
                    <Text>{content}</Text>
                </View>
                <View style={styles.commentItemBottom}>
                    <View style={styles.commentItemBottomLeft}>
                        <Text onPress={actionLike} style={[styles.likeText, { fontWeight: "700", color: likedUser ? `${color.blue}` : `${color.black}` }]}>Haha</Text>
                        <Text style={styles.replyText} onPress={() => showInputReply(id)}>Phản hồi</Text>
                    </View>
                    <View style={styles.commentItemBottomRight}>
                        <Text style={styles.replyTime}>{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
                        <View style={styles.numberLike}>
                            <Icon name="smile-o" size={20} style={styles.smileIcon} />
                            <Text>{likes?.data.length}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CommentItem;
