import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53aohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },
  {
    id: 'bd7acdbea-c1b1-46c2-ased5-3ad53aohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },
  {
    id: 'bd7dacbea-c1b1-46c2-aed5-3ad53aohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },
  {
    id: 'bd7dacbea-c1b1-46c2-aed5-3ad53agohbb28ba',
    item: {
      url: "ffff",
      user: {
        name: 'nhat',
        avatar: 'sdfsdfsd'
      }
    },
  },

];



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
      pageSize: 3,
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
  console.log(data, 'data on home')
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
  console.log(isFetching, 'iseeeccccceeeeet')

  return (
    <View style={styles.wrapper}>
      {/* <ScrollView>  */}
      <UserSelectFile navigation={navigation} />
      <View style={styles.contentHome}>
        <FlatList
          data={data?.pages.map(page => page.data.data).flat()}
          renderItem={({ item }) => {
            return isFetching ? <SkeletonPost /> : <PostItem item={item} navigation={navigation} />
          }}
          keyExtractor={item => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

// Home = () => <NetworkLogger />;
// 
export default Home