import {Input } from 'native-base'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Switch } from 'react-native'
import { IconBack, Search } from '../../assets'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
//import moment from 'moment';

export class Setting extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            date:"",
            isEnabledSales: false,
            isEnabledNew: false,
            isEnabledStatusChange: false
        }
      }
    
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

    render() {
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
                        <Input placeholder="FullName"/>
                    </View>
                    <View style={styles.inptText} >
                        <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1900-05-01"
                        maxDate="2021-12-12"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderColor: 'transparent'
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 55}}>
                        <Text style={styles.subtitle}>Password</Text>
                        <TouchableOpacity>
                            <Text>Change</Text>
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
    }
})

export default Setting
