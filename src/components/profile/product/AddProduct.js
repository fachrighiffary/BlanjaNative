import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack } from '../../../assets'
import DropDownPicker from 'react-native-dropdown-picker';
import { Input } from 'native-base';

export class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            condition: '',
        }
    }
    uploadButton = () => {
        alert('Upload Image')
    }

    render() {
        return (
            <ScrollView>
                <View style={{paddingHorizontal: 16, paddingTop: 20}}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Product</Text>
                </View>
                <View style={styles.container}>
                    <View style={{marginBottom: 20}}>
                        <Text style={{marginLeft: 7, fontSize: 18, marginBottom: 10}}>Product Name</Text>
                        <View style={styles.input}>
                            <Input placeholder="input product name" />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{marginLeft: 7, fontSize: 18, marginBottom: 10}}>Categpry</Text>
                        <DropDownPicker
                            items={[
                                {label: 'T-Shirt', value: '1'},
                                {label: 'Short', value: '2',},
                                {label: 'Jacket', value: '3'},
                                {label: 'Pants', value: '4',},
                                {label: 'Shoes', value: '5'}
                            ]}
                            defaultValue={this.state.category}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({
                                category: item.value
                            })}
                            placeholder="Select Category"
                        />
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Price</Text>
                        <View style={styles.input}>
                            <Input placeholder="input price" keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Quantity</Text>
                        <View style={styles.input}>
                            <Input placeholder="input quantity" keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Size</Text>
                        <View style={styles.input}>
                            <Input placeholder="exp : M, L / 39,40,41" keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Color</Text>
                        <View style={styles.input}>
                            <Input placeholder="exp : white, green, blue" keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{marginLeft: 7, fontSize: 18, marginBottom: 10}}>Product Condition</Text>
                        <DropDownPicker
                            items={[
                                {label: 'New', value: 'NEW'},
                                {label: 'Second', value: 'SECOND',},
                            ]}
                            defaultValue={this.state.condition}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({
                                condition : item.value
                            })}
                            placeholder="Select Condition"
                        />
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Image</Text>
                        <TouchableOpacity 
                        activeOpacity={0.6} 
                        style={styles.input}
                        onPress={this.uploadButton}
                        >
                            <Text>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn}>
                            <Text style={{color: 'white', fontSize: 18}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    container : {
        paddingHorizontal: 16
    },
    input : { 
        height: 42,
        width: 360,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },

    btn : {
        height: 40, 
        width: 200,
        backgroundColor: '#DB3022',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AddProduct
