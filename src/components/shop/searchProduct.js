import axios from 'axios'
import { Input } from 'native-base'
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack,Product5, Search } from '../../assets'
import RatingProduct from '../product/rating'
import {API_URL} from "@env"

export class SearchProduct extends Component {

    constructor(){
        super();
        this.state = {
            search: '',
            msg: '',
            products:[]
        }
    }


    getData = () => {
        const key = this.state.search
        axios
        .get(API_URL + '/search?key=' + key )
        .then((data) => {
            console.log(data)
            this.setState({
                products: data.data.data,
                msg: data.data.msg
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount =() => {
        this.getData()
    }

    render() {
        console.log(API_URL)
        const {products, msg } = this.state
        return (
            <>
                <View style={{padding: 16, flexDirection: 'row', paddingTop :20, justifyContent: 'space-between', justifyContent: 'center', alignItems :'center'}}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <View style={styles.input}>
                        <TouchableOpacity onPress={this.getData}>
                            <Image source={Search} />
                        </TouchableOpacity>
                        <Input 
                        style={{marginLeft: 8}} 
                        placeholder="Search"
                        name="search"
                        onChangeText={(text) => { this.setState({ search: text }) }}
                        />
                    </View>
                </View>
                <ScrollView style={{marginTop: 18, marginBottom: 18}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>{msg}</Text>
                    </View>
                    {products && products.map(({id, product_name, store_name, total_rating, product_price, product_img}, index) => {
                        let httpImage = { uri : API_URL + product_img.split(',')[0]}
                        return (
                        <TouchableOpacity style={styles.card} key={index} onPress={() => {
                            this.goToDetail(id)
                        }}>
                            <Image style={styles.img} source={httpImage} />
                            <View style={{marginLeft: 11, paddingTop: 11}}>
                                <Text>{product_name}</Text>
                                <Text>{store_name}</Text>
                                <RatingProduct total_rating={Math.round(total_rating)}/>
                                <Text>Rp. {product_price}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    input : {
        height: 40,
        width: 311,
        backgroundColor: 'white',
        borderRadius: 23,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16
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
    }
})

export default SearchProduct
