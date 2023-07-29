import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import SkeletonPost from '../../components/Skeleton/SkeletonPost';
import ProfileLayout from '../../layouts/ProfileLayout/index.js';
import PostItem from '../PostItem';
import UserSelectFile from '../UserSelectFile';

import { useInfiniteQuery } from 'react-query';
import { getImages } from '../../apis/image';
import styles from './style';


let UserImage = (props) => {
  const { children, navigation } = props;
  const [userInfo, setUserInfo] = useState(false);
  const [allPages, setAllPages] = useState(0);

  const [params, setParams] = useState({
    populate: {
      userId: {
        populate: "*"
      },
      likes: {
        populate: "*"
      },
      link: {
        populate: "*"
      },
      comments: {
        populate: {
          comments: {
            populate: {
              likes: "*"
            }
          },
          likes: {
            populate: "*"
          }
        }
      }
    },
    filters: {
      userId: ""
    },
    pagination: {
      pageSize: 3,
    }
  })

  const { isLoading, isFetching, isSuccess, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['imagesOfUser', params],
    async ({ pageParam = 1 }) => {
      const userId = await AsyncStorage.getItem("user_info");
      const parseUser = JSON.parse(userId);
      return getImages({
        ...params,
        filters: {
          userId: parseUser.id
        },
      }, pageParam)
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageParam < allPages
          ? lastPage.pageParam + 1
          : false;
      },
    }
  );

  const total = data?.pages[0].data.meta.pagination.total;
  const totalPage = Math.ceil(total / params.pagination.pageSize)

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setAllPages(totalPage)
    }
  }, [isSuccess, totalPage]);

  const fetchUserInfo = useCallback(async () => {
    const user = await AsyncStorage.getItem('user_info');
    const parseUser = JSON.parse(user);
    setUserInfo(parseUser);
    setParams({
      ...params,
      filters: {
        userId: parseUser.id
      }
    });
  }, [])

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo])

  return (
    <ProfileLayout navigation={navigation}>
      <View style={styles.contentUserImage}>
        <UserSelectFile navigation={navigation} />
        <View style={styles.imagesOfUser}>
          <FlatList
            data={data?.pages.map(page => page.data.data).flat()}
            renderItem={({ item }) => {
              return isFetching || isLoading ? <SkeletonPost /> : <PostItem item={item} navigation={navigation} />
            }}
            keyExtractor={item => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
          />
        </View>
      </View>
    </ProfileLayout>
  )
}
// UserImage = () => <NetworkLogger />;


export default UserImage;