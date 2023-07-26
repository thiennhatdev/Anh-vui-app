import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import NotificationItem from '../../components/NotificationItem'
import Icon from 'react-native-vector-icons/Ionicons';

import { socket } from '../../hooks/socket';
import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { getNotifications, readNotifications } from '../../apis/notifications';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import NetworkLogger from 'react-native-network-logger';
import { useIsFocused } from '@react-navigation/native';

import styles from './style';
import color from '../../commons/variable/color';

let Notification = (props) => {
  const { onReadNotiSuccess } = props;
  const focus = useIsFocused();
  const queryClient = useQueryClient();

  const [params, setParams] = useState({
    populate: {
      fromUserId: {
        populate: "*"
      },
      toUserId: {
        populate: "*"
      },
      imageId: {
        populate: "*"
      },
      commentId: {
        populate: "*"
      },
    },
    filters: {
      toUserId: ""
    },
    sort: "createdAt:desc",
    pagination: {
      pageSize: 10
    }
  })
  const [allPages, setAllPages] = useState(0);

  const { isLoading, isFetching, isSuccess, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['notifications', focus],
    async ({ pageParam = 1 }) => {
      const toUserId = await AsyncStorage.getItem("user_info");
      const parseUser = JSON.parse(toUserId);
      return getNotifications({
        ...params,
        filters: {
          toUserId: parseUser.id
        }
      }, pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageParam < allPages
          ? lastPage.pageParam + 1
          : false;
      },
    }
  );

  const readNotiMutation = useMutation(() => readNotifications(), {
    onSuccess: async (data) => {
      onReadNotiSuccess()
      await queryClient.prefetchInfiniteQuery(
        ['notifications'],
        async ({ pageParam = 1 }) => {
          const toUserId = await AsyncStorage.getItem("user_info");
          const parseUser = JSON.parse(toUserId);
          return getNotifications({
            ...params,
            filters: {
              toUserId: parseUser.id
            }
          }, pageParam);
        })
    },
  });

  const total = data?.pages[0].data.meta.pagination.total;
  const totalPage = Math.ceil(total / params.pagination.pageSize)

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setAllPages(totalPage)
    }
  }, [isSuccess, totalPage]);

  useEffect(() => {
    readNotiMutation.mutate();
  }, [focus])

  if (isFetching) {
    return<View style={styles.loadingWrap}>
       <ActivityIndicator size="large" color={color.blue} />
    </View>
  }

  return (
      <View style={styles.notificationWrap}>
      {
        !data?.pages.length
          ? <View style={styles.emptyNotification}>
            <Icon name="notifications-off" size={20} style={styles.notiIcon} />
            <Text style={styles.emptyText}>Không có thông báo</Text>
          </View>
          : <FlatList
            data={data?.pages.map(page => page.data.data).flat()}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={item => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
          />
      }
    </View>
  )
}

// Notification = () => <NetworkLogger />;


export default Notification;
