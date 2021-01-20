import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Product2, Product3, Share, Star } from '../../assets'
import Icon from 'react-native-vector-icons/Fontisto';
import DropDownPicker from 'react-native-dropdown-picker';
import Product from '../../components/product';
import DetailProd from '../../components/detailProduct'
import axios from 'axios';
import {API_URL} from "@env"
import { connect } from 'react-redux';

export class DetailProduct extends Component {
    
    constructor(){
        super();
        this.state = {
            size: 'Size',
            color: 'color',
            like: false,
            product : [],

        }
    }
        

    getProduct = async() => {
        if(!this.props.auth.isLogin){
            this.props.navigation.navigate('Login')
        }else{
            const id = this.props.route.params
            const config = {
                headers: {
                  'x-access-token': 'Bearer ' + this.props.auth.token,
                },
              };
            axios.get(API_URL + '/product/' + id, config)
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
    }

    componentDidMount = () => {
        this.getProduct();
    }
    

    render() {
        //console.log('ini adalah auth props di detail', this.props.auth)
        const {product} = this.state
        return (
            <ScrollView>
               <View style={styles.container}>
                   <TouchableOpacity onPress={ () => {
                       this.props.navigation.goBack()
                   }}>
                        <Image source={IconBack}/>  
                   </TouchableOpacity>
                   <Text style={styles.textTitle}>Detail Product</Text>
                   <TouchableOpacity>
                        <Image source={Share} />
                   </TouchableOpacity>
               </View>
               {product && product.map(({id, product_name, product_img, product_desc, product_condition,total_rating , product_price, product_qty, product_size, product_color, store_name}, index) => {
                        return <DetailProd 
                        id = {id}
                        product_name={product_name}
                        product_img={product_img}
                        product_desc={product_desc}
                        product_price={product_price}
                        product_qty={product_qty}
                        product_size={product_size}
                        product_color={product_color}
                        store_name={store_name}
                        product_condition={product_condition}
                        total_rating={total_rating}
                        key={index}
                        navigation={this.props.navigation} 
                        />
                    })}
                {/* <DetailProd /> */}
                <View style={{paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 24}}>
                    <Text style={{fontSize: 18, fontWeight: '700'}}>You can also like this</Text>
                    <Text style={{fontSize: 11, color: 'grey'}} >12 items</Text>
                </View>
                <Product navigation={this.props.navigation}  status="Popular" url="?popular=desc"/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    textTitle :{
        fontSize: 18,
        fontWeight: '600'
    }
})

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(DetailProduct);
