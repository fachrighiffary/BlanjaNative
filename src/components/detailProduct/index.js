import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Product2, Product3, Share, Star } from '../../assets'
import Icon from 'react-native-vector-icons/Fontisto';
import DropDownPicker from 'react-native-dropdown-picker';
import Product from '../../components/product';
import axios from 'axios';
import Rating from '../product/rating';

export class DetailProd extends Component {
    constructor(){
        super();
        this.state = {
            size: 'Size',
            color: 'color',
            like: false,
            product : []
        }
    }
    render() {
        const {product_name, product_img, product_desc, total_rating, product_price, product_size, product_qty, store_name,product_condition, index} = this.props
        let httpImage1 = { uri : 'http://10.0.2.2:8000' + product_img.split(',')[0]}
        let httpImage2 = { uri : 'http://10.0.2.2:8000' + product_img.split(',')[1]}
        let httpImage3 = { uri : 'http://10.0.2.2:8000' + product_img.split(',')[2]}
        let httpImage4 = { uri : 'http://10.0.2.2:8000' + product_img.split(',')[3]}
        let httpImage5 = { uri : 'http://10.0.2.2:8000' + product_img.split(',')[4]}
        return (
                <View>
                    <ScrollView  horizontal >
                        <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4, position: 'relative'}}>
                            <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage1} />
                        </View>
                        <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4,position: 'relative'}}>
                            <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage2} />
                        </View>
                        <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4,position: 'relative'}}>
                            <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage3} />
                        </View>
                        <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4,position: 'relative'}}>
                            <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage4} />
                        </View>
                        <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4,position: 'relative'}}>
                            <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage5} />
                        </View>
                    </ScrollView>

                    {/* Dropdown */}
                    <View style={{paddingHorizontal: 16}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <DropDownPicker
                                    items={[
                                        {label: 'Size', value: 'Size', hidden: true},
                                        {label: 'M', value: 'm'},
                                        {label: 'L', value: 'xl'},
                                        {label: 'XL', value: 'xl'},
                                    ]}
                                    defaultValue={this.state.size}
                                    containerStyle={{height: 60}}
                                    style={{marginTop: 12, backgroundColor: 'white', height: 40, width: 138, borderColor: '#F01F0E' }}
                                    itemStyle={{
                                        justifyContent: 'center'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        size: item.value
                                    })}
                                />
                                <DropDownPicker
                                    items={[
                                        {label: 'color', value: 'color', hidden: true},
                                        {label: 'Black', value: 'black'},
                                        {label: 'Red', value: 'red'},
                                        {label: 'Green', value: 'green'},
                                    ]}
                                    defaultValue={this.state.color}
                                    containerStyle={{height: 60}}
                                    style={{marginTop: 12, backgroundColor: 'white', height: 40, width: 138, borderColor: '#F01F0E' }}
                                    itemStyle={{
                                        justifyContent: 'center'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        color: item.value
                                    })}
                                />
                                <TouchableOpacity onPress={() => {
                                        this.setState({
                                            like: !this.state.like
                                        })
                                }} >
                                    <View style={{marginTop: 16, height: 36, width: 36, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 16}}>
                                        <Icon name="heart-alt" color={this.state.like ? 'red' : 'grey' }/>   
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 22, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{fontSize : 24, fontWeight: 'bold'}}>{product_name}</Text>
                                    <Text style={{fontSize: 11, color: 'grey'}}>{store_name}</Text>
                                </View>
                                <Text style={{fontSize : 24, fontWeight: 'bold'}}>Rp.{product_price}</Text>
                            </View>
                            <Rating total_rating={Math.round(total_rating)} />
                            <View >
                                <Text>{product_desc}.</Text>
                            </View>
                        </View>
                        <View style={{height: 112, width: '100%', backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Bag')
                            }}>
                                <View style={{height: 48, width: 343, borderRadius: 25, backgroundColor: '#DB3022',justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: 'white'}}>ADD TO CART</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>
        )
    }
}

export default DetailProd
