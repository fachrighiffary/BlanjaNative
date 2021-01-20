import axios from 'axios'
import { Input } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'



export class EditAddress extends Component {

    constructor(){
        super();
        this.state = {
            id : '',
            address : '',
            name: '',
            city: '',
            address_dtl: '',
            post_code: '',
            phone_number: '',
        }
    }
    getAddressId = async() => {
        const id = this.props.route.params
        console.log(id)

        const config = {
            headers: {
              'x-access-token': 'Bearer ' + (await AsyncStorage.getItem('token')),
            },
        };
        axios
        .get(API_URL + '/address/detail/' + id, config)
        .then((data) => {
            this.setState({
                id : data.data.data[0].id,
                address : data.data.data[0].address,
                name: data.data.data[0].name,
                city: data.data.data[0].city,
                address_dtl: data.data.data[0].address_dtl,
                post_code: data.data.data[0].post_code,
                phone_number: data.data.data[0].phone_number
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleSubmit = async() => {
        const id = this.state.id
        const data = {
            user_id :  await AsyncStorage.getItem('userid'),
            address : this.state.address,
            name: this.state.name,
            city: this.state.city,
            address_dtl: this.state.address_dtl,
            post_code: this.state.post_code,
            phone_number: this.state.phone_number
        }
        const config = {
            headers: {
              'x-access-token': 'Bearer ' + (await AsyncStorage.getItem('token')),
            },
        };

        axios
        .put(API_URL + '/address/' + id, data, config )
        .then((data) => {
            console.log(data)
            this.props.navigation.push('ShippingAddress')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getAddressId();
    }




    render() {
        console.log(API_URL)
        const {id, address, name, city, address_dtl, post_code, phone_number} = this.state
        console.log(this.state)
        return (
            <ScrollView>
                <View style={styles.card}>
                    <Text style={{fontSize: 11, color: '#187465'}}>Save address as (ex : home address, office address)</Text>
                    <View style={{marginTop: 4, height: 40}}>
                        <Input 
                        style={styles.txtInpt} 
                        placeholder={address}
                        name="address"
                        value={address}
                        onChangeText={(text) => { this.setState({ address: text }) }}
                        />
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>Recipient’s name</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.txtInpt} 
                        placeholder={name}
                        name="name"
                        value={name}
                        onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>
                </View>


                <View style={styles.cardAddress}>
                    <Text style={{fontSize: 10, color: '#9B9B9B', }}>Address</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.txtInpt} 
                        placeholder={address_dtl}
                        name="address_dtl"
                        value={address_dtl}
                        onChangeText={(text) => { this.setState({ address_dtl: text }) }}
                        />
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>City or Subdistrict</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.txtInpt} 
                        placeholder={city}
                        name="city"
                        value={city}
                        onChangeText={(text) => { this.setState({ city: text }) }}                        
                        />
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>Postal code</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.txtInpt} 
                        keyboardType='number-pad' 
                        placeholder={post_code} 
                        name="post_code"
                        value={post_code}
                        onChangeText={(text) => { this.setState({ post_code: text }) }}   
                        />
                    </View>

                </View>
                <View style={styles.cardNoPhone}>
                    <Text style={{fontSize: 10, color: '#9B9B9B', }}>recipient's telephone number</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.txtInpt} 
                        keyboardType='number-pad' 
                        placeholder={phone_number}
                        name="phone_number"
                        value={phone_number}
                        onChangeText={(text) => { this.setState({ phone_number: text }) }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
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
    },
    txtInpt : {
        fontSize: 11, 
        borderBottomWidth: 2, 
        borderColor: '#187465'
    }
})

export default EditAddress
