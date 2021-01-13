import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {SuccessLogo} from '../../assets'
const Success = ({navigation}) => {
    return (
        <View>
            <View style={styles.container}>
                <Image source={SuccessLogo} />
                <Text style={{
                    fontSize: 34,
                    fontWeight: 'bold',
                    marginTop: 49
                }}>Success!</Text>
                <Text style={{
                    textAlign: 'center', 
                    width: 248,
                    fontSize: 14
                    }}>Your order will be delivered soon. Thank you for choosing our app!</Text>
            </View>
            <TouchableOpacity onPress={() => {
                navigation.popToTop('HomeScreen')
            }}>
                <View style={styles.btn}>
                    <Text style={{color: 'white'}}>CONTINUE SHOPPING</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 130
        },
    btn : {
        alignItems: 'center', 
        height: 48, 
        width: 343, 
        backgroundColor: '#DB3022', 
        borderRadius: 25, 
        alignSelf: 'center', 
        justifyContent: 'center',
        marginTop: 163
    }
})

export default Success
