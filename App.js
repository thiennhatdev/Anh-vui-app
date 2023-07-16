import 'react-native-gesture-handler';
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
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import Login from './Screens/Login'
import TopLogo from './components/TopLogo';
import Icon from 'react-native-vector-icons/FontAwesome';
import variables from './constants/variables';
import ProfileDetail from './components/ProfileDetail';
import color from './commons/variable/color';

// startNetworkLogging();

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

// const CategoryStackScreen = () => {
//   return(
//     <Stack.Navigator initialRouteName="ListCategory">
//       <Stack.Screen name="ListCategory" component={ListCategory} options={{ title: 'Danh sách category' }} />
//       <Stack.Screen name="ListCategory" component={DetailCategory} options={{ title: 'Chi tiết danh mục' }} />
//     </Stack.Navigator>
//   )
// }

const queryClient = new QueryClient();

export default function App () {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <QueryClientProvider client={queryClient}>
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

              return <Icon name={iconName} size={20} color={focused ? color.blue : 'gray'} />;
            },
            // tabBarActiveTintColor: 'tomato',
            // tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name={variables.Home} component={Home} />
          <Tab.Screen name={variables.Notification} component={Notification} />
          <Tab.Screen name={variables.User} component={User} />
          {/* <Tab.Screen name={variables.ProfileDetail} component={ProfileDetail} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
    </SafeAreaProvider>
  )
}
