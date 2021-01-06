import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Product4, Search,IconBack } from '../../assets'

const Bag = () => {
    return (
        <View style={{padding: 14}}>
            <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 24}}>
                <Image source={IconBack} />
                <Image source={Search} />
            </View>
            <View style={{marginTop: 33}}>
                <Text style={styles.titleScreen}>My Bag</Text>
            </View>
            <View style={{marginTop: 24}}>
                <View style={styles.cardBag}>
                    <View style={{position: 'absolute', flexDirection: 'row'}}>
                        <Image style={styles.img} source={Product4} />
                        <View style={{marginLeft: 11}}>
                            <Text>T-Shirt</Text> 
                            <View style={styles.dtlZiseCol}>
                                <Text style={{fontSize: 11}}>Color : Grey</Text>
                                <Text style={{fontSize: 11}}>Size : L</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', width: 111, height: 36, marginTop: 14, justifyContent: 'space-between', alignItems: 'center'}}>
                                    <TouchableOpacity>
                                        <View style={{height: 36, width: 36, borderRadius: 18, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontSize: 30, marginTop: -5}}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Text>1</Text>
                                    <TouchableOpacity>
                                        <View style={{height: 36, width: 36, borderRadius: 18, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontSize: 30, marginTop: -5}}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginLeft: 62}}>
                                    <Text>Rp.100.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleScreen: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    cardBag : {
        height: 104,
        width: 343,
        borderRadius: 8,
        position: 'relative'
    },
    imgCard: {
        position: 'absolute'
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
    }
})

export default Bag
