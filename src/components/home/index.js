import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Image1, Product1, Star0 } from '../../assets'
import Product from '../product'

const Home = ({navigation}) => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Image source={Image1} style={styles.imgHeader}/>
                <Text style={styles.txtImg}>Street Clotes</Text>
            </View>
            <View style={styles.titleText}>
                <View style={{marginTop: 31}}>
                    <Text style={styles.fontTitle}>New</Text>
                    <Text style={styles.txtDesc}>You’ve never seen it before!</Text>
                </View>
                
                <TouchableOpacity >
                    <Text style={{marginTop: 51}}>view All</Text>
                </TouchableOpacity>
            </View>
            <Product  navigation={navigation}/>
            <View style={styles.titleText}>
                <View style={{marginTop: 31}}>
                    <Text style={styles.fontTitle}>Popular</Text>
                    <Text style={styles.txtDesc}>You’ve never seen it before!</Text>
                </View>
                
                <TouchableOpacity >
                    <Text style={{marginTop: 51}}>view All</Text>
                </TouchableOpacity>
            </View>
            <Product navigation={navigation}/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    header : {
        height: 260,
        width: '100%',
        backgroundColor: 'grey',
        position: 'relative',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
    },
    imgHeader : {
        width: '100%',
        height: 260,
        position: 'absolute'
    },
    txtImg : {
        position: 'absolute', 
        color: 'white', 
        fontSize: 34, 
        fontWeight: 'bold',
        marginLeft: 16,
        bottom: 25
    },
    titleText : {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    fontTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    txtDesc : {
        fontSize: 11,
        color: '#9B9B9B'
    },
    card : {
        height: 300, 
        width: 148,
        marginRight:20, 
        marginLeft: 20
    }
})


export default Home
