import React, {useEffect, useState} from 'react'
import {Input} from 'native-base'
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconSend } from '../../assets'
import axios from 'axios'
import {useSelector} from 'react-redux';
import {useSocket} from '../../public/context/SocketProvider'
import {API_URL} from '@env'

let number = 0
const ChatRoom = ({navigation, route}) => {

    useEffect(() => {
        getNewMessage()
    }, [])

    const socket = useSocket()

    useEffect(() => {
      socket.on('refresh', (someEvent) => {
          getNewMessage()
      })
      return () => socket.off('refresh');
    }, [])

    const auth = useSelector((state) => state.auth)
    const room_id = route.params.room_id
    const splitRoom = room_id.split('S')[1].split('B')
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const seller = splitRoom[0]
    const buyer = splitRoom[1]
    const sender = auth.id

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const sendMessage = () => {
        if(message != ''){
            const Msg = {
                seller,
                buyer,
                chatRoom: room_id,
                sender,
                message
            }
            axios.post(API_URL + '/chat/addMessage', Msg, config)
            .then((res) => {
                ToastAndroid.show('Message Sent', ToastAndroid.SHORT, ToastAndroid.CENTER);
                console.log(res.data)
                setMessage('')                
            })
            .catch(({response}) => {
                console.log(response)
            })
        }
    }
    const getNewMessage = () => {
        axios.get(API_URL + '/chat/newMessage/' + room_id)
        .then(({data}) => {
            setChat(data.data)
        })
        .catch(({response}) => {
            console.log(response.data)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{width: 30}} onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>Chat Seller</Text>
            </View>
            <View style={styles.containerChat}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={chat}
                    inverted
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        item.sender_id == auth.id ? (
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={{marginRight: 20,marginBottom: 5, fontWeight: 'bold'}}>You</Text>
                                <View style={styles.sender}>
                                    <Text>{item.message}</Text>
                                </View>
                            </View>
                            ) : (
                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={{marginLeft: 20,marginBottom: 5, fontWeight: 'bold'}}>{item.sender_name}</Text>
                                <View style={styles.reciver}>
                                    <Text>{item.message}</Text>
                                </View>
                            </View>
                            )
                     )}
                    
                />
               
            </View>
            <View style={styles.addNewMessage}>
                <TextInput 
                    style={styles.inputMsg}
                    multiline={true}
                    onSubmitEditing={sendMessage}
                    placeholder='input chat' 
                    value={message}
                    onChangeText={(text) => {
                        setMessage(text)
                    }}             
                />
                <TouchableOpacity style={styles.btnSend} onPress={sendMessage}>
                    <Image source={IconSend} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 20,
        flex: 1
    },
    header : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reciver : {
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        minHeight: 60,
        maxWidth: 250,
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        marginBottom: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius : 10,
        borderBottomRightRadius: 40
      

    },
    sender : {
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 10,
        minHeight: 60,
        maxWidth: 250,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        marginBottom: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 40,
        borderTopRightRadius : 40
    },
    containerChat: {
        marginTop: 20,
        flex: 1,
    },
    addNewMessage: {
        height: 50,
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnSend : {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10
    },
    inputMsg: { 
        height:50, 
        width: '85%',
        borderWidth: 1, 
        borderRadius: 15, 
        paddingHorizontal: 15
    }
})

export default ChatRoom
