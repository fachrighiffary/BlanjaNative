import axios from 'axios'
import { Input } from 'native-base'
import React, {useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconNext } from '../../../assets'

const Register = ({navigation}) => {
   const [username, setusername] = useState('')
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const [level_id, setlevel_id] = useState(2)

   const handleSubmit = () => {
      const data = {
          username,
          email,
          password,
          level_id
      }
      console.log('data before send: ', data)
      axios.post('http://10.0.2.2:8000/auth/register', data)
      .then((res) => {
          console.log(res)
          navigation.navigate('Login')
      })
      .catch((err) => {
          console.log(err)
      })
   }

    return (
        <View style={styles.container}>
            <View style={styles.rowTitle}>
                <Text style={styles.textTitle}>Sign Up</Text>
            </View>
            <View style={styles.containerForm}>
                <View style={styles.input}>
                    <Input 
                    placeholder='Name'
                    name="username" 
                    value={username} onChangeText={(username) => setusername(username)} 
                    />
                </View>
                <View style={styles.input}>
                    <Input 
                    placeholder='Email' 
                    name="email" 
                    value={email} 
                    onChangeText={(email) => setemail(email)}
                    />
                </View>
                <View style={styles.input}>
                    <Input 
                    secureTextEntry={true} 
                    placeholder='Password'
                    value={password} 
                    name="password"
                    onChangeText={(password) => setpassword(password)} 
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, marginRight: 10}}>
                <Text style={{fontSize: 14}}>Already have an account?</Text>
                <TouchableOpacity style={{marginLeft:7}} onPress={() => {
                    navigation.navigate('Login')
                }}>
                    <Image source={IconNext} />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 32 }}>
                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
                    <Text style={{color: 'white'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 15,
        paddingTop: 25
    },
    containerForm: {
        alignItems: 'center',
        marginTop: 65
    },
    rowTitle : {
        marginTop: 34
    },
    textTitle : {
        fontSize: 34,
        fontWeight: 'bold'
    },
    input : {
        height: 64,
        width: 343,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: 'black',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 8,
    },
    btnLogin: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
            height: 48,
        width: 343, 
        backgroundColor: '#DB3022',
        borderRadius: 25,
        marginTop: 32
    },


})

export default Register
