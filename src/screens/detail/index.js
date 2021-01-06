import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Product2, Product3, Share, Star } from '../../assets'
import Icon from 'react-native-vector-icons/Fontisto';
import DropDownPicker from 'react-native-dropdown-picker';
import Product from '../../components/product';

export class DetailProduct extends Component {
    
    constructor(){
        super();
        this.state = {
            size: 'Size',
            color: 'color',
            like: false
        }
    }
    

    render() {
        return (
            <ScrollView>
               <View style={styles.container}>
                   <TouchableOpacity onPress={ () => {
                       this.props.navigation.goBack()
                   }}>
                        <Image source={IconBack}/>  
                   </TouchableOpacity>
                   <Text style={styles.textTitle}>Short Dress</Text>
                   <TouchableOpacity>
                        <Image source={Share} />
                   </TouchableOpacity>
               </View>
               <ScrollView  horizontal >
                <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4, position: 'relative'}}>
                    <Image style={{position: 'absolute', height: 413, width: 275,}} source={Product2} />
                </View>
                <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4,position: 'relative'}}>
                    <Image style={{position: 'absolute', height: 413, width: 275,}} source={Product3} />
                </View>
                <View style={{height: 413, width: 275, backgroundColor: 'grey', marginRight: 4}}></View>
               </ScrollView>

               {/* Dropdown */}
               <View style={{paddingHorizontal: 16}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <DropDownPicker
                            items={[
                                {label: 'Size', value: 'Size', hidden: true},
                                {label: 'M', value: 'm'},
                                {label: 'L', value: 'xl'},
                                {label: 'XL', value: 'xl'},
                            ]}
                            defaultValue={this.state.size}
                            containerStyle={{height: 60}}
                            style={{marginTop: 12, backgroundColor: 'white', height: 40, width: 138, borderColor: '#F01F0E' }}
                            itemStyle={{
                                justifyContent: 'center'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({
                                size: item.value
                            })}
                        />
                        <DropDownPicker
                            items={[
                                {label: 'color', value: 'color', hidden: true},
                                {label: 'Black', value: 'black'},
                                {label: 'Red', value: 'red'},
                                {label: 'Green', value: 'green'},
                            ]}
                            defaultValue={this.state.color}
                            containerStyle={{height: 60}}
                            style={{marginTop: 12, backgroundColor: 'white', height: 40, width: 138, borderColor: '#F01F0E' }}
                            itemStyle={{
                                justifyContent: 'center'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({
                                color: item.value
                            })}
                        />
                        <TouchableOpacity onPress={() => {
                                this.setState({
                                    like: !this.state.like
                                })
                        }} >
                            <View style={{marginTop: 16, height: 36, width: 36, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 16}}>
                                <Icon name="heart-alt" color={this.state.like ? 'red' : 'grey' }/>   
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 22, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{fontSize : 24, fontWeight: 'bold'}}>H&M</Text>
                            <Text style={{fontSize: 11, color: 'grey'}}>Short black dress</Text>
                        </View>
                        <Text style={{fontSize : 24, fontWeight: 'bold'}}>Rp.100,000</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={Star}/>
                        <Image source={Star}/>
                        <Image source={Star}/>
                        <Image source={Star}/>
                        <Image source={Star}/>
                        <Text style={{fontSize: 10, marginLeft: 3, color:'#9B9B9B'}}>(0)</Text>
                    </View>
                    <View >
                        <Text>Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.</Text>
                    </View>
               </View>
                <View style={{height: 112, width: '100%', backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <View style={{height: 48, width: 343, borderRadius: 25, backgroundColor: '#DB3022',justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white'}}>ADD TO CART</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 24}}>
                    <Text style={{fontSize: 18, fontWeight: '700'}}>You can also like this</Text>
                    <Text style={{fontSize: 11, color: 'grey'}} >12 items</Text>
                </View>
                <Product />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    textTitle :{
        fontSize: 18,
        fontWeight: '600'
    }
})

export default DetailProduct
