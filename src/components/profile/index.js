import axios from 'axios'
import React, { Component } from 'react'
import { useState } from 'react'
import { Button } from 'native-base'
import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Go, ImgProfile, Search } from '../../assets'
import { API_URL } from "@env"
import { setLoginFalse } from '../../public/redux/ActionCreators/Auth'


class Profile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if(!this.props.auth.isLogin){
                this.props.navigation.navigate('Login')
            }
        });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }    

    logout = () => {
        this.setModalVisible(true);
    }

    handleYes = () => {
         const config = {
            headers: {
              'x-access-token': 'Bearer ' + this.props.auth.token
            },
          };
        axios
        .post(API_URL + '/auth/logout', config)
        .then((data) => {
            this.props.dispatch(setLoginFalse())
            this.props.navigation.navigate('Login')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        const {modalVisible} = this.state
        //console.log(API_URL)
        //console.log('ini adalah props redux',this.props.auth)
        const {navigation, auth} = this.props
        let SellerOnly;
        if (auth.level == 2){
            SellerOnly = 
                <>
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
                </>
            
        }else{
            SellerOnly = 
            <>
             <TouchableOpacity onPress={() => {
                            navigation.navigate('MyProduct')
                        }}>
                    <View style={styles.accordian}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>My Product</Text>
                            <Text style={{color: 'grey'}}>Already have 10 Product</Text>
                        </View>
                    <Image source={Go}/>
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
            </>
        }

        return(
            <ScrollView style={{padding: 14}}>
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
                            <Text>{auth.name}</Text>
                            <Text>{auth.email}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                            navigation.navigate('MyOrder')
                        }}>
                    <View style={styles.accordian}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>My Order</Text>
                            <Text style={{color: 'grey'}}>See Order History</Text>
                        </View>
                    <Image source={Go}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.line} />
                {SellerOnly}
                <TouchableOpacity onPress={() => {
                        navigation.navigate('listChat')
                    }}>
                    <View style={styles.accordian}>
                        <View>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Chat List</Text>
                            <Text style={{color: 'grey'}}>History chat</Text>
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
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.btn} >
                        <Text style={{color: 'white'}}>LOGOUT</Text>
                    </View>
                </TouchableOpacity>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Apakah Anda Yakin Ingin Keluar?</Text>
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
                                this.setModalVisible(!modalVisible);
                            }}
                            >
                            <Text style={styles.textStyle}>Yes</Text>
                            </Button>
                        </View>
                    </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
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
    },
    btn : {
        height: 50,
        width: 200,
        marginTop: 30,
        borderRadius: 9,
        backgroundColor: '#DB3022',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        height: 200,
        width: 300,
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
      }
})


const mapStateToProps = ({auth}) => {
    return {
        auth,
    };
};
export default connect(mapStateToProps)(Profile);
