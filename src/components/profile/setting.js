import {Button, Input } from 'native-base'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Switch, Modal, TextInput,ToastAndroid } from 'react-native'
import { IconBack, Search } from '../../assets'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import {connect, useSelector} from 'react-redux'
import axios from 'axios';
import {API_URL} from '@env'
//import moment from 'moment';

export class Setting extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            date:"",
            isEnabledSales: false,
            isEnabledNew: false,
            isEnabledStatusChange: false,
            modalVisible: false,
            password: '',
            newPassword : '',

        }
      }
      showToast = () => {
        ToastAndroid.show("Password berhasil dirubah", ToastAndroid.SHORT);
      };
      showErrorToast = () => {
        ToastAndroid.show("Password Harus sama", ToastAndroid.SHORT);
      };
      showEmptyToast = () => {
        ToastAndroid.show("Colomn tidak boleh kosong", ToastAndroid.SHORT);
      };
      showLengthToast = () => {
        ToastAndroid.show("password harus lebih dari 4", ToastAndroid.SHORT);
      };
    
      toggleSwitchSales = () => {
        this.setState({
            isEnabledSales: !this.state.isEnabledSales
        })
      }
      toggleSwitchNew = () => {
        this.setState({
            isEnabledNew: !this.state.isEnabledNew,
        })
      }

      toggleSwitchStatusChange = () => {
        this.setState({
            isEnabledStatusChange: !this.state.isEnabledStatusChange
        })
      }
      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }    

      changePassword = () => {
        this.setModalVisible(true);
    }
    handleYes = () => {
        const {password, newPassword, modalVisible} = this.state
        if(password === '' || newPassword === ''){
            this.showEmptyToast()
        }else if(password !== newPassword){
            this.showErrorToast()
        }else if(password.split('').length < 5){
            this.showLengthToast()
        }
        else{
            const data = {
                email : this.props.auth.email,
                newPassword : this.state.newPassword
            }
            console.log(data)
            axios.patch(`${API_URL}/auth/reset-password`, data)
            .then((res) => {
                console.log(res)
                this.showToast()
                this.setModalVisible(!modalVisible);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        const {name} = this.props.auth
        const {modalVisible} = this.state
        return (
            <View>
                {/* header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image source={IconBack}/>
                    </TouchableOpacity>
                    <Image source={Search} />
                </View>
                
                {/* body */}
                <View style={styles.containerBody}>
                    <Text style={styles.title}>Setting</Text>
                    <Text style={styles.titleDesc}>Personal Information</Text>
                    <View style={styles.inptText}>
                        <Input placeholder={name}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 55}}>
                        <Text style={styles.subtitle}>Password</Text>
                        <TouchableOpacity onPress={this.changePassword}>
                            <Text style={{color: 'red'}}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inptText}>
                        <Input disabled secureTextEntry={true} value="Ini adalah password" />
                    </View>
                    <View style={{marginTop: 55}}>
                        <Text style={styles.subtitle}>Notification</Text>
                    </View>
                    <View style={styles.btnswitchcontainer}>
                        <Text style={{fontSize: 14}}>Sales</Text>
                        <Switch
                        trackColor={{ false: "#767577", true: "#9B9B9B" }}
                        thumbColor={this.state.isEnabledSales ? "#2AA952" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitchSales}
                        value={this.state.isEnabledSales}
                        />
                    </View>
                    <View style={styles.btnswitchcontainer}>
                        <Text style={{fontSize: 14}}>New Arrival</Text>
                        <Switch
                        trackColor={{ false: "#767577", true: "#9B9B9B" }}
                        thumbColor={this.state.isEnabledNew ? "#2AA952" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitchNew}
                        value={this.state.isEnabledNew}
                        />
                    </View>
                    <View style={styles.btnswitchcontainer}>
                        <Text style={{fontSize: 14}}>Delivery status changes</Text>
                        <Switch
                        trackColor={{ false: "#767577", true: "#9B9B9B" }}
                        thumbColor={this.state.isEnabledStatusChange ? "#2AA952" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitchStatusChange}
                        value={this.state.isEnabledStatusChange}
                        />
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Change Password</Text>
                        <TextInput 
                            placeholder="Password"
                            style={styles.inputPass}
                            secureTextEntry={true} 
                            name="password" 
                            onChangeText={(text) => { this.setState({ password: text }) }} 
                        />
                        <TextInput 
                            placeholder="Retype Password"  
                            style={styles.inputPass}
                            secureTextEntry={true} 
                            name="newPassword"
                            onChangeText={(text) => { this.setState({ newPassword: text }) }} 
                        />
                        <View style={{marginTop: 20, flexDirection: 'row', width: 250, justifyContent: 'space-between'}}>
                            <Button
                            style={{...styles.closeButton, backgroundColor: 'lightgrey'}}
                            onPress={() => {
                                this.setModalVisible(!modalVisible);
                            }}
                            >
                            <Text style={{...styles.textStyle, color: 'black'}}>No</Text>
                            </Button>
                            <Button
                            style={styles.closeButton}
                            onPress={() => {
                                this.handleYes()
                            }}
                            >
                            <Text style={styles.textStyle}>Yes</Text>
                            </Button>
                        </View>
                    </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginTop: 10,
    },
    containerBody : {
        paddingHorizontal: 16
    },
    title: {
        fontSize : 34,
        fontWeight: 'bold'
    },
    titleDesc : {
        marginTop : 23,
        fontSize: 16
    },
    inptText : {
        height: 64,
        width: 343,
        backgroundColor: 'white',
        marginTop: 21,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    subtitle : {
        fontSize: 16, 
        fontWeight: 'bold'
    },
    btnswitchcontainer : {
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        marginTop: 420,
        height: 370,
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      closeButton: { 
        backgroundColor: "#DB3022" ,
        height: 40, 
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 25
      },
      inputPass: {
          height: 50, 
          width: 330, 
          borderWidth: 1, 
          borderRadius: 10, 
          paddingHorizontal: 10,
          marginTop: 20
        }
})

const mapStateToProps = ({auth}) => {
    return{
        auth
    }
}

export default connect(mapStateToProps)(Setting)
