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


class Login extends Component{

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            level: '',
            errMsg: '',
            backColorsell: '',
            textColorsell: 'red',
            backColorsCus: '',
            textColorsCus: 'red',
        }
    }

    handleSubmit = () => {
        if(this.state.email === '' || this.state.password === ''){
            this.setState({
                errMsg: 'Email atau password tidak boleh kosong \n Seller / Costumer harus dipilih',
                password: '',
            })
        }else if(this.state.level === ''){
            this.setState({
                errMsg: 'Pilih Role Anda terlebih dahulu',
            })
        }else{
            const data = {
              email : this.state.email,
              password : this.state.password,
              level_id : this.state.level
            };
            axios.post(API_URL + '/auth/login', data)
            .then(async (res) => {
                const dataLogin = {
                    name        :res.data.data.username,
                    email       :res.data.data.email,
                    level       :res.data.data.level,
                    id          :res.data.data.id,
                    store_name  : res.data.data.store_name,
                    token       :res.data.data.token
                }
                console.log(dataLogin)
                this.props.dispatch(setLoginTrue(dataLogin))
                this.props.navigation.replace('HomeScreen')
            })
            .catch((err) => {
                this.setState({
                    errMsg : 'Email / password Salah'
                })
            })
        }
    }

    render() {
        // console.log(this.state.level)
        return(
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity onPress={ () => {
                    this.props.navigation.navigate('Register');
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Login</Text>
                </View>
                <View style={styles.containerRole}>
                    <TouchableOpacity 
                    style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 170,
                            height: 48,
                            backgroundColor:this.state.backColorsCus,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10
                        }} 
                    onPress={() => {
                        this.setState({
                            level: 2,
                            backColorsCus: 'red',
                            textColorsCus:'white',
                            textColorsell: 'red',
                            backColorsell: 'white'
                            
                        })
                    }}>
                        <Text style={{color: this.state.textColorsCus}}>Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 170,
                        height: 48,
                        backgroundColor:this.state.backColorsell,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                    }}
                    onPress={() => {
                        this.setState({
                            level: 1,
                            textColorsell: 'white',
                            backColorsell: 'red',
                            backColorsCus: 'white',
                            textColorsCus:'red'
                        })
                    }}
                    >
                        <Text style={{color: this.state.textColorsell}}>Seller</Text>
                    </TouchableOpacity>
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
                            value={this.state.password}
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
                        <TouchableOpacity style={{alignSelf: 'center', marginTop: 10}} onPress={ () => {
                            this.props.navigation.navigate('Register');
                            }}>
                            <Text>Dont have Account, Click Here to Register!</Text>
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
        marginTop: 10
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
    containerRole: {
        height:50, 
        width: 343, 
        backgroundColor: 'white', 
        alignSelf: 'center', 
        borderRadius: 10, 
        marginTop: 54,
        borderWidth: 1,
        borderColor: '#DB3022',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}
export default connect(mapStateToProps)(Login)



