import { View, Text, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style'

const CommentItem = (props) => {
    const { item, showInputReply } = props;
    const { id, commentId } = item || {}; 

    return (
        <View style={styles.commentItem}>
            <Icon name="user-circle" size={20}/>
            <View style={styles.commentItemRight}>
                <View style={styles.commentItemContent}>
                   <Text>Content of comment Content of comment Content of comment Content of comment Content of comment</Text>
                </View>
                <View style={styles.commentItemBottom}>
                    <View style={styles.commentItemBottomLeft}>
                        <Text style={styles.likeText}>Thích</Text>
                        <Text style={styles.replyText} onPress={() => showInputReply(commentId || id)}>Phản hồi</Text>
                    </View>
                    <View style={styles.commentItemBottomRight}>
                        <Text style={styles.replyTime}>4/7/2023</Text>
                        <View style={styles.numberLike}>
                            <Icon name="smile-o" size={20} style={styles.smileIcon}/>
                            <Text>10</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CommentItem;
