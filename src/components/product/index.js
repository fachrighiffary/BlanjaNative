import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Image1, Product1, Star0 } from '../../assets'

export class Product extends Component {
    
    Detail = () => {
        this.props.navigation.navigate('Detail')
    }
    render() {
        return (
            <>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 22}}>
                <TouchableOpacity style={styles.card} onPress={this.Detail}>
                    <View style={{position: 'relative'}}>
                        <Image style={{position: 'relative', height: 184, width: 148, borderRadius: 15}}  source={Product1} />
                        <View style={{height: 24, width: 40, backgroundColor: 'black', position: 'absolute', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 8, marginLeft: 8}}>
                            <Text style={{color: 'white', fontSize: 11}}>New</Text>
                        </View>
                    </View>
                    
                    {/* Rating Star */}
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Image source={Star0} />
                        <Image source={Star0} />
                        <Image source={Star0} />
                        <Image source={Star0} />
                        <Image source={Star0} />
                        <Text style={{fontSize: 10, marginLeft: 3, color:'#9B9B9B'}}>(0)</Text>
                    </View>
                    <View style={{marginTop: 7}}>
                        <Text style={{color: '#9B9B9B'}}>OVS</Text>
                    </View>
                    <View style={{maxWidth: 148, maxHeight: 20, position: 'relative'}}>
                         <Text style={{fontSize : 19, fontWeight: 'bold'}}>Blouse</Text>
                         <Text style={{fontSize : 19, fontWeight: 'bold'}}>Rp. 10.000</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            </>
        )
    }
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
        width: 148,
        marginRight:20, 
        marginLeft: 20
    }
})

export default Product
