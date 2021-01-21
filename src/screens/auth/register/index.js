import axios from 'axios'
import { Input } from 'native-base'
import React, {Component, useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'
import {API_URL} from "@env"
 
class Register extends Component{


    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password:'',
            level: '',
            errorForm: '',
            backColorsell: '',
            textColorsell: 'white',
            backColorsCus: '',
            textColorsCus: 'white',
        }
    }

    handleSubmit = () => {
        const data = {
            username: this.state.username,
            email:this.state.email,
            password: this.state.password,
            level_id: this.state.level
        }
        if(this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.level === ''){
            this.setState({
                errorForm: 'Semua Kolom harus diisi \n Seller / costumer harus dipilih'
            })
        }else{
            axios
            .post(API_URL + '/auth/register', data)
            .then((data) => {
                alert(data.data.data.msg)
                this.props.navigation.replace('Login')
            })
            .catch((err) => {
                this.setState({
                    errorForm: 'Email Sudah terdaftar, Gunakan Email Lain'
                })
            })
        }
    }



    render(){
        let {email, username, password} = this.state        
        return(
            <View style={styles.container}>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Sign Up</Text>
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
                        placeholder='Name'
                        value={username} 
                        onChangeText={(text) => { this.setState({ username: text }) }} 
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                        placeholder='Email' 
                        name="email" 
                        value={email} 
                        onChangeText={(text) => { this.setState({ email: text }) }} 
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                        secureTextEntry={true} 
                        placeholder='Password'
                        value={password} 
                        onChangeText={(text) => { this.setState({ password: text }) }} 
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, marginRight: 10}}>
                    <Text style={{fontSize: 14}}>Already have an account?</Text>
                    <TouchableOpacity style={{marginLeft:7}} onPress={() => {
                        this.props.navigation.replace('Login')
                    }}>
                        <Image source={IconNext} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errorForm}</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 32 }}>
                    <TouchableOpacity style={styles.btnLogin} onPress={this.handleSubmit}>
                        <Text style={{color: 'white'}}>Sign Up</Text>
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

export default Register
