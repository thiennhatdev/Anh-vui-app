import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useMutation } from 'react-query';
import { dislike, like } from '../../apis/likes';
import color from '../../commons/variable/color';
import variables from '../../constants/variables';
import { socket } from '../../hooks/socket';
import Avatar from '../Avatar';
import styles from './style';

const CommentItem = (props) => {
    const { navigation, item, showInputReply } = props;
    const { id, attributes } = item;
    const { content, createdAt, likes, userId } = attributes || {};

    const [userInfo, setUserInfo] = useState(false);
    const [likedUser, setLikedUser] = useState(false);

    const likeMutation = useMutation((body) => like(body), {
        onSuccess: async (data) => {
            setLikedUser(data?.data);
            if (userInfo.id !== userId.data.id) {
                socket.emit('like', { 
                    content: `${userInfo.username} đã thích bình luận của bạn: "${content.substring(0,40)}"`, 
                    isRead: false, 
                    fromUserId: userInfo.id ,
                    toUserId: userId.data.id ,
                    commentId: id,
                    publishedAt: dayjs()
                })

            }
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
        setLikedUser(_.find(likes?.data, (item) => {
            return item?.attributes.userId?.data.id == parseUser?.id;
        }))
        setUserInfo(parseUser);
    }, [])

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo])

    return (
        <View style={styles.commentItem}>
            <Avatar photo={userId?.data.attributes.photo} />
            <View style={styles.commentItemRight}>
                <View style={styles.commentItemContent}>
                    <Text style={styles.contentText}>{content}</Text>
                </View>
                <View style={styles.commentItemBottom}>
                    <View style={styles.commentItemBottomLeft}>
                        <TouchableOpacity onPress={actionLike}>
                            <Text style={[styles.likeText, { color: likedUser ? `${color.blue}` : `${color.black}` }]}>Haha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showInputReply(item, userId)}>
                            <Text style={styles.replyText}>Phản hồi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentItemBottomRight}>
                        <Text style={styles.replyTime}>{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
                        <View style={styles.numberLike}>
                            <Icon name="smile-o" size={20} style={styles.smileIcon} />
                            <Text>{likes?.data.length || ""}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CommentItem;
