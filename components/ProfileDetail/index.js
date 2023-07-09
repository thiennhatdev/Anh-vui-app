import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import UserSelectFile from '../UserSelectFile';
import PostItem from '../PostItem';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import ProfileLayout from '../../layouts/ProfileLayout/index.js';


const ProfileDetail = (props) => {
    const { navigation } = props;


    return (
        <ProfileLayout navigation={navigation}>
                <View style={styles.wrapProfile}>
            
                {/* <UserSelectFile />
                <View style={styles.imageOfUser}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <PostItem item={item} navigation={navigation} />}
                        keyExtractor={item => item.id}
                    />
                </View> */}
                <Text>profile detail</Text>
            </View>
        </ProfileLayout>
        
    )
}

export default ProfileDetail;