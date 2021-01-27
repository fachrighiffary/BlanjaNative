import { API_URL } from "@env";
import axios from 'axios';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Product4, Search } from '../../assets';
import {addQty, minQty, removeItems} from '../../public/redux/ActionCreators/Bag'

class Bag extends Component{
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    constructor(props){
        super(props);
        this.state = {
            plus: '',
            mines: ''
        }
        
    }

    mines = (product_id, color, size, price, qty) => {
        const data = {
            product_id: product_id,
            color: color,
            size: size,
            price: price,
        }
        console.log(qty)
        if(qty > 1){
            this.props.dispatch(minQty(data))
        }else{
            qty = 1
        }
    }

    plus = (product_id, color, size, price) => {
        const data = {
            product_id: product_id,
            color: color,
            size: size,
            price: price,
        }
        this.props.dispatch(addQty(data))
       
    }

    remove = (product_id, color, size, price) => {
        const data = {
            product_id: product_id,
            color: color,
            size: size,
            price: price,
        }
       this.props.dispatch(removeItems(data))
    }



    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if(!this.props.auth.isLogin){
                this.props.navigation.navigate('Login')
            }
        });
    }
    componentWillUnmount() {
        this._unsubscribe()
    }

    render(){
        const bagState = this.props.bag.mybag
        //console.log(this.props.bag.totalAmmount)
        let thisBag;
        if(bagState.length < 1){
            thisBag =
            <><View><Text>Cart anda masih kosong</Text></View></>
        }else{
            thisBag =
            <>
            {bagState && bagState.map(({ product_id, product_img, product_name, color, size, qty, price }, index) => {
                let httpImage = { uri : API_URL + product_img}
                return(
                    <View style={styles.cardBag}  key={index}>
                        <TouchableOpacity>
                            <Image style={styles.img} source={httpImage} />
                        </TouchableOpacity>
                        <View style={{marginLeft: 11}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.txtBrand}>{product_name}</Text>
                                <TouchableOpacity style={{marginTop: 7}} onPress={() => {
                                    this.remove(product_id, color, size, price)
                                }}>
                                    <Text style={{color:'red'}}>Hapus</Text>
                                </TouchableOpacity>
                            </View> 
                            <View style={styles.containerSpec}>
                                <Text>Color : <Text>{color}</Text></Text>
                                <Text>Size : <Text>{size}</Text></Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 14, alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', width: 130, alignItems: 'center'}}>
                                    <TouchableOpacity style={styles.circle} onPress={() => {
                                        this.mines(product_id, color, size, price, qty)
                                    }}>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{paddingHorizontal: 16}}>{qty}</Text>
                                    <TouchableOpacity style={styles.circle} onPress={() => {
                                       this.plus(product_id, color, size, price)
                                    }}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text>Rp. {this.toPrice(price * qty)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                )
            })}
            </>
        }
        return(
            <View style={{flex:1}}>
                <View style={{height: 50, padding: 14,alignItems: 'flex-end', width: '100%'}}>
                    <TouchableOpacity>
                        <Image source={Search} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.titleScreen}>My Bag</Text>
                        </View>
                        {thisBag}
                    </ScrollView>
                </View>
                <View style={styles.btmNav}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
                        <Text>Total Amount : </Text>
                        <Text>Rp. {this.toPrice(this.props.bag.totalAmmount)}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.btnCheckout} onPress={() => {
                            this.props.navigation.navigate('Checkout')
                        }}>
                            <Text style={{color: 'white'}}>CHECK OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
                
        )
    }
}

const styles = StyleSheet.create({
    titleScreen: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 24,
        alignSelf: 'center'
    },
    cardBag : {
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
    },
    img : {
        width: 104,
        height: 104,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    dtlZiseCol: {
        flexDirection: 'row',
        width: 110, 
        justifyContent: 'space-between',
        marginTop: 4
    },
    btnCheckout: {
        height: 48,
        width: 343,
        backgroundColor: '#DB3022',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        alignSelf: 'center'
    },
    btmNav: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 130,
        width: '100%', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    txtBrand : {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 5
    },
    containerSpec: {
        flexDirection: 'row', 
        width: 150, 
        justifyContent: 'space-between'
    },
    circle: {
        height: 36,
        width: 36,
        borderWidth: 1,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems:'center'
    }
})

const mapStateToProps = ({auth, bag}) => {
    return {
        auth,bag
    }
}


export default connect(mapStateToProps)(Bag)
