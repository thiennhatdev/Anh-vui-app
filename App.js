// import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { View, Text } from 'react-native'
// import Item from './components/Item'
// import Form from './components/Form'
// import FlatListComponent from './components/FlatList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native'
import ListCategory from './Screens/ListCategory'
import DetailCategory from './Screens/DetailCategory'
import About from './Screens/About'
import Contact from './Screens/Contact'
import Home from './Screens/Home'
import Profile from './Screens/Profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Screens/Login'
import TopLogo from './components/TopLogo';


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const CategoryStackScreen = () => {
  return(
    <Stack.Navigator initialRouteName="ListCategory">
      <Stack.Screen name="ListCategory" component={ListCategory} options={{ title: 'Danh sách category' }} />
      <Stack.Screen name="DetailCategory" component={DetailCategory} options={{ title: 'Chi tiết danh mục' }} />
    </Stack.Navigator>
  )
}

export default function App () {
  return (
    <>
      <TopLogo />
      <NavigationContainer>
        {/* <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'About') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Category') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        >
          <Tab.Screen name="About" component={About} options={{ tabBarBadge: 3 }} />
          <Tab.Screen name="Category" component={CategoryStackScreen} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator> */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={20} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//     paddingVertical: 50
//   },

//   array1: {
//     padding: 20,
//     marginTop: 40,
//     backgroundColor: 'green',
//     flex: 1,
//   },
//   array2: {
//   },
//   bottom: {
//     flex: 2,
//   }
// })