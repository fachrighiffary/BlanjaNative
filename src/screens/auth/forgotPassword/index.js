import axios from 'axios'
import { Input } from 'native-base'
import React, {Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'
import { API_URL } from "@env"


class ForgotPassword extends Component{
    constructor(){
        super();
        this.state = {
            email : '',
            loading: false
        }
    }

    handleSubmit = () => {
        const data = {
            email :  this.state.email
        }
        axios.post(API_URL + '/auth/forgot-password', data)
        .then((res) => {
            console.log(res)
            this.props.navigation.navigate('getOtp', this.state.email)
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const {loading} = this.state
        const {navigation} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Forgot Password</Text>
                </View>
                <View style={styles.containerForm}>
                    <View style={{width: 343}}>
                        <Text>Please, enter your email address. You will receive a link to create a new password via email.</Text>
                    </View>
                    <View style={styles.input}>
                        <Input 
                        placeholder='Email' 
                        name="email" 
                        onChangeText={(text) => { this.setState({ email: text }) }} />
                    </View>
                </View>
                <View style={{alignItems: 'center', marginTop: 32 }}>
                    {!loading ? (
                        <TouchableOpacity style={styles.btnLogin} onPress={() => {
                                this.setState({
                                    loading: true
                                })
                                this.handleSubmit()
                            }}>
                            <Text style={{color: 'white'}}>Send</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.btnLogin}>
                            <ActivityIndicator size="large" color='white' />
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




export default ForgotPassword
