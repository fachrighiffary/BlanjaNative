import { Input } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack } from '../../../assets'

const Login = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image source={IconBack} />
            </TouchableOpacity>
            <View style={styles.rowTitle}>
                <Text style={styles.textTitle}>Login</Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 73}}>
                <View style={styles.input}>
                    <Input placeholder='Email' />
                </View>
                <View style={styles.input}>
                    <Input placeholder='Password' type="password" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 15,
        paddingTop: 25
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
        paddingHorizontal: 15
    }


})

export default Login
