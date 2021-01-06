import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Search } from '../../assets'

export class MyOrder extends Component {
    render() {
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
                <TouchableOpacity style={styles.containerCard}>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order No123123</Text>
                            <Text style={{color: 'grey'}}>06-01-2121</Text>
                        </View>
                        <Text style={{color: 'grey', marginTop: 15}}>Tracking number : <Text style={{fontWeight: 'bold', color: 'black'}}>IW3475453455</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Quantity : <Text style={{fontWeight: 'bold', color: 'black'}}>3</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Total Amount : <Text style={{fontWeight: 'bold', color: 'black'}}>Rp. 100,000</Text></Text>
                        <View style={{position: 'absolute', right: 12, bottom: 20}}>
                            <Text style={{fontSize: 14}}>Delivered</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerCard}>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order No123123</Text>
                            <Text style={{color: 'grey'}}>06-01-2121</Text>
                        </View>
                        <Text style={{color: 'grey', marginTop: 15}}>Tracking number : <Text style={{fontWeight: 'bold', color: 'black'}}>IW3475453455</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Quantity : <Text style={{fontWeight: 'bold', color: 'black'}}>3</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Total Amount : <Text style={{fontWeight: 'bold', color: 'black'}}>Rp. 100,000</Text></Text>
                        <View style={{position: 'absolute', right: 12, bottom: 20}}>
                            <Text style={{fontSize: 14}}>Delivered</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerCard}>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order No123123</Text>
                            <Text style={{color: 'grey'}}>06-01-2121</Text>
                        </View>
                        <Text style={{color: 'grey', marginTop: 15}}>Tracking number : <Text style={{fontWeight: 'bold', color: 'black'}}>IW3475453455</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Quantity : <Text style={{fontWeight: 'bold', color: 'black'}}>3</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Total Amount : <Text style={{fontWeight: 'bold', color: 'black'}}>Rp. 100,000</Text></Text>
                        <View style={{position: 'absolute', right: 12, bottom: 20}}>
                            <Text style={{fontSize: 14}}>Delivered</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerCard}>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order No123123</Text>
                            <Text style={{color: 'grey'}}>06-01-2121</Text>
                        </View>
                        <Text style={{color: 'grey', marginTop: 15}}>Tracking number : <Text style={{fontWeight: 'bold', color: 'black'}}>IW3475453455</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Quantity : <Text style={{fontWeight: 'bold', color: 'black'}}>3</Text></Text>
                        <Text style={{color: 'grey', marginTop: 15}}>Total Amount : <Text style={{fontWeight: 'bold', color: 'black'}}>Rp. 100,000</Text></Text>
                        <View style={{position: 'absolute', right: 12, bottom: 20}}>
                            <Text style={{fontSize: 14}}>Delivered</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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

export default MyOrder
