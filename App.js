import React from 'react';
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
import Home from './Screens/Home';
import User from './Screens/User';
import Notification from './Screens/Notification';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Screens/Login'
import TopLogo from './components/TopLogo';
import Icon from 'react-native-vector-icons/FontAwesome';
import variables from './constants/variables';


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

              switch (route.name) {
                case "Home":
                  iconName = 'home';
                  break;
                case "Notification":
                  iconName = 'bell';
                  break;
                case "Profile":
                  iconName = 'user';
                  break;
                default:
                  break;
              }

              return <Icon name={iconName} size={20} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name={variables.Home} component={Home} />
          <Tab.Screen name={variables.Notification} component={Notification} />
          <Tab.Screen name={variables.User} component={User} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}