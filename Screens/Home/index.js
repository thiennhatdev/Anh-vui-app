import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  useInfiniteQuery
} from 'react-query';
import PostItem from '../../components/PostItem';
import UserSelectFile from '../../components/UserSelectFile';

import { getImages } from '../../apis/image';
import SkeletonPost from '../../components/Skeleton/SkeletonPost';
import styles from './style';
import { AppContext } from '../../App';

let Home = (props) => {
  const { navigation } = props;
  const focus = useIsFocused();

  const [firstFetching, setFirstFetching] = useState(true);
  const [isEndContent, setIsEndContent] = useState(false);
  const { userAfterLogin, setUserAfterLogin } = useContext(AppContext);
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
    ['images', focus, userAfterLogin],
    async ({ pageParam = 1 }) => getImages(params, pageParam),
    {
      onSuccess: () => {
        setFirstFetching(false)
      },
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
    if (hasNextPage) {
      fetchNextPage();
    } else {
      if (!isFetching) {
        setIsEndContent(true)
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
        <View style={styles.contentHome}>
          <FlatList
            data={data?.pages.map(page => page.data.data).flat()}
            renderItem={({ item }) => {
              return isFetching && firstFetching ? <SkeletonPost /> : <PostItem item={item} navigation={navigation} />
            }}
            keyExtractor={item => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListHeaderComponent={<UserSelectFile navigation={navigation} />}
            ListFooterComponent={
              isEndContent ?
              <View style={styles.emptyContent}>
                <Icon name="warning" size={20} style={styles.warningIcon} />
                <Text style={styles.emptyText}>Bạn đã xem hết rồi!</Text>
              </View>
              : null
            }
          />
        </View>
    </SafeAreaView>
  )
}

// Home = () => <NetworkLogger />;

export default Home