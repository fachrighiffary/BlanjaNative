import React,{useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconTrash, Notif } from '../../assets'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {API_URL} from '@env'

const Notification = ({navigation}) => {

    const auth = useSelector(state => state.auth)
    const [notif, setNotif] = useState(false)
    const [listNotif, setListNotif] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            {!auth.isLogin && navigation.navigate('Login')}
        });
        return unsubscribe
        
    }, [])

    useEffect(() => {
        getNotif()
    }, [])
    

    const getNotif = () => {
        const id = auth.id
        console.log(id)
        if(auth.level == 1){
            axios.get(API_URL + '/notification/seller/' + id)
            .then((res) => {
                console.log(res.data.data)
                setListNotif(res.data.data)
                setNotif(true)
            })
            .catch(({response}) => {
                console.log(response)
            })
        }else{
            axios.get(API_URL + '/notification/buyer/' + id)
            .then((res) => {
                console.log(res.data.data)
                setListNotif(res.data.data)
                setNotif(true)
            })
            .catch(({response}) => {
                console.log(response)
            })
        }
    }
    const deleteNotif = () => {
        console.log(auth.id)
        const id = auth.id
        if(setNotif === []){
            alert('halo')
        }else{
            if(auth.level === 1){
                axios.delete(`${API_URL}/notification/seller/${id}`)
                .then((res) => {
                    setNotif(false)
                })
                .catch(({response}) => {
                    console.log(response)
                })
            }else{
                axios.delete(`${API_URL}/notification/buyer/${id}`)
                .then((res) => {
                    setNotif(false)
                })
                .catch(({response}) => {
                    console.log(response)
                })
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress= {() => {
                        navigation.goBack()
                    }}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <Text style={{marginLeft: 20, fontSize: 24, fontWeight: 'bold'}}>Notification</Text>
                </View>
                <TouchableOpacity onPress={deleteNotif}>
                    <Image source={IconTrash} />
                </TouchableOpacity>
            </View>
            {notif ? (
                <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
                    {listNotif && listNotif.map(({message,  created_at, id}) => {
                        return(
                            <View style={styles.card} key={id} >
                                <Text>{message}</Text>
                                <Text style={{marginTop: 10}}>{created_at.split('T')[0]}</Text>
                            </View>
                        )
                    })}
                </ScrollView>

            ) : (
            <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={Notif} />
                <Text style={{fontSize: 24}}>No notification yet</Text>
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    header : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    card : {
        marginBottom: 20,
        padding: 10,
        minHeight: 80,
        width: 343,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        
    }
})

export default Notification
