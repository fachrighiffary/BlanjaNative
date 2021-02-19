import axios from 'axios'
import { Input } from 'native-base'
import React, {Component, useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'
import {API_URL} from '@env'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'


class GetOtp extends Component{

    constructor(){
        super();
        this.state = {
            otp : '',
            errMsg: ''
        }
    }
    
    
    handleSubmit = () => {
        if(this.state.otp === ''){
            this.setState({
                errMsg: 'The otp code column cannot be empty'
            })
        }else{
            const otp = this.state.otp
            const email = this.props.route.params
            axios.get(`${API_URL}/auth/check-otp/${email}/${otp}`)
            .then((res) => {
                console.log(res)
                this.props.navigation.navigate('resetPassword', email)
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    errMsg: 'Your otp code is wrong'
                })
            })
        }
    }

    render(){
        const {navigation} = this.props
        const {errMsg} = this.state
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
                        <Text>Please, enter your Otp Code. You will receive a otp to create a new password.</Text>
                    </View>
                    <View style={styles.input}>
                        <Input 
                        placeholder='otp code' 
                        name="otp" 
                        onChangeText={(text) => { this.setState({ otp: text }) }} 
                        />
                    </View>
                    <Text style={{marginTop: 10, color: 'red'}}>
                        {errMsg}
                    </Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 22 }}>
                    <TouchableOpacity style={styles.btnLogin} onPress={this.handleSubmit}>
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




export default GetOtp
