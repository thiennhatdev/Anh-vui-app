import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import React, { useState } from 'react'
import UserSelectFile from '../UserSelectFile';
import PostItem from '../PostItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from './style';
import color from '../../commons/variable/color';
import ProfileDetail from '../ProfileDetail';
import variables from '../../constants/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ITEM_LIST = [
    {
        id: 1,
        title: "Đăng ảnh",
        route: variables.UserImage
    },
    // {
    //     id: 2,
    //     title: "Profile",
    //     route: variables.ProfileDetail
    // },
    {
        id: 3,
        title: "Đăng xuất",
        route: variables.Logout
    }
]

const ProfileOptions = ({ navigation }) => {

    const navigate = async (route) => {
        if (route === variables.Logout) {
            await AsyncStorage.multiRemove(['user_info', 'token'])
            await GoogleSignin.signOut();
            Alert.alert('', 'Đăng xuất thành công',
                [
                  {
                    text: 'OK',
                    // onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  // onDismiss: () =>
                  //   Alert.alert(
                  //     'This alert was dismissed by tapping outside of the alert dialog.',
                  //   ),
                },
              );
            navigation.navigate(variables.Home)
            return;
        }
        navigation.navigate(route)
    }

    return (
        <View style={styles.wrapProfile}>
            <FlatList
                data={ITEM_LIST}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight 
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            style={styles.item} 
                            onPress={() => navigate(item.route)}>
                            <View
                                style={styles.innerItem}
                            >
                                <Text>{item.title}</Text>
                                <Icon name={"angle-right"} size={20} color={color.blue} />
                            </View>
                        </TouchableHighlight>

                    )
                }}
                keyExtractor={item => item.id}
            />
        </View >



    )
}

export default ProfileOptions;