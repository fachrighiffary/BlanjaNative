import { CheckBox } from 'native-base'
import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Gopay, MasterCard, PosIndo } from '../../assets'
import {API_URL} from "@env"
import axios from 'axios'
import {orderItems} from '../../public/redux/ActionCreators/Bag'
import PushNotification from 'react-native-push-notification';
import {showNotification, handleCancel, handleScheduledNotification} from '../../notification.android'
import DropDownPicker from 'react-native-dropdown-picker'

const channel = 'notif';
const shippingPrice = 15000;

class Checkout extends Component{
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    showToast = () => {
        ToastAndroid.show("Select your address payment and expedisi", ToastAndroid.SHORT);
      };


    state = {
        isCheckedMaster: false,
        isCheckedPost: false,
        isCheckedGopay: false,
        selectedPayment: 0,
        backgroundColor: false,
        address: [],
        ekspedisi: ''
    }
    checkedMaster = () => {
        this.setState({
            isCheckedMaster: !this.state.isCheckedMaster,
            isCheckedPost: false,
            isCheckedGopay: false,
        })
    }

    checkedPost = () => {
        this.setState({
            isCheckedMaster: false,
            isCheckedPost: !this.state.isCheckedPost,
            isCheckedGopay: false,
        })
    }

    checkedGopay = () => {
        this.setState({
            isCheckedMaster: false,
            isCheckedPost: false,
            isCheckedGopay: !this.state.isCheckedGopay,
        })
    }
    getAddress = () => {
        const config = {
            headers: {
              'x-access-token': 'Bearer ' + this.props.auth.token,
            },
          };
        const id = this.props.address.activeAddress
        axios
        .get(API_URL + '/address/detail/' + id, config)
        .then((data) => {
            // console.log(data.data)
            this.setState({
                address: data.data.data[0]
            })
        })
        .catch((response) => {
            console.log(response)
        })
    }

    submitOrder = () => {
        let payment = 0
        if (this.state.isCheckedMaster) {
            payment = 1
        } else if (this.state.isCheckedPost) {
            payment = 2
        } else if (this.state.isCheckedGopay) {
            payment = 3
        }
        if(payment != 0 && this.props.address.activeAddress != null){
            const Order = {
                trxId : `TRX${this.props.bag.trxId}`,
                payment : payment,
                address: this.props.address.activeAddress, 
            }
            if(this.props.dispatch(orderItems(Order))){
                const newTransaction = {
                    user_id: this.props.auth.id,
                    TrxId: Order.trxId,
                    payment: payment,
                    address: this.props.address.activeAddress,
                    qty: this.props.bag.mybag.length,
                    total: this.props.bag.totalAmmount + shippingPrice,
                    trackingNumber: `XXXXXXXXXXXXXXX-0${this.props.bag.trxId}`,
                    ekspedisi: this.state.ekspedisi,
                    status: 'Waiting'
                }
                console.log('new transaction',newTransaction)

                axios.post(API_URL + '/transaction', newTransaction)
                .then((result) => {
                    axios.post(API_URL + '/transaction/itemOrder', this.props.bag.mybag)
                    .then((res) =>{
                        console.log(res)
                        showNotification('Notification', `Hai ${this.props.auth.name}, Transaksi berhasil, Tunggu pesanan kamu dikirim yaaa` , channel)

                        const data = {
                            id_user : this.props.auth.id,
                            message : `Hai ${this.props.auth.name}, Selmat transaksi anda telah berhasil dengan Kode transaksi ${Order.trxId}`,
                        }
                        axios.post(API_URL + '/notification/', data)
                        .then((res) => {
                            console.log(res.data.message)
                            this.props.navigation.navigate('Success')
                        })
                        .catch(({response}) => {
                            console.log(response)
                        })
                        
                    }).catch(({response}) =>{
                        console.log(response.data)
                    })
                })
                .catch((err) => {
                    console.log(err.response.data)
                })
            }
        }else{
            this.showToast();
        }
    }

    componentDidMount = () => {
        this.getAddress()
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
        // console.log(channel_ids);
        });
    }


    

    render(){
        console.log('ini adaalah user_id ',this.props.auth.id)
        const {navigation} = this.props
        const {address} = this.state
        let cardAddress;
        if(this.props.address.activeAddress != null){
            cardAddress = 
            <View style={styles.cardAddress}> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{address.name}</Text>
                    <TouchableOpacity onPress={() => {
                    navigation.navigate('ShippingAddress')
                }}>
                        <Text style={{color: '#DB3022'}}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 42, width: 235, marginTop: 7}}>
                    <Text>{address.address_dtl}</Text>
                </View>
            </View>
        }else{
            cardAddress = 
            <>
                <Text style={{alignSelf: 'center'}}>Belum ada alamat terpilih</Text>
                <TouchableOpacity activeOpacity={0.6} style={{borderRadius: 10, marginTop: 20, justifyContent: 'center',alignItems: 'center', alignSelf: 'center',height: 30, width: 150, backgroundColor : 'red'}} onPress={() => {
                    navigation.navigate('ShippingAddress')
                }}>
                        <Text style={{color: 'white'}}>Select Address</Text>
                    </TouchableOpacity>
            </>
        }
        
        return(
            <ScrollView>
                <View style={{marginTop: 20}}>
                    <Text style={styles.txtTitle}>Shipping Address</Text>
                </View>
                {cardAddress}
                <View style={{marginTop: 57}}>
                    <Text style={styles.txtTitle}>Payment</Text>
                </View>
                <View style={styles.payContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.bgIcon}>
                            <Image style={{position: 'absolute'}} source={MasterCard} />
                        </View>
                        <Text style={{marginLeft: 17, marginTop: 7}}>MasterCard</Text>
                    </View>
                    <CheckBox color="red"  checked={this.state.isCheckedMaster} onPress={this.checkedMaster}/>
                </View>
                <View style={styles.payContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.bgIcon}>
                            <Image style={{position: 'absolute'}} source={PosIndo} />
                        </View>
                        <Text style={{marginLeft: 17, marginTop: 7}}>Pos Indonesia</Text>
                    </View>
                    <CheckBox  color="red" checked={this.state.isCheckedPost} onPress={this.checkedPost}/>
                </View>
                <View style={styles.payContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.bgIcon}>
                            <Image style={{position: 'absolute'}} source={Gopay} />
                        </View>
                        <Text style={{marginLeft: 17, marginTop: 7}}>Gopay</Text>
                    </View>
                    <CheckBox  color="red"  checked={this.state.isCheckedGopay} onPress={this.checkedGopay}/>
                </View>
                <View style={styles.payContainer}>
                    <DropDownPicker
                        items={[
                            {label: 'JNE', value: 'jne', hidden: true},
                            {label: 'TIKI', value: 'tiki'},
                            {label: 'J&T', value: 'j&t'},
                        ]}
                        defaultValue={this.state.country}
                        containerStyle={{height: 40}}
                        style={{alignSelf: 'center', backgroundColor: '#fafafa', width: 350}}
                        placeholder="Select Ekspedisi"
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => this.setState({
                            ekspedisi: item.value
                        })}
                    />
                </View>
                <View style={styles.btmSubmit}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: 'grey'}}>Order : </Text>
                        <Text>Rp. {this.toPrice(this.props.bag.totalAmmount)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={{color: 'grey'}}>Devlivery : </Text>
                        <Text>Rp. {this.toPrice(shippingPrice)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                        <Text style={{color: 'grey'}}>Summary : </Text>
                        <Text>Rp. {this.toPrice(shippingPrice + this.props.bag.totalAmmount)}</Text>
                    </View>
                    <TouchableOpacity onPress={this.submitOrder}>
                        <View style={styles.btnSubmit}>
                            <Text style={{color: 'white'}}>SUBMIT ORDER</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    txtTitle : {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16
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
        marginLeft: 16
    },
    payContainer : { 
        height: 38, 
        marginTop: 17, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: 343,
        alignItems: 'center',
        marginLeft: 16
    },
    bgIcon : {
        height: 38, 
        width: 64, 
        backgroundColor: 'white', 
        position: 'relative',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btmSubmit: {
        marginTop: 60,
        height: 231,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 19,
        paddingTop: 25
    },
    btnSubmit : {
        height: 48,
        width: 343,
        borderRadius: 25,
        backgroundColor: '#DB3022',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        alignSelf: 'center'
    }
    
})

const mapStateToProps = ({auth, address, bag}) => {
    return {
        auth, 
        address, 
        bag
    }
    
}

export default connect(mapStateToProps)(Checkout)
