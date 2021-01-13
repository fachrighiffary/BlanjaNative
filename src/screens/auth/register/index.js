import axios from 'axios'
import { Input } from 'native-base'
import React, {Component, useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'

class Register extends Component{


    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password:'',
            errorForm: ''
        }
    }

    handleSubmit = () => {
        const data = {
            username: this.state.username,
            email:this.state.email,
            password: this.state.password
        }
        if(this.state.username === '' || this.state.email === '' || this.state.password === '' ){
            this.setState({
                errorForm: 'Semua Kolom harus diisi'
            })
        }else{
            axios
            .post('http://192.168.1.3:8000/auth/register', data)
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
        //console.log(this.state)
        return(
            <View style={styles.container}>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Sign Up</Text>
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
                    <Text style={{color: 'red'}}>{this.state.errorForm}</Text>
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

export default Register
