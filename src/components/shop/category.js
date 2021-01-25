import axios from 'axios'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Modal } from 'react-native'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'native-base'
import { Block, Filter, IconBack, Product4, Search, Sort } from '../../assets';
import Rating, { RatingProduct } from '../product/rating';
import {API_URL} from "@env"

export class Category extends Component {
    
    constructor(){
        super();
        this.state = {
            product :  [],
            modalVisible: false,
            backgroundColorPop: 'white',
            colorPop: 'black',
            backgroundColorNew: 'white',
            colorNew: 'black',
            backgroundColorRev: 'white',
            colorRev: 'black',
            backgroundColorHigh: 'white',
            colorHigh: 'black',
            backgroundColorLow: 'white',
            colorLow: 'black',
            sort : ''
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    

    handleGetProduct = () => {
        const params = this.props.route.params.url
        axios
        .get(API_URL + '/search' + params)
        .then((data) => {
            //console.log(data.data.data)
            this.setState({
                product: data.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getProductSort = () => {
        const sort = this.state.sort
        axios
        .get(API_URL + '/products' + sort)
        .then((data) => {
            console.log(data.data.data.products)
            this.setState({
                product : data.data.data.products
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount =() => {
        this.handleGetProduct();
    }
    componentDidUpdate = (prevState, prevProps) =>  {
      if(prevProps.product === this.state.product){
          this.getProductSort()
      }
    }

    goToDetail = (id) => {
        this.props.navigation.navigate('Detail', id)
    }
    goToFilter = () => {
        this.props.navigation.navigate('FilterProduct')
    }
    goToSearch = () => {
        this.props.navigation.navigate('SearchProduct')
    }

    render() {
        console.log(this.state.sort)
        const {title} = this.props.route.params
        const {product, modalVisible} = this.state
        return (
            <View>

                {/* header */}
                <View style={{backgroundColor: 'white'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 24}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image source={IconBack} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goToSearch}>
                            <Image source={Search} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Title&filter */}
                <View  style={{backgroundColor: 'white', paddingHorizontal: 15}}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={{backgroundColor:'#F9F9F9', height: 24, width: 343, alignSelf: 'center', marginBottom: 17, marginTop: 17, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 6}}>
                        {/* filter */}
                        <TouchableOpacity 
                        activeOpacity={0.6} 
                        style={{flexDirection: 'row'}}
                        onPress={this.goToFilter}
                        >
                            <Image source={Filter}/>
                            <Text>Filters</Text>
                        </TouchableOpacity>
                        {/* sorting product */}
                        <TouchableOpacity 
                        activeOpacity={0.6}  
                        style={{flexDirection: 'row'}}
                        onPress={() => {
                            this.setModalVisible(true);
                          }}
                        >
                            <Image source={Sort}/>
                            <Text>Price: lowest to high</Text>
                        </TouchableOpacity>
                        <View>
                            <Image source={Block} />
                        </View>
                    </View>
                </View>



                {/* Modal */}
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Sort By</Text>
                            <View>
                                <Button onPress={() => {
                                   this.setState({
                                    backgroundColorPop: 'red',
                                    colorPop: 'white',
                                    backgroundColorNew: 'white',
                                    colorNew: 'black',
                                    backgroundColorRev: 'white',
                                    colorRev: 'black',
                                    backgroundColorHigh: 'white',
                                    colorHigh: 'black',
                                    backgroundColorLow: 'white',
                                    colorLow: 'black',
                                    sort: '?popular=desc'
                                   })
                                }} style={{...styles.sortButton, backgroundColor: this.state.backgroundColorPop}} >
                                    <Text style={{fontSize: 16, fontWeight: '500', color: this.state.colorPop}}>Popular</Text>
                                </Button>
                                <Button onPress={() => {
                                   this.setState({
                                    backgroundColorPop: 'white',
                                    colorPop: 'black',
                                    backgroundColorNew: 'red',
                                    colorNew: 'white',
                                    backgroundColorRev: 'white',
                                    colorRev: 'black',
                                    backgroundColorHigh: 'white',
                                    colorHigh: 'black',
                                    backgroundColorLow: 'white',
                                    colorLow: 'black',
                                    sort: '?new=desc'
                                   })
                                }} style={{...styles.sortButton, backgroundColor: this.state.backgroundColorNew}} >
                                    <Text style={{fontSize: 16, fontWeight: '500', color: this.state.colorNew}}>Newest</Text>
                                </Button>
                                <Button onPress={() => {
                                   this.setState({
                                    backgroundColorPop: 'white',
                                    colorPop: 'black',
                                    backgroundColorNew: 'white',
                                    colorNew: 'black',
                                    backgroundColorRev: 'red',
                                    colorRev: 'white',
                                    backgroundColorHigh: 'white',
                                    colorHigh: 'black',
                                    backgroundColorLow: 'white',
                                    colorLow: 'black',
                                    sort: '?review=desc'
                                   })
                                }} style={{...styles.sortButton, backgroundColor: this.state.backgroundColorRev}} >
                                    <Text style={{fontSize: 16, fontWeight: '500', color: this.state.colorRev}}>Customer review</Text>
                                </Button>
                                <Button onPress={() => {
                                   this.setState({
                                    backgroundColorPop: 'white',
                                    colorPop: 'black',
                                    backgroundColorNew: 'white',
                                    colorNew: 'black',
                                    backgroundColorRev: 'white',
                                    colorRev: 'black',
                                    backgroundColorHigh: 'red',
                                    colorHigh: 'white',
                                    backgroundColorLow: 'white',
                                    colorLow: 'black',
                                    sort: '?price=desc'
                                   })
                                }} style={{...styles.sortButton, backgroundColor: this.state.backgroundColorHigh}} >
                                    <Text style={{fontSize: 16, fontWeight: '500', color: this.state.colorHigh}}>Price: lowest to high</Text>
                                </Button>
                                <Button onPress={() => {
                                   this.setState({
                                    backgroundColorPop: 'white',
                                    colorPop: 'black',
                                    backgroundColorNew: 'white',
                                    colorNew: 'black',
                                    backgroundColorRev: 'white',
                                    colorRev: 'black',
                                    backgroundColorHigh: 'white',
                                    colorHigh: 'black',
                                    backgroundColorLow: 'red',
                                    colorLow: 'white',
                                    sort: '?price=asc'
                                   })
                                }} style={{...styles.sortButton, backgroundColor: this.state.backgroundColorLow}} >
                                    <Text style={{fontSize: 16, fontWeight: '500', color: this.state.colorLow}}>Price: highest to low</Text>
                                </Button>
                                
                            </View>
                            <Button
                                style={{ ...styles.openButton, backgroundColor: "red" }}
                                onPress={() => {
                                this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

                {/* product */}
                <ScrollView style={{marginTop: 18, marginBottom: 18}}>
                    {product && product.map(({id, product_name, store_name, total_rating, product_price, product_img}, index) => {
                        let httpImage = { uri : API_URL + product_img.split(',')[0]}
                        return (
                        <TouchableOpacity style={styles.card} key={index} onPress={() => {
                            this.goToDetail(id)
                        }}>
                            <Image style={styles.img} source={httpImage} />
                            <View style={{marginLeft: 11, paddingTop: 11}}>
                                <Text>{product_name}</Text>
                                <Text>{store_name}</Text>
                                <RatingProduct total_rating={Math.round(total_rating)}/>
                                <Text>Rp. {product_price}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    img : {
        height: 104, 
        width: 104,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
    card : {
        height: 104, 
        width: 343,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 30,
        alignSelf: 'center',
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        flexDirection: 'row'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        width: '100%',
        height: 400,
        marginTop:400,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        borderRadius: 10,
        height: 50,
        width: 150,
        padding: 10,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18
      },
      sortButton: {
        paddingHorizontal: 16,
        height: 48, 
        width: '100%', 
    }
})

export default Category
