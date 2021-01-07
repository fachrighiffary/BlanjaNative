import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Search } from '../../assets'

export class ShippingAddress extends Component {
    render() {
        return (
            <View style={{padding: 16}}>
                <View style={styles.searchBar}>
                    <Image style={{marginTop: 10}} source={Search} />
                    <TextInput style={{marginLeft: 5}} placeholder="Search" />
                </View>
                <View style={{marginTop: 31}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Shipping Address</Text>
                </View>
                <TouchableOpacity style={styles.cardAddress}> 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Fachri Ghiffary</Text>
                        <TouchableOpacity >
                            <Text style={{color: '#DB3022'}}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 42, width: 235, marginTop: 7}}>
                        <Text>3 Newbridge Court Chino Hills, CA 91709, United States</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAddAddress}>
                    <Text>Add New Address</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar : {
        height: 40, 
        width: 343, 
        borderRadius: 23, 
        backgroundColor: 'white', 
        alignSelf: 'center', 
        paddingLeft: 16,
        flexDirection: 'row'
    },
    cardAddress: {
        height: 108,
        width: 343,
        backgroundColor: 'white',
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 21,
        alignSelf: 'center',
    },
    btnAddAddress : {
        borderWidth: 1,
        borderColor: 'black',
        height: 48,
        width: 343,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

export default ShippingAddress
