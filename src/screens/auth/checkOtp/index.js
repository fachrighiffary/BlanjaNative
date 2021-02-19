import axios from 'axios'
import { Input } from 'native-base'
import React, {Component, useState} from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'
import {API_URL} from '@env'

class CheckOtp extends Component{
    constructor(){
        super();
        this.state = {
            otp: '',
            errMsg : ''
        }
    }
    showToast = () => {
        ToastAndroid.show("Akun anda berhasil diaktivasi", ToastAndroid.SHORT);
      };

    handleActivate = () => {
        const otp = this.state.otp;
        const email = this.props.route.params
        if(this.state.otp === ''){
           this.setState({
               errMsg: 'kode ote tidak boleh kosong'
           })
        }else{
            axios.get(`${API_URL}/auth/activate/${email}/${otp}`)
            .then((res) => {
                this.showToast();
                this.props.navigation.replace('Login')
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    errMsg: 'Code Otp anda salah'
                })
            })
        }
    }

    render(){
        const {errMsg} = this.state
        const {navigation} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Input Your OTP</Text>
                </View>
                <View style={styles.containerForm}>
                    <View style={{width: 343}}>
                        <Text>Please, enter your Otp Code. to activate your account.</Text>
                    </View>
                    <View style={styles.input}>
                        <Input 
                        placeholder='otp'
                         type="text" 
                         name="otp" 
                         onChangeText={(text) => { this.setState({ otp: text }) }} />
                    </View>
                    <Text style={{marginTop: 10, color: 'red'}}>{errMsg}</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 32 }}>
                    <TouchableOpacity style={styles.btnLogin} onPress={this.handleActivate}>
                        <Text style={{color: 'white'}}>Send</Text>
                    </TouchableOpacity>
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




export default CheckOtp
