import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Go} from '../../assets';
import {useSelector} from 'react-redux'
import {API_URL} from '@env'
import axios from 'axios';

const ChatList = ({navigation, chatRoom}) => {
    const auth = useSelector((state) => state.auth)
    const [name, setName] = useState('loading')
    useEffect(() => {
        getName()
    }, [chatRoom])
    console.log(chatRoom)
    const getName = () => {
        const seller =  chatRoom.split("S")[1].split("B")[1]
        const customer = chatRoom.split("S")[1].split("B")[0]
        if(auth.level === 1){
            axios.get(API_URL + '/user/name/' + seller)
            .then((res) => {
                console.log('ini akanmenampilkan nama',res.data.data.username)
                setName(res.data.data.username)
            })
            .catch(({response}) => {
                console.log(response)
            })
        }else{
            axios.get(API_URL + '/user/name/' + customer)
            .then((res) => {
                console.log('ini akanmenampilkan nama',res.data.data.username)
                setName(res.data.data.username)
            })
            .catch(({response}) => {
                console.log(response)
            })
        }
    }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate('chatRoom', {
                room_id: chatRoom
            });
        }}>
        <View style={styles.accordian}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{color: 'grey'}}>History chat {chatRoom}</Text>
          </View>
          <Image source={Go} />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    borderWidth: 1,
    borderColor: 'grey',
    width: 1000,
    left: -16,
    marginTop: 17,
  },
  accordian: {
    marginTop: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ChatList;
