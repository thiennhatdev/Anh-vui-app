import { Keyboard, KeyboardAvoidingView, View, Text, TouchableOpacity, Dimensions, SafeAreaView, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentItem from '../CommentItem';
import { useKeyboardHeight } from '../../hooks/getHeightKeyboard';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import {debounce} from 'lodash';

import styles from './style'
import { comment, getComments } from '../../apis/comments';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import space from '../../commons/variable/space';
import color from '../../commons/variable/color';



const CommentBottomSheet = (props) => {
    const { visibleBottomSheet, onVisibleBottomSheet, numberLikes, postId } = props;

    const keyboardHeight = useKeyboardHeight();
    const inputRef = useRef();
    const refRBSheet = useRef();
    const queryClient = useQueryClient();
    const ScreenHeight = useSafeAreaFrame().height;

    const [allPages, setAllPages] = useState(0);
    const [objTarget, setObjTarget] = useState({imageId: postId})
    const [keyboardAvoiding, setKeyboardAvoiding] = useState(false)
    const [params, setParams] = useState({
        filters: {
            imageId: postId
        },
        populate: "*",
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
                console.log(lastPage, allPages, 'allPages + lastPage')
                return lastPage.pageParam < allPages
                    ? lastPage.pageParam + 1
                    : false;
            },
        }
    );
    const mutation = useMutation((data) => comment(data), {
        onSuccess: async (newPost) => {
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
    const showInputReply = (idComment) => {
        inputRef.current.focus();
        setObjTarget({
            commentId: idComment
        })
    }

    const loadMore = () => {
        console.log(hasNextPage, 'hasNextPage on cmt bottom sheet..........')
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const onComment = async () => {
        if (!inputRef.current.value) return;

        const body = {
            data: {
              content: inputRef.current.value,
              userId: "1",
              ...objTarget
            }
          }
        await mutation.mutate(body);
        inputRef.current.clear();

    }

    useEffect(() => {
        console.log(totalPage, isSuccess, 'isSuccess ..... next page')
        if (isSuccess) {
            setAllPages(totalPage)
        }
    }, [isSuccess, totalPage]);

    useEffect(() => {
        if (visibleBottomSheet) refRBSheet.current.open();
    }, [visibleBottomSheet])

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
                                                <CommentItem item={item} showInputReply={showInputReply} />
                                                <View style={styles.replyList}>
                                                    <FlatList
                                                        data={item.attributes?.comments?.data}
                                                        renderItem={({ item }) => <CommentItem item={item} showInputReply={showInputReply} />}
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
                            onBlur={() => setObjTarget({
                                imageId: postId
                            })}
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