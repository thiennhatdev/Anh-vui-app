import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { createContext, useMemo } from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import TopHeader from './components/TopHeader';
import TopLogo from './components/TopLogo';

// startNetworkLogging();

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const queryClient = new QueryClient();

export const AppContext = createContext({
  userAfterLogin: '',
  setUserAfterLogin: () => {},
})

export default function App() {
  const [userInfo, setUserInfo] = useState(false);
  const [userAfterLogin, setUserAfterLogin] = useState(null);
  
  const value = useMemo(
    () => ({ userAfterLogin, setUserAfterLogin }), 
    [userAfterLogin]
  );

  const fetchUserInfo = useCallback(async () => {
    const user = await AsyncStorage.getItem('user_info');
    const parseUser = JSON.parse(user);
    setUserInfo(parseUser);
    setUserAfterLogin(parseUser)
  }, [])

  useEffect(() => {
      fetchUserInfo();
  }, [fetchUserInfo])

  return (
    <AppContext.Provider value={value}>
      {useMemo(() => (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient} >
        <TopLogo />
        <TopHeader />
      </QueryClientProvider>
    </SafeAreaProvider>
    ), [])}
    </AppContext.Provider>
  )
}
