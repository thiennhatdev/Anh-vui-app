import { View, Text, FlatList } from 'react-native'
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
import ProfileOptions from '../ProfileOptions';
import variables from '../../constants/variables';
import UserImage from '../UserImage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Profile = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName={variables.ProfileOptions} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name={variables.ProfileOptions} component={ProfileOptions} />
      <Drawer.Screen name={variables.ProfileDetail} component={ProfileDetail} />
      <Drawer.Screen name={variables.UserImage} component={UserImage} />
    </Drawer.Navigator>
  )
}

export default Profile;