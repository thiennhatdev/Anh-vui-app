import React from 'react';
import { Text, View } from 'react-native';

import ProfileLayout from '../../layouts/ProfileLayout/index.js';
import styles from './style';


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