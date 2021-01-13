import { Input } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'


const ForgotPassword = ({navigation}) => {
    return (
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
                    <Input placeholder='Email' type="email" />
                </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 32 }}>
                <TouchableOpacity style={styles.btnLogin} onPress={() => {
                    navigation.navigate('Login')
                }}>
                    <Text style={{color: 'white'}}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
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