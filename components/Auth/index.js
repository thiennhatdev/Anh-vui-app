import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style'
import { loginGoogle } from '../../apis/auth';

import NetworkLogger from 'react-native-network-logger';

let Auth = (props) => {
  const { navigation } = props;
  const [ isSigninInProgress, setIsSigninInProgress ] = useState(false);

  const _signIn = async () => {
    try {
      // const data = await GoogleSignin.signOut();
      // console.log(data, 'data signout')

      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      console.log(accessToken, 'accessToken in login')
      const { jwt, user } = await loginGoogle(accessToken);
      await AsyncStorage.setItem('user_info', JSON.stringify(user));
      await AsyncStorage.setItem('token', jwt);
      console.log('end AsyncStorage')
      navigation.goBack();
      // const { id } = user;
      // console.log(jwt, user, 'user = jwt')
      

    //   this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error, error.code, 'error......')
    }
  };

  

    useEffect(() => {
        GoogleSignin.configure({
            // scopes: ['email', 'profile','https://www.googleapis.com/auth/drive.readonly'], 
            webClientId: '519004758708-jas2cd85cuav7u4hvc16f6b20pqhfj33.apps.googleusercontent.com', 
            offlineAccess: true, 
            
            });
    }, [])

  return (
    <View style={styles.wrapAuth}>
      <Text style={styles.loginText}>Đăng nhập nhanh để chia sẽ những bức ảnh hài hước </Text>
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_signIn}
            disabled={isSigninInProgress}
        />
    </View>
  )
}

// Auth = () => <NetworkLogger />;

export default Auth;