import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Image1, Product1, Star0 } from '../../assets'
import RatingProduct from './rating'
import {API_URL} from "@env"

const Product = ({status, navigation, url}) => {
    const toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios
        .get(API_URL + '/products' + url)
        .then(res => {
            //console.log(res.data.data.products)
            setProducts(res.data.data.products)
            setLoading(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const goToDetail = (id) => {
        navigation.push('Detail', id)

    }

    return(
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 22}}>
        {loading ? (
            <>
                {product && product.map(
                    ({product_name, product_color, product_size, product_img, product_price, store_name, total_rating, id}, index ) => {
                        let httpImage = { uri : API_URL + product_img.split(',')[0]}
                        return (
                            <TouchableOpacity style={styles.card}  onPress={() => {
                                goToDetail(id)
                            }} key={id}>
                                <View style={{position: 'relative'}} >
                                    <Image 
                                    style={{
                                        position: 'relative',
                                        height: 184, 
                                        width: 148, 
                                        borderRadius: 15
                                        }}  
                                        source={httpImage} />
                                    <View style={{height: 24, width: 40, backgroundColor: 'black', position: 'absolute', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 8, marginLeft: 8}}>
                                        <Text style={{color: 'white', fontSize: 11}}>{status}</Text>
                                    </View>
                                </View>
                                
                                {/* Rating Star */}
                                <RatingProduct total_rating={Math.round(total_rating)} />
                                <View style={{marginTop: 7}}>
                                    <Text style={{color: '#9B9B9B'}}>{store_name}</Text>
                                </View>
                                <View style={{maxWidth: 148, maxHeight: 20, position: 'relative'}}>
                                    <Text style={{fontSize : 19, fontWeight: 'bold'}}>{product_name}</Text>
                                    <Text style={{fontSize : 19, fontWeight: 'bold'}}>Rp.{toPrice(product_price)}</Text>
                                </View>
                            </TouchableOpacity>

                        )
                    }
                )}
            
            </>
        ) : (
            <View style={{height: 300, width: '100%', flexDirection:'row'}}>
                <View style={styles.shadow}>
                    <ActivityIndicator size='large' color="red" />
                </View>
                <View style={styles.shadow}>
                    <ActivityIndicator size='large' color="red" />
                </View>
                <View style={styles.shadow}>
                    <ActivityIndicator size='large' color="red" />
                </View>                              
            </View>
        )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header : {
        height: 260,
        width: '100%',
        backgroundColor: 'black',
        position: 'relative',
        display: 'flex',
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
        marginLeft: 16
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
        width: 150,
        marginRight:20, 
        marginLeft: 20,             
    },
    shadow : {
        height: 300, 
        width: 148,
        marginRight:20, 
        marginLeft: 20,   
        justifyContent: 'center',
        alignItems: 'center', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default Product
