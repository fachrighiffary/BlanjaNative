import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Input } from 'native-base'
import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { IconBack, IconNext } from '../../../assets'
import { setLoginTrue } from '../../../public/redux/ActionCreators/Auth'
import { API_URL } from "@env"

// const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('token');
//       const userid = await AsyncStorage.getItem('userid');
//       const username = await AsyncStorage.getItem('username');
//       if (value !== null) {
//         // value previously stored
//         console.log(value);
//         console.log(userid);
//         console.log(username)
//       }
//     } catch (e) {
//       // error reading value
//     }
//   };

class Login extends Component{

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            level: '',
            errMsg: '',
            backColorsell: '',
            textColorsell: 'white',
            backColorsCus: '',
            textColorsCus: 'white',
        }
    }

    handleSubmit = () => {
        if(this.state.email === '' || this.state.password === '' || this.state.level === ''){
            this.setState({
                errMsg: 'Email atau password tidak boleh kosong \n Seller / Costumer harus dipilih'
            })
        }else{
            const data = {
              email : this.state.email,
              password : this.state.password,
              level_id : this.state.level
            };
            //console.log(data)
            axios.post(API_URL + '/auth/login', data)
            .then(async (res) => {
                // console.log(res.data.data)
                // const token = res.data.data.token;
                // const username = res.data.data.username
                // const id = res.data.data.id;
                // const userid = id.toString();
                // await AsyncStorage.setItem('token', token);
                // await AsyncStorage.setItem('userid', userid);
                // await AsyncStorage.setItem('username', username);
                const dataLogin = {
                    name:res.data.data.username,
                    email:res.data.data.email,
                    level:res.data.data.level,
                    id:res.data.data.id,
                    token:res.data.data.token
                }
                console.log(dataLogin)
                this.props.dispatch(setLoginTrue(dataLogin))
                this.props.navigation.replace('HomeScreen')
                //console.log(token);
                // await getData();
            })
            .catch((err) => {
                this.setState({
                    errMsg : 'Email / password Salah'
                })
            })
        }
    }

    render() {
        console.log(this.state.level)
        return(
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity onPress={ () => {
                    this.props.navigation.navigate('Register');
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Login</Text>
                    <View style={{height:70, width: 100, backgroundColor:'red', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10}}>
                        <TouchableOpacity style={{backgroundColor:this.state.backColorsCus, height: 35, width: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                            this.setState({
                                level: 2,
                                backColorsCus: 'white',
                                textColorsCus:'red',
                                textColorsell: 'white',
                                backColorsell: 'red'
                               
                            })
                        }}>
                            <Text  style={{color: this.state.textColorsCus}}>Customer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:this.state.backColorsell, height: 35, width: 100, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                            this.setState({
                                level: 1,
                                textColorsell: 'red',
                                backColorsell: 'white',
                                backColorsCus: 'red',
                                textColorsCus:'white'
                            })
                        }}>
                            <Text style={{color: this.state.textColorsell}}>Seller</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerForm}>
                    <View style={styles.input}>
                        <Input 
                            placeholder='Email'
                            name="email" 
                            onChangeText={(text) => { this.setState({ email: text }) }} 
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                            placeholder='Password' 
                            secureTextEntry={true}
                            name="password" 
                            onChangeText={(text) => { this.setState({ password: text }) }} 
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, marginRight: 10}}>
                    <Text style={{fontSize: 14}}>Forgot your password?</Text>
                    <TouchableOpacity style={{marginLeft:7}} onPress={() => {
                        this.props.navigation.navigate('ForgotPassword')
                    }}>
                        <Image source={IconNext} />
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginTop: 32 }}>
                    <View>
                        <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errMsg}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnLogin} onPress={this.handleSubmit}>
                            <Text style={{color: 'white'}}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
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
        marginTop: 34,
        flexDirection: 'row',
        justifyContent: 'space-between'
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

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}
export default connect(mapStateToProps)(Login)





