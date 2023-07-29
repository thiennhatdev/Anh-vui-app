import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import variables from '../../constants/variables';
import ProfileOptions from '../ProfileOptions';
import UserImage from '../UserImage';

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