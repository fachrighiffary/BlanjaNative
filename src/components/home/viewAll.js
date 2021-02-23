import axios from 'axios';
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, Product4, Search } from '../../assets'
import {API_URL} from '@env'
import RatingProduct from '../product/rating';

class ViewAll extends Component {
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    constructor(){
        super();
        this.state = {
            data : [{title: '1'}, {title: '2'}, {title: '3'}],
            products : [],
            page: 1,
            isloading : false
        }
    }

    goToDetail = (id) => {
        this.props.navigation.push('Detail', id)
    }

    getData = () => {
        const param = this.props.route.params
        axios.get(`${API_URL}/products?${param}=desc&page=${this.state.page}`)
        .then((res) => {
            // console.log(res.data.data.products)
            this.setState({
                products: this.state.products.concat(res.data.data.products),
                isloading: false
            })
        })
        .catch(({response}) => {
            console.log(response)
        })
    }

    componentDidMount = () => {
        this.setState({
            isloading: true
        }, this.getData())
    }

    renderRow = ({item}) => {
        let httpImage = { uri : API_URL + item.product_img.split(',')[0]}
        return(
            <View style={{flexWrap: 'wrap',width: 500}}>
                <TouchableOpacity style={styles.card} onPress={() => {
                        this.goToDetail(item.id)
                    }}>
                    <Image style={styles.img} source={httpImage} />
                    <View style={{marginLeft: 11, paddingTop: 11}}>
                        <Text>{item.product_name}</Text>
                        <Text>{item.store_name}</Text>
                        <RatingProduct total_rating={Math.round(item.total_rating)}/>
                        <Text>Rp. {this.toPrice(item.product_price)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderFooter = () => {
        return (
            this.state.isloading ? 
            <View style={styles.loader}>
                <ActivityIndicator size='large' color='red' />
            </View> : null
        )
    }

    handleLoadMore = () => {
        this.setState({
            page : this.state.page + 1,
            isloading: true
        },
        this.getData())
    }

    render() {
        return (
            <View style={styles.container}>
                {/* header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize: 24}}>All {this.props.route.params} products</Text>
                    </View>
                    <View>
                        <Image source={Search} />
                    </View>
                </View>
                <FlatList 
                    style={styles.body}
                    data = {this.state.products}
                    renderItem = {this.renderRow}   
                    keyExtractor = {(item, index) => index.toString() }
                    onEndReached = {this.handleLoadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={this.renderFooter}
                />    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding : 20,
        flex: 1
    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    body : {
        flex : 1,
        marginTop: 20
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
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
    
})

export default ViewAll
