import { API_URL } from "@env";
import axios from 'axios';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View , ToastAndroid} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux';
import { Go } from '../../assets';
import RatingProduct from '../product/rating';
import PushNotification from 'react-native-push-notification';
import {showNotification, handleCancel, handleScheduledNotification} from '../../notification.android'
import {addItems} from '../../public/redux/ActionCreators/Bag'




export class DetailProd extends Component {
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    constructor(){
        super();
        this.state = {
            size: '',
            color: '',
            like: false,
            status : 'Unpaid',
            lebar: '',
        }
    }
    showToast = () => {
        ToastAndroid.show("isi Size dan color terlebih dahulu", ToastAndroid.SHORT);
      };
    showToastSuccess = () => {
        ToastAndroid.show("Success Add to cart", ToastAndroid.SHORT);
    };

    handleSubmit = () => {
        const {id_product, product_name, product_img, product_desc, total_rating, product_price, product_size, product_color, product_qty, store_name, product_condition, index} = this.props
        if(this.state.size === '' || this.state.color === '') {
            this.showToast();
        }else{
            handleScheduledNotification('Notification', `Hai ${this.props.auth.name}, Jangan lupa lakukan Pembayaranmu, ${product_name} from ${store_name} Store` , 'notif')
            const Items = {
                user_id: this.props.auth.id,
                product_id: id_product,
                product_name: product_name,
                product_img: product_img.split(',')[0],
                color:this.state.color,
                size: this.state.size,
                price: this.props.product_price,
                qty: 1
            }
            this.props.dispatch(addItems(Items))
            const data = {
                id_user : this.props.auth.id,
                message : `Hai ${this.props.auth.name}, Jangan lupa lakukan Pembayaranmu, ${product_name} from ${store_name} Store`,
            }
            const dataSeller = {
                seller_id : this.props.seller_id,
                message : `Anda mendapatkan pesanan dari ${this.props.auth.name}, ${product_name}`
            }
            axios.post(API_URL + '/notification/', data)
            .then((res) => {
                console.log(res.data.message)
                axios.post(API_URL + '/notification/seller/', dataSeller)
                .then((res) => {
                    console.log(res.data.message)
                    this.showToastSuccess();
                })
                .catch(({response}) => {
                    console.log(response)
                })
            })
            .catch(({response}) => {
                console.log(response)
            })
        }
    }

    goToReview = (id_product, total_rating) => {
        this.props.navigation.navigate('RatingReview',[id_product, total_rating])
    }
    
    componentDidMount = () => {
        PushNotification.createChannel(
            {
              channelId: 'notif',
              channelName: 'My Notification channel',
              channelDescription: 'A channel to categories your notification',
              soundName: 'default',
              importance: 4,
              vibrate: true,
            },
            (created) => console.log(`createchannel returned '${created}'`),
          );

        PushNotification.getChannels((channel_ids) => {
        });
    }
   
    render() {
        const channel = 'notif';
        const {id_product, seller_id,  product_name, product_img, product_desc, total_rating, product_price, product_size, product_color, product_qty, store_name, product_condition, index} = this.props
        const {size, color, imgProd, width} = this.state
        let btnCart
        let btnChat
        if(this.props.auth.level==1){
            btnCart = <Text> </Text>
            btnChat = <Text></Text>
        }else{
            btnCart = <View style={{height: 112, width: '100%', backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={0.5} onPress={this.handleSubmit}>
                    <View style={{height: 48, width: 343, borderRadius: 25, backgroundColor: '#DB3022',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>ADD TO CART</Text>
                    </View>
                </TouchableOpacity>
            </View>
            btnChat = 
            <>
            <View style={{borderWidth: 1}}></View>
            <TouchableOpacity 
            style={styles.detailDtl} 
            onPress={() => {
                this.props.navigation.navigate('chatRoom', {
                    room_id: `S${seller_id}B${this.props.auth.id}`
                })
            }}>
                <Text>Chat Seller</Text>
                <Image source={Go} />
            </TouchableOpacity>
            </>
        }
        let imgWidth
        if(product_img.split(',').length === 1){
            imgWidth =
            <>
            {product_img.split(',').map((result, index) => {
                let httpImage =  { uri : API_URL + result}
                return <View style={{height: 413, width: 390, backgroundColor: 'grey', marginRight: 4, position: 'relative'}} key={index}>
                            <Image style={{position: 'absolute', height: 413, width: 390}} source={httpImage} />
                        </View>
            })}
            </>
        }else{
            imgWidth =
            <>
            {product_img.split(',').map((result, index) => {
                let httpImage =  { uri : API_URL + result}
                return <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4, position: 'relative'}} key={index}>
                            <Image style={{position: 'absolute', height: 413, width: 275,}} source={httpImage} />
                        </View>
            })}
            </>
        }
        return (
                <View>
                    <ScrollView  horizontal>
                        {imgWidth}
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
                                <Text style={{fontSize : 24, fontWeight: 'bold'}}>Rp.{this.toPrice(product_price)}</Text>
                            </View>
                            <RatingProduct total_rating={Math.round(total_rating)} />
                            <View >
                                <Text>{product_desc}.</Text>
                            </View>
                        </View>
                       {btnCart}
                        {btnChat}

                        <View style={{borderWidth: 1}}></View>
                        <TouchableOpacity style={styles.detailDtl}>
                            <Text>Support</Text>
                            <Image source={Go} />
                        </TouchableOpacity>
                        
                        <View style={{borderWidth: 1}}></View>
                        <TouchableOpacity style={styles.detailDtl} onPress={() => {
                            this.goToReview(id_product, total_rating)
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


const mapStateToProps = ({auth, bag}) => {
    return{
        auth,
        bag

    }
}

export default connect(mapStateToProps)(DetailProd) 
