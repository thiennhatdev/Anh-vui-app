import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Auth from '../../components/Auth';
import Profile from '../../components/Profile';

const User = () => {
    const [isLogin, setIsLogin] = useState(false);

  return (
    !isLogin
        ? <Auth />
        : <Profile />
  )
}

export default User;