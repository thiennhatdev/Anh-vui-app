import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style'
import { loginGoogle } from '../../apis/auth';

import NetworkLogger from 'react-native-network-logger';
import { updateProfile } from '../../apis/user';

let Auth = (props) => {
  const { navigation } = props;
  const [ isSigninInProgress, setIsSigninInProgress ] = useState(false);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      const { jwt, user } = await loginGoogle(accessToken);
      console.log(jwt, 'jwt')
      await AsyncStorage.setItem('user_info', JSON.stringify(user));
      await AsyncStorage.setItem('token', jwt);
      const { user: { photo, name } } = data;

      const res = await updateProfile({
        photo,
        username: name
      },
      )
      
      navigation.goBack();
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

      Alert.alert(
        'Lỗi',
        error?.message,
        [
          {
            text: 'Cancel',
            // onPress: () => Alert.alert('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          // onDismiss: () =>
          //   Alert.alert(
          //     'This alert was dismissed by tapping outside of the alert dialog.',
          //   ),
        },
      );
    }
  };

  

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email', 'profile'], 
            webClientId: '519004758708-jas2cd85cuav7u4hvc16f6b20pqhfj33.apps.googleusercontent.com', 
            offlineAccess: true, 
            
            });
    }, [])

  return (
    <View style={styles.wrapAuth}>
      <Text style={styles.loginText}>Đăng nhập nhanh</Text>
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