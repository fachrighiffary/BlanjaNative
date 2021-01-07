import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Product3, Product4, Product6, Product7 } from '../../assets'

const Men = () => {
    return (
        <ScrollView>
        <View style={styles.promoCard}>
            <Text style={{color: 'white', fontSize: 24}}>SUMMER SALES</Text>
            <Text style={{color: 'white'}}>Up to 50%</Text>
        </View>
        <TouchableOpacity>
            <View style={styles.ctgCard}>
                <Text style={styles.txtCard}>New</Text>
                <Image style={styles.imgcard} source={Product6} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.ctgCard}>
                <Text style={styles.txtCard}>Clothes</Text>
                <Image style={styles.imgcard} source={Product7} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.ctgCard}>
                <Text style={styles.txtCard}>Shoes</Text>
                <Image style={styles.imgcard} source={Product3} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.ctgCard}>
                <Text style={styles.txtCard}>Accesories</Text>
                <Image style={styles.imgcard} source={Product4} />
            </View>
        </TouchableOpacity>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    promoCard : {
        height : 100,
        width: 343,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB3022',
        marginTop: 16,
        borderRadius: 8
    },
    ctgCard: {
        height : 100,
        width: 343,
        alignSelf: 'center',
        marginTop: 16,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 8
    },
    imgcard: {
        height:100, 
        width: 171,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    txtCard: {
        alignSelf: 'center', 
        marginLeft : 23, 
        fontSize: 18, 
        fontWeight: 'bold'
    }
})
export default Men
