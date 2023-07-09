import { View, Text, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
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

    const navigate = (route) => {
        if (route === variables.Logout) {
            console.log('logout')
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