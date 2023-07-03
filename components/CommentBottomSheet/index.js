import { View, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style'
import CommentItem from '../CommentItem';

const DATA = [
    {
        id: 1,
        content: "comment 1",
        reply: [
            {
                id: 1342,
                content: "reply 1 comment 1",
                commentId: 1
            },
            {
                id: 1323442,
                content: "reply 2 comment 1",
                commentId: 1
            },
        ],
    },
    {
        id: 2,
        content: "comment 2",
        reply: [
            {
                id: 1343542,
                content: "reply 1 comment 2",
                commentId: 2
            }
        ],
    },
    {
        id: 3,
        content: "comment 3",
    },
    {
        id: 4,
        content: "comment 3",
    },
    {
        id: 5,
        content: "comment 3",
    },
    {
        id: 6,
        content: "comment 3",
    },
    {
        id: 7,
        content: "comment 3",
    },
    {
        id: 8,
        content: "comment 3",
    },

]

const CommentBottomSheet = (props) => {
    const [ commentList, setCommentList ] = useState(DATA);
    const { visibleBottomSheet, onVisibleBottomSheet } = props;

    const toggleBottomNavigationView = () => {
        onVisibleBottomSheet();
    };

    const showInputReply = (idComment) => {
        console.log(idComment, 'idComment')
        const newList = commentList.map(item => {
            // console.log(item, idComment, 'idComment')
            return {
                ...item,
                responding: item.id === idComment
            }
        })
        setCommentList(newList)
    }

    return (
        // <SafeAreaView style={styles.container}>
            <BottomSheet
                visible={visibleBottomSheet}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <View style={styles.postCommentWrap}>
                    <View style={styles.numberLike}>
                        <Text>20 người thích bài viết</Text>
                    </View>
                    <View style={styles.postCommentContent}>
                        <FlatList
                            style={styles.commentFlatList}
                            data={commentList}
                            renderItem={({item}) => {
                                return (
                                    <View>
                                        <CommentItem item={item} showInputReply={showInputReply} />
                                        <View style={styles.replyList}>
                                            <FlatList
                                                data={item.reply}
                                                renderItem={({item}) => <CommentItem item={item} showInputReply={showInputReply} />}
                                                keyExtractor={item => item.id}
                                            />
                                            {
                                                item?.responding &&
                                                <View style={[styles.wrapInput, styles.wrapInputChild]}>
                                                    <TextInput
                                                        style={styles.inputComment}
                                                        // onChangeText={onChangeNumber}
                                                        // value={number}
                                                        placeholder="Phản hồi"
                                                        autoFocus={true}
                                                        // keyboardType="numeric"
                                                    />
                                                    <Icon name="paper-plane-o" size={20} style={styles.sendIcon}/>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.postCommentInput}>
                        <View style={styles.wrapInput}>
                            <TextInput
                                style={styles.inputComment}
                                // onChangeText={onChangeNumber}
                                // value={number}
                                placeholder="Bình luận"
                                // keyboardType="numeric"
                            />
                            <Icon name="paper-plane-o" size={20} style={styles.sendIcon}/>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        // </SafeAreaView>
        
    )
}

export default CommentBottomSheet