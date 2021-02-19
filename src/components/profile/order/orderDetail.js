import axios from 'axios'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {API_URL} from "@env"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Product4, Search } from '../../../assets'
import { connect } from 'react-redux'

class OrderDetail extends Component {
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    constructor(props){
        super(props);
        this.state = {
            detailOrder : [],
            totalOrder: '',
            address: ''
        }
    }

    getData = () => {
        const id = this.props.route.params[0]
        axios
        .get(API_URL + '/transaction/detail/' + id)
        .then((data) => {
            console.log(data.data.data)
            this.setState({
                detailOrder : data.data.data,
                totalOrder : data.data.data.length,
                address : data.data.data[0].address_dtl
            })
        })
        .catch((response) => {
            console.log(response.data)
        })
    }
    submitUpdate = () => {
        const data = {
            status : 'On Delivery',
        }
        const id = this.props.route.params[6]       
        axios.patch(API_URL + '/transaction/' + id, data)
        .then((res) => {
            console.log(res)
            this.props.navigation.replace('MyOrder')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    submitUpdateBuyer = () => {
        const data = {
            status : 'Delivered',
        }
        const id = this.props.route.params[6]       
        axios.patch(API_URL + '/transaction/' + id, data)
        .then((res) => {
            console.log(res)
            this.props.navigation.replace('MyOrder')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getData()
    }

    render() {
        //console.log(this.props.route.params)
        const order = this.props.route.params[0]
        const trackingNUmber = this.props.route.params[1]
        const totalAmmount = this.props.route.params[2]
        const date = this.props.route.params[3]
        const status = this.props.route.params[4]
        const ekspedisi = this.props.route.params[5]
        const {detailOrder, totalOrder, address}  = this.state
        const {auth} = this.props
        console.log(auth)
        let btnProcess
        if(auth.level === 1){
            if(status === 'Waiting'){
                btnProcess = 
                <>
                <TouchableOpacity activeOpacity={0.5} style={styles.btnupdate} onPress={() => {
                        this.submitUpdate()
                        
                    }}>
                        <Text style={{color: 'white'}}>Proses Pesanan</Text>
                </TouchableOpacity>
                </>
            }else{
                btnProcess = null
            }
        }else{
            if(status === 'On Delivery'){
                btnProcess = 
                <TouchableOpacity activeOpacity={0.5} style={styles.btnupdate} onPress={() => {
                    this.submitUpdateBuyer()
                        
                    }}>
                        <Text style={{color: 'white'}}>Terima Pesanan</Text>
                </TouchableOpacity>
            }else{
                btnProcess = null
            }
        }
        return (
            <View style={{ paddingHorizontal: 16}}> 
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.replace('MyOrder')
                    }}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Order Details</Text>
                    <TouchableOpacity>
                        <Image source={Search} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{height: 600}}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30}}>
                        <Text style={{fontSize: 16}}>Order {order}</Text>
                        <Text style={{fontSize: 14, color: 'grey'}}>{date.split('T')[0]}</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30}}>
                        <Text style={{fontSize: 14, color: 'grey'}}>Tracking number :  
                            <Text style={{fontSize: 14, color: 'black'}}> XXXXX-{trackingNUmber.split('-')[1]}</Text>
                        </Text>
                        <Text style={{fontSize: 14, color: status === 'Delivered' ? 'green' : '#FFA113'}}>{status}</Text>
                    </View>
                    <View style={{marginTop: 16}}>
                        <Text>{totalOrder} Items</Text>
                    </View>
                    {detailOrder && detailOrder.map(({id,product_img, product_name, color, size, qty, price}, index) => {
                        let httpImage = { uri : API_URL + product_img}
                        return(
                                <View style={styles.card} key={index}>
                                    <Image style={styles.imgProduct} source={httpImage}/>
                                    <View style={{paddingTop: 11, paddingLeft: 11}}>
                                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{product_name}</Text>
                                        <View style={{flexDirection: 'row', width: 130, justifyContent: 'space-between', alignItems: 'center',  marginTop: 9}}>
                                            <Text style={{fontSize: 11, color: 'grey'}}>Color: 
                                                <Text style={{fontSize: 11, color: 'black'}}>{color}</Text>
                                            </Text>
                                            <Text style={{fontSize: 11, color: 'grey'}}>Size: 
                                                <Text style={{fontSize: 11, color: 'black'}}>{size}</Text>
                                            </Text>
                                        </View>
                                        <View style={{flexDirection: 'row', width: 200, justifyContent: 'space-between', marginTop: 10}}>
                                            <Text style={{fontSize: 11, color: 'grey'}}>Units : 
                                                <Text>{qty}</Text>
                                            </Text>
                                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Rp. {this.toPrice(price)}</Text>
                                        </View>
                                    </View>
                                </View>
                        )
                    })}
                    <View style={{marginTop: 34}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order Information</Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                        <View style={{width: 122}}>
                            <Text>Shipping Address: </Text>
                        </View>
                        <View style={{maxWidth: 215, maxHeight: 50}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>{address}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                        <View style={{width: 122}}>
                            <Text>Payment method: </Text>
                        </View>
                        <View style={{maxWidth: 215, maxHeight: 50}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>**** **** **** 3947</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                        <View style={{width: 122}}>
                            <Text>Delivery method: </Text>
                        </View>
                        <View style={{maxWidth: 215, maxHeight: 50}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>{ekspedisi.toUpperCase()}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                        <View style={{width: 122}}>
                            <Text>Discount: </Text>
                        </View>
                        <View style={{maxWidth: 215, maxHeight: 50}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>10%, Personal promo code</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 15, flexDirection: 'row', marginBottom: 30}}>
                        <View style={{width: 122}}>
                            <Text>Total Amount: </Text>
                        </View>
                        <View style={{maxWidth: 215, maxHeight: 50}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>{this.toPrice(totalAmmount)}</Text>
                        </View>
                    </View>
                    {/* {auth.level === 1 && status === 'Waiting' ? (
                        <TouchableOpacity activeOpacity={0.5} style={styles.btnupdate} onPress={() => {
                                this.submitUpdate()
                               
                            }}>
                                <Text style={{color: 'white'}}>Proses Pesanan</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity activeOpacity={0.5} style={styles.btnupdate} onPress={() => {
                            this.submitUpdate()
                           
                        }}>
                            <Text style={{color: 'white'}}>Terima Pesanan</Text>
                    </TouchableOpacity>
                    )} */}
                    {btnProcess}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    title: {
        fontSize: 18
    },
    card: {
        height: 104,
        width: 343,
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 8,
        marginTop: 18,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    imgProduct : {
        height: 104,
        width: 104,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    btnupdate: {
        marginTop: 15,
        justifyContent: 'center', 
        alignItems: 'center',  
        marginBottom: 30, 
        alignSelf: 'center', 
        height: 50, 
        width: 200, 
        backgroundColor: '#DB3022', 
        borderRadius: 10
    }

})

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}



export default connect(mapStateToProps)(OrderDetail)
