import axios from 'axios'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Block, Filter, IconBack, Product4, Search, Sort } from '../../assets';
import Rating from '../product/rating';
import {API_URL} from "@env"

export class Category extends Component {
    
    constructor(){
        super();
        this.state = {
            product :  []
        }
    }

    handleGetPproduct = () => {
        const params = this.props.route.params.url
        axios
        .get(API_URL + '/search' + params)
        .then((data) => {
            //console.log(data.data.data)
            this.setState({
                product: data.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount =() => {
        this.handleGetPproduct();
    }
    goToDetail = (id) => {
        this.props.navigation.navigate('Detail', id)

    }

    render() {
        //console.log(this.props.route)
        const {title} = this.props.route.params
        const {product} = this.state
        return (
            <View>

                {/* header */}
                <View style={{backgroundColor: 'white'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 24}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image source={IconBack} />
                        </TouchableOpacity>
                        <Image source={Search} />
                    </View>
                </View>

                {/* Title&filter */}
                <View  style={{backgroundColor: 'white', paddingHorizontal: 15}}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={{backgroundColor:'#F9F9F9', height: 24, width: 343, alignSelf: 'center', marginBottom: 17, marginTop: 17, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 6}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={Filter}/>
                            <Text>Filters</Text>
                        </View>
                        <View  style={{flexDirection: 'row'}}>
                            <Image source={Sort}/>
                            <Text>Price: lowest to high</Text>
                        </View>
                        <View>
                            <Image source={Block} />
                        </View>
                    </View>
                </View>

                {/* product */}
                <ScrollView style={{marginTop: 18, marginBottom: 18}}>
                    {product && product.map(({id, product_name, store_name, total_rating, product_price, product_img}, index) => {
                        let httpImage = { uri : 'http://192.168.1.3:8000' + product_img.split(',')[0]}
                        return (
                        <TouchableOpacity style={styles.card} key={index} onPress={() => {
                            this.goToDetail(id)
                        }}>
                            <Image style={styles.img} source={httpImage} />
                            <View style={{marginLeft: 11, paddingTop: 11}}>
                                <Text>{product_name}</Text>
                                <Text>{store_name}</Text>
                                <Rating total_rating={Math.round(total_rating)}/>
                                <Text>Rp. {product_price}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    }
})

export default Category
