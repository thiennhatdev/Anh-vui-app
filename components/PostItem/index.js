import { View, Text, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentBottomSheet from '../CommentBottomSheet';
import dayjs from 'dayjs';

import styles from './style'
import Avatar from '../Avatar';
import { useMutation } from 'react-query';
import { like } from '../../apis/likes';

const PostItem = (props) => {
    const { navigation, item } = props;
    const { id, attributes: { description, createdAt, link, comments, likes, userId } } = item;
    const isLogined = true;

    const mutation = useMutation((data) => like(data), {
        onSuccess: async () => {
            console.log("like success")
        },
    });

    const desiredWidth = Dimensions.get('window').width;
    const uri = "https://znews-photo.zingcdn.me/w480/Uploaded/hointt/2023_02_22/44_zing_1_1.jpg";
// console.log(item, 'item on detail')
    const [desiredHeight, setDesiredHeight] = React.useState(0)
    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);

    Image.getSize(uri, (width, height) => {
        setDesiredHeight(desiredWidth / width * height)
    })

    const actionLike = async () => {
        if (!isLogined) navigation.navigate('User');

        const body = {
            data: {
              imageId: id,
              userId: "1"
            }
          }
        await mutation.mutate(body);
       
    }

    return (
        <>
            <View style={styles.postWrapper}>
                <View style={styles.postAuthor}>
                    <Avatar />
                    <View style={styles.postAuthorRight}>
                        <Text style={styles.name}>{userId.data ? userId.data.attributes.username : 'Anonymous'}</Text>
                        <Text style={styles.createdTime}>{ dayjs(createdAt).format('DD/MM/YYYY') }</Text>
                    </View>
                </View>
                <View style={styles.postTitle}>
                    <Text style={styles.postTitleText}>
                        { description }
                    </Text>
                </View>
                <View>
                    <Image
                        style={{
                            borderWidth: 1,
                            width: desiredWidth,
                            height: desiredHeight
                        }}
                        // style={styles.postImage}
                        source={{
                            uri: (link.data && link.data[0].attributes.url) || uri
                        }}
                    />
                </View>
                <View style={styles.analytic}>
                    <View style={styles.analyticLike}>
                        <Icon name="smile-o" size={20}/>
                        <Text style={styles.number}>{ likes?.data?.length }</Text>
                    </View>
                    <Text>
                        { comments?.data?.length } bình luận
                    </Text>
                </View>
                <View style={styles.actionBar}>
                    <Icon name="smile-o" size={20} onPress={actionLike}/>
                    <Icon name="comment-o" size={20} onPress={() => setVisibleBottomSheet(true)}/>
                    <Icon name="share-alt" size={20} onPress={() => navigation.navigate('User')}/>
                </View>
            </View>

            {
                visibleBottomSheet && 
                <CommentBottomSheet
                    visibleBottomSheet={visibleBottomSheet}
                    onVisibleBottomSheet={() => setVisibleBottomSheet(!visibleBottomSheet)}
                    data={comments}
                    postId={id}
                    numberLikes={likes?.data.length}
                />
            }
            
        </>
    )
}

export default PostItem;
