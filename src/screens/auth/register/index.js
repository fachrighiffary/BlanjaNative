import axios from 'axios'
import { Input,Button } from 'native-base'
import React, {Component, useState} from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'
import {API_URL} from "@env"
 
class Register extends Component{


    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            phone_number: '',
            password:'',
            store_name: '',
            level: '',
            errorForm: '',
            backColorsell: '',
            textColorsell: 'red',
            backColorsCus: '',
            textColorsCus: 'red',
            loading: false
        }
    }

    showToast = () => {
        ToastAndroid.show("Registrasi berhasil, check email anda", ToastAndroid.LONG);
      };
 
    handleSubmit = () => {
        const data = {
            username    : this.state.username,
            email       : this.state.email,
            phone_number: this.state.phone_number,
            store_name  : this.state.store_name,
            store_desc  : '0',
            photo       : '0',
            password    : this.state.password,
            level_id    : this.state.level,
        }
        console.log(data)
        if(this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.level === '' ||  this.state.level_id === '' || this.state.phone_number === ''){
            this.setState({
                errorForm: 'Semua Kolom harus diisi \n Seller / costumer harus dipilih',
                store_name: 'Null',
                loading: false
            })
        }else{
            axios
            .post(API_URL + '/auth/register', data)
            .then((res) => {
                console.log(res)
                this.showToast()
                this.props.navigation.replace('checkOtp', this.state.email)
            })
            .catch(({response}) => {
                console.log(response)
                this.setState({
                    errorForm: 'Email Sudah terdaftar, Gunakan Email Lain',
                    loading: false
                })
            })
        }
    }



    render(){
        let {email, username, password,  store_name, phone_number, loading} = this.state  
        let storeName;
        if(this.state.level == 1){
            storeName = 
            <View style={styles.input}>
                <Input 
                placeholder='Store Name'
                value={store_name} 
                onChangeText={(text) => { this.setState({ store_name: text }) }} 
                />
            </View>
        }
        
        return(
            <ScrollView style={styles.container}>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Sign Up</Text>
                </View>
                <View style={styles.containerRole}>
                    <TouchableOpacity 
                    style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 170,
                            height: 47,
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
                        height: 47,
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
                        placeholder='Name'
                        value={username} 
                        onChangeText={(text) => { this.setState({ username: text }) }} 
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                        placeholder='Phone Number'
                        value={phone_number} 
                        keyboardType='phone-pad'
                        onChangeText={(text) => { this.setState({ phone_number: text }) }} 
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
                    {storeName}
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
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errorForm}</Text>
                </View>
                <View style={{alignItems: 'center' }}>
                    {!loading ? (
                        <TouchableOpacity style={styles.btnLogin}  onPress={() => {
                                this.setState({
                                    loading: true
                                })
                                this.handleSubmit()
                            }}>
                            <Text style={{color: 'white'}}>Sign Up</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.btnLogin}  onPress={this.handleSubmit}>
                            <ActivityIndicator size='large' color='white' />
                        </View>
                    )}
                </View>
            </ScrollView>
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
        marginTop: 12
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        height: 200,
        width: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      closeButton: { 
        backgroundColor: "#DB3022" ,
        height: 40, 
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30
      }


})

export default Register
