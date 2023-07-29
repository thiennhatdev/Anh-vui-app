import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useKeyboardHeight } from '../../hooks/getHeightKeyboard';
import CommentItem from '../CommentItem';

import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { comment, getComments } from '../../apis/comments';
import color from '../../commons/variable/color';
import { socket } from '../../hooks/socket';
import styles from './style';



let CommentBottomSheet = (props) => {
    const { navigation, visibleBottomSheet, onVisibleBottomSheet, numberLikes, postId, userId } = props;

    const keyboardHeight = useKeyboardHeight();
    const inputRef = useRef();
    const refRBSheet = useRef();
    const queryClient = useQueryClient();
    const ScreenHeight = useSafeAreaFrame().height;

    const [firstFetching, setFirstFetching] = useState(true);
    const [userInfo, setUserInfo] = useState(false);
    const [allPages, setAllPages] = useState(0);
    const [imageAndCmtOfUser, setImageAndCmtOfUser] = useState(userId)
    const [objTarget, setObjTarget] = useState({ imageId: postId })
    const [commentReply, setCommentReply] = useState({});
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

    const { isLoading, isFetching, isSuccess, hasNextPage, fetchNextPage, data, status } = useInfiniteQuery(
        ['commentsOfPost', postId],
        async ({ pageParam = 1 }) => getComments(params, pageParam),
        {
            onSuccess: () => {
                setFirstFetching(false)
            },
            getNextPageParam: (lastPage) => {
                const total = data?.pages[0].data.meta.pagination.total;
                const totalPage = Math.ceil(total / params.pagination.pageSize)

                return lastPage.pageParam < totalPage
                    ? lastPage.pageParam + 1
                    : false;
            },
        }
    );

    const mutation = useMutation((data) => comment(data), {
        onSuccess: async (newPost) => {
            if (imageAndCmtOfUser.data && userInfo.id !== imageAndCmtOfUser.data.id) {
                socket.emit('like', {
                    content: objTarget.imageId
                        ? `${userInfo.username} đã bình luận về ảnh của bạn`
                        : `${userInfo.username} đã phản hồi bình luận của bạn: "${commentReply.attributes.content.substring(0, 40)}"`,
                    isRead: false,
                    fromUserId: userInfo.id,
                    toUserId: imageAndCmtOfUser.data.id,
                    publishedAt: dayjs(),
                    ...objTarget

                })

            }
            await queryClient.prefetchInfiniteQuery(
                ['commentsOfPost', postId],
                async ({ pageParam = 1 }) => getComments(params, pageParam))
        },
    });

    const toggleBottomNavigationView = () => {
        onVisibleBottomSheet();
    };

    const showInputReply = (comment, userId) => {
        inputRef.current.focus();
        setImageAndCmtOfUser(userId)
        setCommentReply(comment)
        setObjTarget({
            commentId: comment.id
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
                {
                    isFetching && firstFetching
                        ? <View style={styles.loadingWrap}>
                            <ActivityIndicator size="large" color={color.blue} />
                        </View>
                        : <View style={[styles.postCommentWrap, { height: ScreenHeight - 70 }]}>
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
                }

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

// CommentBottomSheet = () => <NetworkLogger />;


export default CommentBottomSheet