import axios from 'axios'
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { IconBack, Search } from '../../../assets'
import {Api_URL} from "@env"

class MyOrder extends Component {
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    constructor(props){
        super(props);
        this.state = {
            myOrder : []
        }
    }

    getData = () => {
        const id = this.props.id
        axios
        .get(Api_URL + '/transaction/' + id)
        .then((data) => {
            //console.log(data.data.data)
            this.setState({
                myOrder: data.data.data
            })
        })
        .catch((response) => {
            console.log(response.data)
        })
    }

    handleDetail = ([TrxId, trackingNumber, total, created_at, status]) => {
        this.props.navigation.navigate('OrderDetail', [TrxId, trackingNumber, total, created_at, status])
     }

    componentDidMount = () => {
        this.getData()
    }
   

    render() {
        // console.log(this.props.id)
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
            {myOrder && myOrder.map(({TrxId, created_at, qty, status, total, trackingNumber}, index) => {
                return (
                    <TouchableOpacity 
                    style={styles.containerCard} 
                    key={index} 
                    onPress={() => {
                        this.handleDetail([TrxId, trackingNumber, total, created_at, status])
                    }}
                    >
                        <View style={styles.card}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order No{TrxId}</Text>
                                <Text style={{color: 'grey'}}>{created_at.split('T')[0]}</Text>
                            </View>
                            <Text style={{color: 'grey', marginTop: 15}}>Tracking number : <Text style={{fontWeight: 'bold', color: 'black'}}>{trackingNumber}</Text></Text>
                            <Text style={{color: 'grey', marginTop: 15}}>Quantity : <Text style={{fontWeight: 'bold', color: 'black'}}>{qty}</Text></Text>
                            <Text style={{color: 'grey', marginTop: 15}}>Total Amount : <Text style={{fontWeight: 'bold', color: 'black'}}>Rp. {this.toPrice(total)}</Text></Text>
                            <View style={{position: 'absolute', right: 12, bottom: 20}}>
                                <Text style={{fontSize: 14, color: 'green'}}>{status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }) }
            </>
        }
        return (
            <ScrollView style={{padding: 14}}>
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

                <View style={{marginTop: 33}}>
                    <Text style={{fontSize: 34, fontWeight: 'bold'}}>My Orders</Text>
                </View>
                {orderList}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerCard : {
        alignItems: 'center', 
        marginTop: 24
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
