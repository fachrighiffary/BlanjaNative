import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Go, ImgProfile, Search } from '../../assets'

const Profile = ({navigation}) => {
    return (
        <View style={{padding: 14}}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
                <Image source={Search} />
            </View>
            <View style={{marginTop: 33}}>
                <Text style={{fontSize: 34, fontWeight: 'bold'}}>My Profile</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 24}}>
                <View>
                    <Image style={{height: 64, width: 64, borderRadius: 32}} source={ImgProfile} />
                </View>
                <View style={{marginLeft: 18, marginTop: 10}}>
                    <View>
                        <Text>Fachri Ghiffary</Text>
                        <Text>fachrighiffary@gmail.com</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                        navigation.navigate('MyOrder')
                    }}>
                <View style={styles.accordian}>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>My Order</Text>
                        <Text style={{color: 'grey'}}>Already have 12 orders</Text>
                    </View>
                   <Image source={Go}/>
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={() => {
                        navigation.navigate('ShippingAddress')
                    }}>
                <View style={styles.accordian}>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Shipping Address</Text>
                        <Text style={{color: 'grey'}}>3 Address</Text>
                    </View>
                   <Image source={Go}/>
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={() => {
                        navigation.navigate('Setting')
                    }}>
                <View style={styles.accordian}>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Setting</Text>
                        <Text style={{color: 'grey'}}>Notification, password</Text>
                    </View>
                   <Image source={Go}/>
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    line : {
        borderWidth: 1, 
        borderColor:'grey', 
        width: 1000 ,
        left: -16, 
        marginTop: 17
    },
    accordian : {
        marginTop: 46, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})

export default Profile
