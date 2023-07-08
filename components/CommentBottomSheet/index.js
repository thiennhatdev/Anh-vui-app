import { Keyboard, KeyboardAvoidingView, View, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { BottomSheet } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentItem from '../CommentItem';
import { useKeyboardHeight } from '../../hooks/getHeightKeyboard';

import styles from './style'

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
    const [keyboardAvoiding, setKeyboardAvoiding] = useState(false)

    const keyboardHeight = useKeyboardHeight();
    const inputRef = useRef();

    const toggleBottomNavigationView = () => {
        onVisibleBottomSheet();
    };

    const showInputReply = (idComment) => {
        console.log(idComment, 'idComment', keyboardHeight)
        inputRef.current.focus();
        // const newList = commentList.map(item => {
        //     // console.log(item, idComment, 'idComment')
        //     return {
        //         ...item,
        //         responding: item.id === idComment
        //     }
        // })
        // setCommentList(newList)
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
                                            {/* {
                                                item?.responding &&
                                                <KeyboardAvoidingView
                                                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                                >
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
                                                </KeyboardAvoidingView>
                                            } */}
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <KeyboardAvoidingView style={[styles.postCommentInput, { marginBottom: Platform.OS === 'ios' && keyboardAvoiding ? keyboardHeight : 0}]}>
                        <View style={styles.wrapInput}>
                            <TextInput
                                ref={inputRef}
                                style={styles.inputComment}
                                // onChangeText={onChangeNumber}
                                // value={number}
                                placeholder="Bình luận"
                                onFocus={() => setKeyboardAvoiding(true)}
                            />
                            <Icon name="paper-plane-o" size={20} style={styles.sendIcon}/>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </BottomSheet>
        // </SafeAreaView>
        
    )
}

export default CommentBottomSheet