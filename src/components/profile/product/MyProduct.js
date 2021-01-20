import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Product4, Search } from '../../../assets'
import RatingProduct from '../../product/rating'
import {API_URL} from "@env"

export class MyProduct extends Component {

    constructor(){
        super();
        this.state = {
            products : [],
            errMsg : ''
        }
    }

    getData = async() => {
        const id = await AsyncStorage.getItem('userid')
        const config = {
            headers: {
              'x-access-token': 'Bearer ' + (await AsyncStorage.getItem('token')),
            },
          };
        axios
        .get(API_URL + '/products/' + id,  config)
        .then((data) => {
            //console.log(data.data.data)
            this.setState({
                products : data.data.data,
                errMsg: data.data.msg
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }


    componentDidMount = () => {
        this.getData()
    }



    render() {
        const {products, errMsg} = this.state
        return (
            <View style={{padding: 14}}>
                <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 24}}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Search} />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 23,}}>
                    <Text style={{fontSize: 34, fontWeight: 'bold'}}>My Product</Text>
                </View>
                
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>{errMsg}</Text>
                </View>
                <ScrollView style={styles.containerProduct}>
                    {products && products.map(({id, product_name, product_price, product_img}, index) => {
                        let httpImage = { uri : API_URL + product_img.split(',')[0]}
                        return (
                            <TouchableOpacity activeOpacity={0.6} key={index}  style={styles.card}>
                                <Image style={styles.img} source={httpImage} />
                                <View style={{marginLeft: 11, paddingTop: 11}}>
                                    <Text>{product_name}</Text>
                                    <Text style={{marginTop: 20}}>Rp. {product_price}</Text>
                                </View>
                                <View style={{marginLeft: 90, marginTop: 20}}>
                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditProduct')}}>
                                        <Text style={{fontSize: 16}}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {alert('Delete bosku')}}>
                                        <Text  style={{fontSize: 16, color: 'red'}}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button}
                onPress={() => {
                    this.props.navigation.navigate('AddProduct')
                }}
                >
                    <Text style={{color: 'white'}}>Add New Product</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerCard : {
        alignItems: 'center', 
        marginTop: 24
    },
    card: {
        height: 164, 
        width: 343, 
        backgroundColor: 'white', 
        borderRadius: 8,
        position: 'relative',
        padding: 19
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    img : {
        height: 104, 
        width: 104,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
    card : {
        height: 104, 
        width: 343,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 30,
        alignSelf: 'center',
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        flexDirection: 'row'
    },
    button: {
        height: 50,
        width: 232,
        backgroundColor: '#DB3022',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 30
    },
    containerProduct: {
        width: '100%', 
        height: 400, 
        marginBottom: 20}
})

export default MyProduct
