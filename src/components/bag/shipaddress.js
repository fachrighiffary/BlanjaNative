import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Search } from '../../assets'
import {API_URL} from "@env"
import { connect } from 'react-redux'
import {setAddress} from '../../public/redux/ActionCreators/Address'

export class ShippingAddress extends Component {

    constructor(props){
        super(props);
        this.state = {
            address : [],
            selectedAddress: null,
            color: false
        }
    }
    showToast = () => {
        ToastAndroid.show("Address Selected", ToastAndroid.SHORT);
      };
    showToastalert = () => {
        ToastAndroid.show("Select address first", ToastAndroid.SHORT);
      };

    getAddress = () => {
        const id = this.props.auth.id
        //console.log(id)
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
            },
        };
        axios
        .get(API_URL + '/address/' + id, config)
        .then((data) => {
            console.log(data.data.data)
            this.setState({
                address: data.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount =() => {
        this.getAddress()
    }

    goToEditAddres = (id) => {
        this.props.navigation.navigate('EditAddress', id)
    }
    
    handleDelete = (id) => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
            },
        };
        axios
        .delete(API_URL + '/address/' + id, config)
        .then((data) => {
            console.log(data)
            this.getAddress()
        })
        .catch((err) => {
            console.log(err)
        })
    }


    setAddress = (id) => {
        this.setState({
            color: !this.state.color,
            selectedAddress: id
        })
    }

    setActiveAddress = () => {
        if(this.state.selectedAddress === null){
            this.showToastalert()
        }else{
            this.props.dispatch(setAddress(this.state.selectedAddress))
            this.props.navigation.push('Checkout')
            this.showToast()
            
        }
    }


    render() {
        const {address} = this.state
        return (
            <ScrollView style={{padding: 16}}>
                <View style={styles.searchBar}>
                    <Image style={{marginTop: 10}} source={Search} />
                    <TextInput style={{marginLeft: 5}} placeholder="Search" />
                </View>
                <View style={{marginTop: 31}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Shipping Address</Text>
                </View>
                {address && address.map(({id, name, address, address_dtl, city, post_code, phone_number}, index) => {
                    const colorSelected = id == this.state.selectedAddress ? true : false 
                    return (
                        <TouchableOpacity 
                        style={{...styles.cardAddress, backgroundColor:colorSelected ? 'lightgrey' : 'white' }} 
                        key={index} 
                        onPress={() => {this.setAddress(id)}}> 
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>{name}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.goToEditAddres(id)
                                    }}>
                                        <Text style={{color: '#DB3022'}}>Change</Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{minHeight: 42, marginTop: 7, justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{width: 250}}>
                                    <Text>{address_dtl}</Text>
                                    <Text>{address}</Text>
                                </View>
                                <View>
                                <TouchableOpacity onPress={() => {
                                    this.handleDelete(id)
                                }}>
                                        <Text style={{color: '#DB3022'}}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity style={styles.btnAddAddress} onPress={this.setActiveAddress}>
                    <Text>Set Addres</Text>
                </TouchableOpacity>
            </ScrollView>
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
        alignItems: 'center',
    }
})


const mapStateToProps = ({auth, address}) => {
    return {
        auth,
        address
    }
}


export default connect(mapStateToProps)(ShippingAddress) 
