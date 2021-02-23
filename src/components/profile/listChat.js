import { Container, Content, Header } from 'native-base'
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useSelector} from 'react-redux'
import { Go, IconBack } from '../../assets'
import {API_URL} from '@env'
import axios from 'axios'
import ChatList from './chatList'


const ListChat = ({navigation}) => {

    const auth = useSelector((state) => state.auth)
    const [chatList, setChatList] = useState([])
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };
    useEffect(() => {
        ChatRoom()
    },[])

    const ChatRoom = () => {
        if(auth.level == 1){
            axios.get(API_URL + '/chat/chatRoomSeller', config)
            .then((res) => {
                // console.log('ini seller'.res.data.data)
                setLoading(true)
                setChatList(res.data.data)
            })
            .catch(({response}) => {
                console.log(response)
                setErrMsg('Belum ada chat')
            })
        }else{
            axios.get(API_URL + '/chat/chatRoomBuyer', config)
            .then((res) => {
                // console.log('ini customer',res.data.data)
                setLoading(true)
                setChatList(res.data.data)
            })
            .catch(({response}) => {
                console.log(response)
                setErrMsg('Belum ada chat')
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <Text style={{marginLeft: 20, fontSize: 24}}>List Chat</Text>
            </View>
            <View>
                {loading ? (
                     <>
                        {chatList && chatList.map(({chatRoom}, index) => {
                            return(
                                <ChatList navigation={navigation} key={index} chatRoom={chatRoom}/>
                            )
                        })}
                    </>
                ) : (
                    <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
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
    },
})

export default ListChat
