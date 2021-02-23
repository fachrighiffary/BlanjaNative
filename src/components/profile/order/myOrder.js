import axios from 'axios'
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { IconBack, Search } from '../../../assets'
import {API_URL} from "@env"

class MyOrder extends Component {
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    constructor(props){
        super(props);
        this.state = {
            myOrder : [],
            colorStatus : '',
            loading: false
        }
    }

    getData = () => {
        if(this.props.level == 1){
            axios.get(API_URL + '/transaction' )
            .then((res) => {
                console.log(res.data.data)
                this.setState({
                    myOrder: res.data.data,
                    loading: true
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            const id = this.props.id
            axios
            .get(API_URL + '/transaction/' + id)
            .then((data) => {
                console.log(data.data.data)
                this.setState({
                    myOrder: data.data.data,
                    loading: true
                })
            })
            .catch((response) => {
                console.log(response.data)
            })
        }
    }

    handleDetail = ([TrxId, trackingNumber, total, created_at, status, ekspedisi, id]) => {
        this.props.navigation.navigate('OrderDetail', [TrxId, trackingNumber, total, created_at, status, ekspedisi, id])
     }

    componentDidMount = () => {
        this.getData()
    }


    render() {
        const {loading} = this.state
        console.log('ini adalah id usernya',this.props.id)
        const {myOrder} = this.state
        let orderList
        if(myOrder == []){
            orderList = 
            <>
            <Text>Tidak ada History Pemesanan</Text>
            </>
        }else {
            orderList = 
            <>
            {myOrder && myOrder.map(({id, TrxId, created_at, qty, status, total, trackingNumber, ekspedisi}, index) => {
                return (
                    <TouchableOpacity 
                    style={styles.containerCard} 
                    key={id} 
                    onPress={() => {
                        this.handleDetail([TrxId, trackingNumber, total, created_at, status, ekspedisi, id])
                    }}
                    >
                        <View style={styles.card}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order No{TrxId}</Text>
                                <Text style={{color: 'grey'}}>{created_at.split('T')[0]}</Text>
                            </View>
                            <Text style={{color: 'grey', marginTop: 15}}>Tracking number : <Text style={{fontWeight: 'bold', color: 'black'}}>XXXX{trackingNumber.split('-')[1]}</Text></Text>
                            <Text style={{color: 'grey', marginTop: 15}}>Quantity : <Text style={{fontWeight: 'bold', color: 'black'}}>{qty}</Text></Text>
                            <Text style={{color: 'grey', marginTop: 15}}>Total Amount : <Text style={{fontWeight: 'bold', color: 'black'}}>Rp. {this.toPrice(total)}</Text></Text>
                            <View style={{position: 'absolute', right: 12, bottom: 20}}>
                                <Text style={{fontSize: 14, color: status === 'Delivered' ? 'green' : '#FFA113', maxWidth: 100, textAlign: 'center'}}>{status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }) }
            </>
        }
        return (
            <View style={{padding: 14}}>
                    <ScrollView style={{height: 650}} showsVerticalScrollIndicator={false}> 
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

                        <View style={{marginTop: 33, marginBottom: 24}}>
                            <Text style={{fontSize: 34, fontWeight: 'bold'}}>My Orders</Text>
                        </View>
                        {loading ? (
                            <>
                                {orderList}
                            </>
                        ) : (
                            <View style={{height: 500, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size="large" color="red"/>
                            </View>
                        )}
                    </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerCard : {
        alignItems: 'center', 
        marginBottom: 24,
    },
    card: {
        height: 164, 
        width: 343, 
        backgroundColor: 'white', 
        borderRadius: 8,
        position: 'relative',
        padding: 19
    }
})


const mapStateToProps = ({auth}) => {
    return(
        auth
    )
}

export default connect(mapStateToProps)(MyOrder)
