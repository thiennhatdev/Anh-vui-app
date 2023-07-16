import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from './style';
import ProfileDetail from '../ProfileDetail';
import ProfileOptions from '../ProfileOptions';
import variables from '../../constants/variables';
import UserImage from '../UserImage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
// const Tab = createMaterialTopTabNavigator();

const Profile = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={variables.ProfileOptions} component={ProfileOptions} />
        <Stack.Screen name={variables.UserImage} component={UserImage} />
      </Stack.Navigator>
    // <Drawer.Navigator initialRouteName={variables.ProfileOptions} screenOptions={{ headerShown: false }}>
    //   <Drawer.Screen name={variables.ProfileOptions} component={ProfileOptions} />
    //   <Drawer.Screen name={variables.ProfileDetail} component={ProfileDetail} />
    //   <Drawer.Screen name={variables.UserImage} component={UserImage} />
    // </Drawer.Navigator>
  )
}

export default Profile;