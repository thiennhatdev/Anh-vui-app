import { Keyboard, KeyboardAvoidingView, View, Text, TouchableOpacity, Dimensions, SafeAreaView, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentItem from '../CommentItem';
import { useKeyboardHeight } from '../../hooks/getHeightKeyboard';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { debounce } from 'lodash';

import styles from './style'
import { comment, getComments } from '../../apis/comments';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import space from '../../commons/variable/space';
import color from '../../commons/variable/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../../hooks/socket';
import dayjs from 'dayjs';



const CommentBottomSheet = (props) => {
    const { navigation, visibleBottomSheet, onVisibleBottomSheet, numberLikes, postId, userId } = props;

    const keyboardHeight = useKeyboardHeight();
    const inputRef = useRef();
    const refRBSheet = useRef();
    const queryClient = useQueryClient();
    const ScreenHeight = useSafeAreaFrame().height;

    const [userInfo, setUserInfo] = useState(false);
    const [allPages, setAllPages] = useState(0);
    const [imageAndCmtOfUser, setImageAndCmtOfUser] = useState(userId)
    const [objTarget, setObjTarget] = useState({ imageId: postId })
    const [keyboardAvoiding, setKeyboardAvoiding] = useState(false)
    const [params, setParams] = useState({
        filters: {
            imageId: postId
        },
        populate: {
            userId: {
                populate: "*"
            },
            imageId: {
                populate: "*"
            },
            commentId: {
                populate: "*"
            },
            likes: {
                populate: "*"
            },
            comments: {
                populate: {
                    likes: {
                        populate: "*"
                    },
                    userId: {
                        populate: "*"
                    }
                }
            }
        },
        sort: "createdAt:desc",
        pagination: {
            pageSize: 10,
        }
    })

    const { isLoading, isFetching, isSuccess, hasNextPage, fetchNextPage, data } = useInfiniteQuery(
        'commentsOfPost',
        async ({ pageParam = 1 }) => getComments(params, pageParam),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.pageParam < allPages
                    ? lastPage.pageParam + 1
                    : false;
            },
        }
    );

    const mutation = useMutation((data) => comment(data), {
        onSuccess: async (newPost) => {
            if (userInfo.id !== imageAndCmtOfUser.data.id) {
                socket.emit('like', { 
                    content: objTarget.imageId
                                ? `${userInfo.username} đã bình luận về ảnh của bạn`
                                : `${userInfo.username} đã phản hồi bình luận của bạn`, 
                    isRead: false, 
                    fromUserId: userInfo.id ,
                    toUserId: imageAndCmtOfUser.data.id ,
                    publishedAt: dayjs(),
                    ...objTarget
                    
                })

            }
            await queryClient.prefetchInfiniteQuery(
                ['commentsOfPost'],
                async ({ pageParam = 1 }) => getComments(params, pageParam),)
        },
    });

    const total = data?.pages[0].data.meta.pagination.total;
    const totalPage = Math.ceil(total / params.pagination.pageSize)

    const toggleBottomNavigationView = () => {
        onVisibleBottomSheet();
    };

    const showInputReply = (idComment, userId) => {
        inputRef.current.focus();
        setImageAndCmtOfUser(userId)
        setObjTarget({
            commentId: idComment
        })
    }

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const onComment = async () => {
        if (!inputRef.current.value) return;

        const body = {
            data: {
                content: inputRef.current.value,
                userId: userInfo.id,
                ...objTarget
            }
        }
        await mutation.mutate(body);
        inputRef.current.clear();

    }

    useEffect(() => {
        if (isSuccess) {
            setAllPages(totalPage)
        }
    }, [isSuccess, totalPage]);

    useEffect(() => {
        if (visibleBottomSheet) refRBSheet.current.open();
    }, [visibleBottomSheet])

    const fetchUserInfo = useCallback(async () => {
        const user = await AsyncStorage.getItem('user_info');
        const parseUser = JSON.parse(user);
        setUserInfo(parseUser);
    }, [])

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo])

    return (
        <SafeAreaView style={styles.container}>
            <RBSheet
                ref={refRBSheet}
                onClose={toggleBottomNavigationView}
                height={ScreenHeight}
                openDuration={100}
                customStyles={{
                    container: {
                    }
                }}
            >
                <View style={[styles.postCommentWrap, { height: ScreenHeight - 70 }]}>
                    <View style={styles.numberLike}>
                        <Text>{numberLikes || "Hãy là"} người thích bài viết này</Text>
                    </View>
                    <View style={[styles.postCommentContent, { height: ScreenHeight - 100 }]}>
                        {
                            data?.pages[0].data.data.length
                                ?
                                <FlatList
                                    showsVerticalScrollIndicator={true}
                                    data={data?.pages.map(page => page.data.data).flat()}
                                    style={styles.commentFlatList}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <CommentItem navigation={navigation} item={item} showInputReply={showInputReply} />
                                                <View style={styles.replyList}>
                                                    <FlatList
                                                        data={item.attributes?.comments?.data}
                                                        renderItem={({ item }) => <CommentItem navigation={navigation} item={item} showInputReply={showInputReply} />}
                                                        keyExtractor={item => item.id}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }}
                                    onEndReached={loadMore}
                                    onEndReachedThreshold={0.3}
                                    keyExtractor={item => item.id}
                                />
                                : <View style={styles.emptyComments}>
                                    <Icon name="comments" size={30} />
                                    <Text style={styles.emptyCommentsText}>Chưa có bình luận nào</Text>
                                </View>
                        }

                    </View>
                </View>
                <KeyboardAvoidingView style={[styles.postCommentInput, { marginBottom: Platform.OS === 'ios' && keyboardAvoiding ? keyboardHeight : 0 }]}>
                    <View style={styles.wrapInput}>
                        <TextInput
                            ref={inputRef}
                            style={styles.inputComment}
                            onChangeText={(text) => {
                                inputRef.current.value = text;
                            }}
                            placeholder="Bình luận"
                            onFocus={() => setKeyboardAvoiding(true)}
                            onBlur={() => {
                                setImageAndCmtOfUser(userId)
                                setObjTarget({
                                    imageId: postId
                                })
                            }}
                            onSubmitEditing={onComment}
                        />
                        <TouchableOpacity onPress={onComment} style={styles.sendIcon}>
                            <Icon name="paper-plane-o" size={20} color={color.blue} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </RBSheet>
        </SafeAreaView>

    )
}

export default CommentBottomSheet