import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Auth from '../../components/Auth';
import Profile from '../../components/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileDetail from '../../components/ProfileDetail';

const Drawer = createDrawerNavigator();
const User = (props) => {
  const { navigation } = props;

    const [isLogin, setIsLogin] = useState(true);

  return (
    !isLogin
        ? <Auth />
        : <Profile navigation={navigation}/>
        // : <Drawer.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
        //   <Drawer.Screen name="Profile" component={Profile} />
        //   <Drawer.Screen name="ProfileDetail" component={ProfileDetail} />
        // </Drawer.Navigator>
  )
}

export default User;