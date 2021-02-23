import { Input } from 'native-base'
import React, {Component, useState} from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'
import {API_URL} from '@env'
import axios from 'axios'


class ResetPassword extends Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password: '',
            newPassword : '',
            errMsg: '',
            loading: false
        }
    }

    submitReset = () => {
        if(this.state.password === '' || this.state.newPassword === ''){
            this.setState({
                errMsg : 'All fields must be filled in',
                loading: false
            })
        }else if(this.state.password !== this.state.newPassword){
            this.setState({
                errMsg : 'Password must be same',
                loading: false
            })
        }else{
            const data = {
                email : this.props.route.params,
                newPassword : this.state.newPassword
            }
            axios.patch(`${API_URL}/auth/reset-password`, data)
            .then((res) => {
                console.log(res)
                this.props.navigation.replace('Login')
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log(err)
            })
        }
    }

    render(){
        const {errMsg, loading} = this.state
        const {navigation} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Reset Password</Text>
                </View>
                <View style={styles.containerForm}>
                    <View style={styles.input}>
                        <Input 
                            placeholder='Password' 
                            type="text" 
                            secureTextEntry={true} 
                            name="password" 
                            onChangeText={(text) => { this.setState({ password: text }) }} 
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                            placeholder='Retype Password' 
                            type="text" 
                            secureTextEntry={true} 
                            name="newPassword"
                            onChangeText={(text) => { this.setState({ newPassword: text }) }} 
                            
                        />
                    </View>
                    <Text style={{marginTop: 45,color: 'red' }}>{errMsg}</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 12 }}>
                    {!loading ? (
                        <TouchableOpacity style={styles.btnLogin} onPress={() => {
                            this.setState({
                                loading: true
                            })
                            this.submitReset()
                        }}>
                            <Text style={{color: 'white'}}>Send</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.btnLogin} >
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}
                </View>
            </View>
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
        marginTop: 16,
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




export default ResetPassword
