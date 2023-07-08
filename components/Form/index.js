import { View, Text, TextInput, KeyboardAvoidingView, Button, Keyboard } from 'react-native'
import React, { useState } from 'react'
import styles from './style';

const Form = () => {
    const [user, setUser] = useState('');

    const addUser = () => {
        setUser('');
        Keyboard.dismiss();
    }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <TextInput value={user} style={styles.input} placeholder='text input' onChangeText={(text) => setUser(text)}></TextInput>
        <Button onPress={addUser} title="thêm" />
    </KeyboardAvoidingView>
  )
}

export default Form;