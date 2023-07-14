import { View, Text, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style'
import dayjs from 'dayjs';
import Avatar from '../Avatar';
import { useMutation } from 'react-query';
import { like } from '../../apis/likes';

const CommentItem = (props) => {
    const { item, showInputReply } = props;
    const { id, attributes } = item;
    const { content, createdAt, likes } = attributes || {};

    const mutation = useMutation((data) => like(data), {
        onSuccess: async () => {
            console.log("like comment success")
        },
    });

    // console.log(attributes, 'attributes comment item')
    // const { id, commentId } = item || {}; 

    const actionLike = async () => {
        const body = {
            data: {
              commentId: id,
              userId: "1"
            }
          }
        await mutation.mutate(body);
       
    }

    return (
        <View style={styles.commentItem}>
            {/* <Icon name="user-circle" size={20}/> */}
            <Avatar />
            <View style={styles.commentItemRight}>
                <View style={styles.commentItemContent}>
                   <Text>{ content }</Text>
                </View>
                <View style={styles.commentItemBottom}>
                    <View style={styles.commentItemBottomLeft}>
                        <Text style={styles.likeText} onPress={actionLike}>Thích</Text>
                        <Text style={styles.replyText} onPress={() => showInputReply(id)}>Phản hồi</Text>
                    </View>
                    <View style={styles.commentItemBottomRight}>
                        <Text style={styles.replyTime}>{ dayjs(createdAt).format('DD/MM/YYYY') }</Text>
                        <View style={styles.numberLike}>
                            <Icon name="smile-o" size={20} style={styles.smileIcon}/>
                            <Text>{likes?.data.length}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CommentItem;
