import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    useQuery,
} from 'react-query';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getNotifications, getUnreadNotifications } from '../../apis/notifications';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../../hooks/socket';
import variables from '../../constants/variables';
import Home from '../../Screens/Home';
import Notification from '../../Screens/Notification';
import User from '../../Screens/User';
import color from '../../commons/variable/color';

import styles from './style';


const Tab = createMaterialTopTabNavigator();

let TopHeader = (props) => {
    const [totalUnread, setTotalUnread] = useState(0);
    const [params, setParams] = useState({
        filters: {
            isRead: false,
            toUserId: ""
        },
        pagination: {
            pageSize: 10,
        }
    })

    const { isLoading, isFetching, isSuccess, data, hasNextPage, fetchNextPage } = useQuery(
        {
            queryKey: ['unreadNotifications', params],
            queryFn: async () => {
                const toUserId = await AsyncStorage.getItem("user_info");
                const parseUser = JSON.parse(toUserId);

                return getUnreadNotifications({
                    ...params,
                    filters: {
                        ...params.filters,
                        toUserId: parseUser.id
                    }
                })

            },
            onSuccess: () => {
                console.log(data, 'data?.meta?.pagination.total')
                setTotalUnread(data?.meta?.pagination.total);
            },
        }
    );

    console.log(data, 'data notifications unread')

    const connectSocket = useCallback(async () => {
        const token = await AsyncStorage.getItem('token')

        console.log('start app', socket.id)

        socket.on('connect', () => {
            console.log('connected at app 1', socket.id)

            socket.emit('verifyToken', {
                token: `${token}`,
                socketId: socket.id
            })
        })
        console.log('emit ngoài connect')


        socket.emit('verifyToken', {
            token: `${token}`,
            socketId: socket.id
        })

        socket.on('receiveNoti', (data) => {
            setTotalUnread(totalUnread + 1)
            console.log(data, 'data nhận từ server khi like ảnh hoặc comment')
        })


    }, [])

    useEffect(() => {
        connectSocket()
    }, [connectSocket])


    useEffect(() => {
        
        return () => {
        }
    }, [])

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    // tabBarBadge: () => {
                    //     return (  <Text>3</Text> )
                    // },
                    
                    tabBarIcon: ({ focused, size }) => {
                        let iconName;

                        switch (route.name) {
                            case variables.Home:
                                iconName = 'home';
                                break;
                            case variables.Notification:
                                iconName = 'bell';
                                break;
                            case variables.User:
                                iconName = 'user-circle-o';
                                break;
                            default:
                                break;
                        }

                        return(
                            <View style={styles.iconWrap}>
                                {
                                    (route.name === variables.Notification && totalUnread) ?
                                        <View style={styles.badgesWrap}>
                                            <Text style={styles.iconBadges}> { totalUnread }</Text>
                                        </View>
                                        : null
                                }
                                <Icon name={iconName} size={20} color={focused ? color.blue : 'gray'} />
                            </View>
                        )
                    },
                    // tabBarActiveTintColor: 'tomato',
                    // tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name={variables.Home} component={Home} />
                <Tab.Screen name={variables.Notification} children={() => <Notification onReadNotiSuccess={() => setTotalUnread(0)} />}  />
                <Tab.Screen name={variables.User} component={User} />
                {/* <Tab.Screen name={variables.ProfileDetail} component={ProfileDetail} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TopHeader