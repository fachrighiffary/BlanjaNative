import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class FilterProduct extends Component {
    render() {
        return (
            <>
            <View style={{paddingTop: 16, paddingLeft: 14}}>
                <Text style={styles.title}>Colors</Text>
            </View>
            <View style={styles.card} >
                <TouchableOpacity style={{height: 36, width: 36, backgroundColor: '#020202', borderRadius: 18}} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?color=black',
                        title: 'Black'
                    })
                }} ></TouchableOpacity>
                <TouchableOpacity style={{height: 36, width: 36, backgroundColor: '#B82222', borderRadius: 18}} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?color=red',
                        title: 'Red'
                    })
                }} ></TouchableOpacity>
                <TouchableOpacity style={{height: 36, width: 36, backgroundColor: '#F6F6F6', borderRadius: 18}} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?color=white',
                        title: 'White'
                    })
                }} ></TouchableOpacity>
                <TouchableOpacity style={{height: 36, width: 36, backgroundColor: '#BEA9A9', borderRadius: 18}} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?color=grey',
                        title: 'Grey'
                    })
                }} ></TouchableOpacity>
                <TouchableOpacity style={{height: 36, width: 36, backgroundColor: '#DB3022', borderRadius: 18}} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?color=orange',
                        title: 'Orange'
                    })
                }} ></TouchableOpacity>
                <TouchableOpacity style={{height: 36, width: 36, backgroundColor: '#151867', borderRadius: 18}} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?color=blue',
                        title: 'Blue'
                    })
                }} ></TouchableOpacity>
            </View>
            <View style={{paddingTop: 16, paddingLeft: 14}}>
                <Text style={styles.title}>Size</Text>
            </View>
            <View style={styles.card} >
                <TouchableOpacity style={styles.cardSize} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?size=xs',
                        title: 'Size XS'
                    })
                }} >
                    <Text>XS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardSize} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?size=s',
                        title: 'Size S'
                    })
                }}>
                    <Text>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardSize} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?size=m',
                        title: 'Size M'
                    })
                }}>
                    <Text>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardSize} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?size=l',
                        title: 'Size L'
                    })
                }}>
                    <Text>L</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardSize} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?size=xl',
                        title: 'Size XL'
                    })
                }}>
                    <Text>XL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardSize} onPress={() => {
                    this.props.navigation.push('FilterData',{
                        url : '?size=xxl',
                        title: 'Size XXL'
                    })
                }}>
                    <Text>XXL</Text>
                </TouchableOpacity>
            </View> 
            <View style={{paddingTop: 16, paddingLeft: 14}}>
                <Text style={styles.title}>Category</Text>
            </View>
            <View style={styles.cardCategory} >
                <TouchableOpacity style={{height: 40, width: 100, marginRight: 22, marginTop: 12, justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: 'black',  borderRadius: 8}}>
                    <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 40, width: 100, marginRight: 22, marginTop: 12, justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: 'black',  borderRadius: 8}}>
                    <Text>Women</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 40, width: 100, marginRight: 22, marginTop: 12, justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: 'black',  borderRadius: 8}}>
                    <Text>Men</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 40, width: 100, marginRight: 22, marginTop: 12, justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: 'black',  borderRadius: 8}}>
                    <Text>Boys</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 40, width: 100, marginRight: 22, marginTop: 12, justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: 'black',  borderRadius: 8}}>
                    <Text>Girls</Text>
                </TouchableOpacity>
            </View> 
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    card : {
        height: 92,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        flexWrap: 'wrap'
    },
    cardCategory : {
        height: 140,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 12,
        flexWrap: 'wrap'
    }, 
    cardSize : {
        height: 40, 
        width: 40, 
        justifyContent: 'center', 
        alignItems : 'center', 
        borderWidth: 1, 
        borderColor: 'black',  
        borderRadius: 8
    }
})

export default FilterProduct
