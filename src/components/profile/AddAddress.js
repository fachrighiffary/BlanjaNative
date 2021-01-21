import { API_URL } from '@env';
import axios from 'axios';
import { Input } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';


export class AddAddress extends Component {

    constructor(){
        super();
        this.state = {
            address: '',
            name: '',
            address_dtl: '',
            city: '',
            post_code:'',
            phone_number: '',
            errMsg : ''
        }
    }

    handleSubmit = () => {
        const {address, name, address_dtl , city, post_code, phone_number} = this.state
        
        if(address === '' || name === '' || address_dtl === '' || city === '' ||  post_code === '' || phone_number === ''){
            this.setState({
                errMsg: 'Data Harus Diisi Semua'
            })
            alert('Semua Data Harus Di isi')
        }else{
            const data = {
                user_id : this.props.auth.id,
                address: address,
                name: name,
                address_dtl: address_dtl,
                city: city,
                post_code: post_code,
                phone_number: phone_number
            }
            const config = {
                headers: {
                  'x-access-token': 'Bearer ' + this.props.auth.token,
                },
              };
            axios
            .post(API_URL + '/address', data, config)
            .then((data) => {
                console.log(data)
                this.props.navigation.push('ShippingAddress')
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    }


    render() {
        // console.log(API_URL)
        console.log(this.state)
        return (
            <ScrollView>
                <View style={styles.card}>
                    <Text style={{fontSize: 11, color: '#187465'}}>Save address as (ex : home address, office address)</Text>
                    <View style={{marginTop: 4, height: 40}}>
                        <Input 
                        style={styles.inpt} 
                        placeholder="Home"
                        name="address"
                        onChangeText={(text) => { this.setState({ address: text }) }} 
                        />
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>Recipient’s name</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.inpt} 
                        placeholder="Name"
                        name="name"
                        onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>
                </View>


                <View style={styles.cardAddress}>
                    <Text style={{fontSize: 10, color: '#9B9B9B', }}>Address</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.inpt} 
                        placeholder="Address"
                        name="address_dtl"
                        onChangeText={(text) => { this.setState({ address_dtl: text }) }}
                        />
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>City or Subdistrict</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.inpt} 
                        placeholder="City or Subdistrict"
                        name="city"
                        onChangeText={(text) => { this.setState({ city: text }) }}
                        />
                    </View>
                    <Text style={{fontSize: 10, color: '#9B9B9B', marginTop: 10 }}>Postal code</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.inpt} 
                        keyboardType='number-pad' 
                        placeholder="Postal code"
                        name="post_code"
                        onChangeText={(text) => { this.setState({ post_code: text }) }}
                        />
                    </View>

                </View>
                <View style={styles.cardNoPhone}>
                    <Text style={{fontSize: 10, color: '#9B9B9B', }}>recipient's telephone number</Text>
                    <View style={{ height: 40}}>
                        <Input 
                        style={styles.inpt} 
                        keyboardType='number-pad'
                        placeholder="telephone number"
                        name="phone_number"
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
    inpt: {
        fontSize: 11, 
        borderBottomWidth: 2, 
        borderColor: '#187465'
    }

})


const mapStateToProps = ({auth}) => {
    return (
        auth
    )
}

export default connect(mapStateToProps)(AddAddress) 
