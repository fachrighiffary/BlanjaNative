import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Input } from 'native-base'
import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'


const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const userid = await AsyncStorage.getItem('userid');
      const username = await AsyncStorage.getItem('username');
      if (value !== null) {
        // value previously stored
        console.log(value);
        console.log(userid);
        console.log(username)
      }
    } catch (e) {
      // error reading value
    }
  };

const Login = ({navigation}) => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = () => {
        const data = {
          email,
          password
        };
        //console.log(data)
        axios.post('http://192.168.1.3:8000/auth/login', data)
        .then(async (res) => {
            console.log(res.data.data)
            const token = res.data.data.token;
            const username = res.data.data.username
            const id = res.data.data.id;
            const userid = id.toString();
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userid', userid);
            await AsyncStorage.setItem('username', username);

            navigation.replace('HomeScreen')
            //console.log(token);
            await getData();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity onPress={ () => {
                    navigation.goBack();
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Login</Text>
                </View>
                <View style={styles.containerForm}>
                    <View style={styles.input}>
                        <Input 
                            placeholder='Email'
                            name="email" 
                            value={email} onChangeText={(email) => setemail(email)}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                            placeholder='Password' 
                            secureTextEntry={true}
                            value={password} 
                            name="password" 
                            onChangeText={(password) => setpassword(password)} 
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, marginRight: 10}}>
                    <Text style={{fontSize: 14}}>Forgot your password?</Text>
                    <TouchableOpacity style={{marginLeft:7}} onPress={() => {
                        navigation.navigate('ForgotPassword')
                    }}>
                        <Image source={IconNext} />
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginTop: 32 }}>
                    <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
                        <Text style={{color: 'white'}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 15,
        paddingTop: 25
    },
    containerForm: {
        alignItems: 'center',
        marginTop: 65
    },
    rowTitle : {
        marginTop: 34
    },
    textTitle : {
        fontSize: 34,
        fontWeight: 'bold'
    },
    input : {
        height: 64,
        width: 343,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: 'black',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 8,
    },
    btnLogin: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
            height: 48,
        width: 343, 
        backgroundColor: '#DB3022',
        borderRadius: 25,
        marginTop: 32
    },


})

export default Login
