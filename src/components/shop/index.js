import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Search } from '../../assets'
import ShopNavigation from '../shopNavigation'

const Shop = ({navigation}) => {
    return (
        <>
            <View style={{ paddingHorizontal: 16,width: '100%',marginBottom: 20, justifyContent: 'space-between', flexDirection: 'row', marginTop: 24}}>
                <TouchableOpacity onPress={()=> {
                    navigation.goBack()
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <Text style={{fontSize: 18, fontWeight: '800'}}>Categories</Text>
                <TouchableOpacity>
                    <Image source={Search} />
                </TouchableOpacity>
            </View>
            <ShopNavigation/>
        </>
    )
}

export default Shop
