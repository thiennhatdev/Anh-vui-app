import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView, LogBox } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostItem from '../../components/PostItem';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery
} from 'react-query';
import UserSelectFile from '../../components/UserSelectFile';
import NetworkLogger from 'react-native-network-logger';

import styles from './style';
import { getImages } from '../../apis/image';
import SkeletonPost from '../../components/Skeleton/SkeletonPost';

let Home = (props) => {
  const { navigation } = props;

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
        // populate: "*"
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
    sort: "createdAt:desc",
    pagination: {
      pageSize: 10,
    }
  })

  const [allPages, setAllPages] = useState(0);

  const { isLoading, isFetching, isSuccess, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'images',
    async ({ pageParam = 1 }) => getImages(params, pageParam),
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
 
  useEffect(() => {
    if (isSuccess) {
      setAllPages(totalPage)
    }
  }, [isSuccess, totalPage]);

  const loadMore = () => {
    console.log(hasNextPage, 'hasNextPage..........')
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
        <View style={styles.contentHome}>
          <FlatList
            data={data?.pages.map(page => page.data.data).flat()}
            renderItem={({ item }) => {
              return isFetching || isLoading ? <SkeletonPost /> : <PostItem item={item} navigation={navigation} />
            }}
            keyExtractor={item => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListHeaderComponent={<UserSelectFile navigation={navigation} />}
          />
        </View>
    </SafeAreaView>
  )
}

// Home = () => <NetworkLogger />;
// 
export default Home