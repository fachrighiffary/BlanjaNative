import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Jacket, Pants, Shoes, Short, Tshirt } from '../../assets'

const AllCategory = ({navigation}) => {
return (
        <ScrollView>
            <View style={styles.promoCard}>
                <Text style={{color: 'white', fontSize: 24}}>SUMMER SALES</Text>
                <Text style={{color: 'white'}}>Up to 50%</Text>
            </View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Category', {
                    url : '?key=T-shirt',
                    title: 'T-Shirt'
                })
            }}>
                <View style={styles.ctgCard}>
                    <Text style={styles.txtCard}>T-Shirt</Text>
                    <Image style={styles.imgcard} source={Tshirt} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Category', {
                    url : '?key=Short',
                    title: 'Short'
                })
            }}>
                <View style={styles.ctgCard}>
                    <Text style={styles.txtCard}>Short</Text>
                    <Image style={styles.imgcard} source={Short} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Category', {
                    url : '?key=Jacket',
                    title: 'Jacket'
                })
            }}>
                <View style={styles.ctgCard}>
                    <Text style={styles.txtCard}>Jacket</Text>
                    <Image style={styles.imgcard} source={Jacket} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Category', {
                    url : '?key=Pants',
                    title: 'Pants'
                })
            }}>
                <View style={styles.ctgCard}>
                    <Text style={styles.txtCard}>Pants</Text>
                    <Image style={styles.imgcard} source={Pants} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Category', {
                    url : '?key=Shoes',
                    title: 'Shoes'
                })
            }}>
                <View style={styles.ctgCard}>
                    <Text style={styles.txtCard}>Shoes</Text>
                    <Image style={styles.imgcard} source={Shoes} />
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
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
    },
    ctgCard: {
        height : 100,
        width: 343,
        alignSelf: 'center',
        marginBottom: 16,
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

export default AllCategory
