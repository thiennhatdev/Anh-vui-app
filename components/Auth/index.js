import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

const Auth = () => {
  const [ isSigninInProgress, setIsSigninInProgress ] = useState(false);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'userInfo')
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
    <View>

        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_signIn}
            disabled={isSigninInProgress}
        />
    </View>
  )
}

export default Auth;