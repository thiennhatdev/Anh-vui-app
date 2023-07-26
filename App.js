import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native'
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
import { socketIo } from './hooks/socket';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { getNotifications } from './apis/notifications';
import TopHeader from './components/TopHeader';

// startNetworkLogging();

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const queryClient = new QueryClient();

export default function App() {

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient} >
        <TopLogo />
        <TopHeader />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
