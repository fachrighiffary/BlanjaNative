import { API_URL } from "@env";
import axios from 'axios';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux';
import { Go } from '../../assets';
import RatingProduct from '../product/rating';


//const img_product = this.props.product_img.split(',')[0]

export class DetailProd extends Component {
    constructor(){
        super();
        this.state = {
            size: '',
            color: '',
            like: false,
            status : 'Unpaid',
            quantity: 1
           
        }
    }

    handleSubmit = async() => {
        const config = {
            headers: {
              'x-access-token': 'Bearer ' + this.props.auth.token,
            },
          };
        const data = {
            product_id : this.props.id,
            product_img : this.props.product_img.split(',')[0],
            user_id : this.props.auth.id,
            color : this.state.color,
            size : this.state.size,
            price : this.props.product_price,
            status: this.state.status,
            quantity: this.state.quantity
        }
        console.log(data, config)

        axios.post(API_URL + '/transaction', data, config)
        .then((data) => {
            //console.log(data)
            this.props.navigation.navigate('Bag')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    goToReview = (id, total_rating) => {
        this.props.navigation.navigate('RatingReview',[id, total_rating])
    }

    render() {
        const {id, product_name, product_img, product_desc, total_rating, product_price, product_size, product_color, product_qty, store_name, product_condition, index} = this.props
        const {size, color, imgProd} = this.state
        //console.log(size, color, imgProd)
        return (
                <View>
                    <ScrollView  horizontal>
                        {product_img.split(',').map((result, index) => {
                            let httpImage =  { uri : API_URL + result}
                            return <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4, position: 'relative'}} key={index}>
                                        <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage} />
                                    </View>
                        })}
                    </ScrollView>

                    {/* Dropdown */}
                    <View style={{paddingHorizontal: 16}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <DropDownPicker
                                   items={product_size.split(',').map((result) => {
                                    return {label: result, value: result}
                                   })}
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
                                    placeholder="Select Size"
                                />
                                <DropDownPicker
                                   items={product_color.split(',').map((result) => {
                                    return {label: result, value: result}
                                   })}
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
                                    placeholder="Select Color"
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
                            <RatingProduct total_rating={Math.round(total_rating)} />
                            <View >
                                <Text>{product_desc}.</Text>
                            </View>
                        </View>
                        <View style={{height: 112, width: '100%', backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.handleSubmit}>
                                <View style={{height: 48, width: 343, borderRadius: 25, backgroundColor: '#DB3022',justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: 'white'}}>ADD TO CART</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderWidth: 1}}></View>
                        <TouchableOpacity style={styles.detailDtl}>
                            <Text>Shipping Info</Text>
                            <Image source={Go} />
                        </TouchableOpacity>

                        <View style={{borderWidth: 1}}></View>
                        <TouchableOpacity style={styles.detailDtl}>
                            <Text>Support</Text>
                            <Image source={Go} />
                        </TouchableOpacity>
                        
                        <View style={{borderWidth: 1}}></View>
                        <TouchableOpacity style={styles.detailDtl} onPress={() => {
                            this.goToReview(id, total_rating)
                        }}>
                            <Text>Rating & Review</Text>
                            <Image source={Go} />
                        </TouchableOpacity>
                        <View style={{borderWidth: 1}}></View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    detailDtl : {
        padding: 16, 
        justifyContent: 'space-between', 
        flexDirection: 'row'
    }
})


const mapStateToProps = ({auth}) => {
    return(
        auth
    )
}

export default connect(mapStateToProps)(DetailProd) 
