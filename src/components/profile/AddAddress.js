import { Input } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export class AddAddress extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.card}>
                    <Text style={{fontSize: 11, color: '#187465'}}>Save address as (ex : home address, office address)</Text>
                    <View style={{marginTop: 4, height: 40}}>
                        <Input style={{fontSize: 11, borderBottomWidth: 2, borderColor: '#187465', color:'#187465'}} placeholder="Name"/>
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>Recipient’s name</Text>
                    <View style={{ height: 40}}>
                        <Input style={{fontSize: 11, borderBottomWidth: 2, borderColor: '#187465'}} placeholder="Harry Potter"/>
                    </View>
                </View>


                <View style={styles.cardAddress}>
                    <Text style={{fontSize: 10, color: '#9B9B9B', }}>Address</Text>
                    <View style={{ height: 40}}>
                        <Input style={{fontSize: 11, borderBottomWidth: 2, borderColor: '#187465'}} placeholder="Address"/>
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>City or Subdistrict</Text>
                    <View style={{ height: 40}}>
                        <Input style={{fontSize: 11, borderBottomWidth: 2, borderColor: '#187465'}} placeholder="City or Subdistrict"/>
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>Postal code</Text>
                    <View style={{ height: 40}}>
                        <Input style={{fontSize: 11, borderBottomWidth: 2, borderColor: '#187465'}} keyboardType='number-pad' placeholder="Postal cod"/>
                    </View>

                </View>
                <View style={styles.cardNoPhone}>
                    <Text style={{fontSize: 10, color: '#9B9B9B', }}>recipient's telephone number</Text>
                    <View style={{ height: 40}}>
                        <Input style={{fontSize: 11, borderBottomWidth: 2, borderColor: '#187465'}} keyboardType='number-pad' placeholder="telephone number"/>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color:'white', fontWeight: 'bold'}}>Save Address</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        height: 160,
        width: 343,
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 31,
        padding: 14
    },
    cardAddress : {
        height: 220,
        width: 343,
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 10,
        padding: 14
    },
    cardNoPhone: {
        height: 90,
        width: 343,
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 10,
        padding: 14
    },
    line: {
        borderWidth : 2,
        borderColor: '#187465'
    },
    btn : {
        height: 48,
        width: 343,
        backgroundColor: '#DB3022',
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AddAddress
