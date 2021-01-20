import axios from 'axios'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Block, Filter, IconBack, Product1, Product4, Search, Sort } from '../../assets';
import { RatingProduct } from '../product/rating';
import {API_URL} from "@env"

export class FilterData extends Component {

    constructor(){
        super();
        this.state = {
            product :  [],
            errMsg: ''
        }
    }

    handleGetPproduct = () => {
        const params = this.props.route.params.url
        axios
        .get(API_URL + '/search/sort' + params)
        .then((data) => {
            console.log(data.data.data)
            this.setState({
                product: data.data.data
            })
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                errMsg: 'Data Tidak Ditemukan'
            })
        })
    }
    componentDidMount =() => {
        this.handleGetPproduct();
    }
    goToDetail = (id) => {
        this.props.navigation.navigate('Detail', id)
    }
    goToFilter = () => {
        this.props.navigation.navigate('FilterProduct')
    }
    goToSearch = () => {
        this.props.navigation.navigate('SearchProduct')
    }
    render() {
        //console.log(this.props.route)
        const {title} = this.props.route.params
        const {product, errMsg} = this.state
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
                        <TouchableOpacity onPress={this.goToSearch}>
                            <Image source={Search} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Title&filter */}
                <View  style={{backgroundColor: 'white', paddingHorizontal: 15}}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={{backgroundColor:'#F9F9F9', height: 24, width: 343, alignSelf: 'center', marginBottom: 17, marginTop: 17, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 6}}>
                        <TouchableOpacity 
                        activeOpacity={0.6} 
                        style={{flexDirection: 'row'}}
                        onPress={this.goToFilter}
                        >
                            <Image source={Filter}/>
                            <Text>Filters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        activeOpacity={0.6}  
                        style={{flexDirection: 'row'}}
                        onPress={this.goToSort}
                        >
                            <Image source={Sort}/>
                            <Text>Price: lowest to high</Text>
                        </TouchableOpacity>
                        <View>
                            <Image source={Block} />
                        </View>
                    </View>
                </View>

                {/* product */}
                <ScrollView style={{marginTop: 18, marginBottom: 18}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>{errMsg}</Text>
                    </View>
                    {product && product.map(({id, product_name, store_name, total_rating, product_price, product_img}, index) => {
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

export default FilterData
