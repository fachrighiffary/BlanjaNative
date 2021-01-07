import { CheckBox } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Gopay, MasterCard, PosIndo } from '../../assets'

const Checkout = ({navigation}) => {
    return (
        <View>
            <View style={{marginTop: 20}}>
                <Text style={styles.txtTitle}>Shipping Address</Text>
            </View>
            <View style={styles.cardAddress}> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Fachri Ghiffary</Text>
                    <TouchableOpacity onPress={() => {
                    navigation.navigate('ShippingAddress')
                }}>
                        <Text style={{color: '#DB3022'}}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 42, width: 235, marginTop: 7}}>
                    <Text>3 Newbridge Court Chino Hills, CA 91709, United States</Text>
                </View>
            </View>
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
                <CheckBox color="grey" />
            </View>
            <View style={styles.payContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.bgIcon}>
                        <Image style={{position: 'absolute'}} source={PosIndo} />
                    </View>
                    <Text style={{marginLeft: 17, marginTop: 7}}>Pos Indonesia</Text>
                </View>
                <CheckBox  color="grey"/>
            </View>
            <View style={styles.payContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.bgIcon}>
                        <Image style={{position: 'absolute'}} source={Gopay} />
                    </View>
                    <Text style={{marginLeft: 17, marginTop: 7}}>Gopay</Text>
                </View>
                <CheckBox  color="grey"/>
            </View>
            <View style={styles.btmSubmit}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'grey'}}>Order : </Text>
                    <Text>Rp. 50,000</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                    <Text style={{color: 'grey'}}>Devlivery : </Text>
                    <Text>Rp. 5,000</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                    <Text style={{color: 'grey'}}>Summary : </Text>
                    <Text>Rp. 105,000</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Success')
                }}>
                    <View style={styles.btnSubmit}>
                        <Text style={{color: 'white'}}>SUBMIT ORDER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
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

export default Checkout
