import { View, Text } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Auth from '../../components/Auth';
import Profile from '../../components/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileDetail from '../../components/ProfileDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native"; 

const User = (props) => {
  const { navigation } = props;

  const focus = useIsFocused(); 

  const [userInfo, setUserInfo] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    const userInfo = await AsyncStorage.getItem('user_info');
    setUserInfo(userInfo)
  }, [])

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, focus])


  return (
    !userInfo
      ? <Auth navigation={navigation} />
      : <Profile navigation={navigation} />
    // : <Drawer.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
    //   <Drawer.Screen name="Profile" component={Profile} />
    //   <Drawer.Screen name="ProfileDetail" component={ProfileDetail} />
    // </Drawer.Navigator>
  )
}

export default User;