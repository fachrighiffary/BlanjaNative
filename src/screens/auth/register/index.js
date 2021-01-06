import { Input } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'

const Register = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowTitle}>
                <Text style={styles.textTitle}>Sign Up</Text>
            </View>
            <View style={styles.containerForm}>
                <View style={styles.input}>
                    <Input placeholder='Name' />
                </View>
                <View style={styles.input}>
                    <Input placeholder='Email' />
                </View>
                <View style={styles.input}>
                    <Input placeholder='Password' type="password" />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, marginRight: 10}}>
                <Text style={{fontSize: 14}}>Already have an account?</Text>
                <TouchableOpacity style={{marginLeft:7}} onPress={() => {
                    navigation.navigate('Login')
                }}>
                    <Image source={IconNext} />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 32 }}>
                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={{color: 'white'}}>Sign Up</Text>
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
