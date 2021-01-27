import { Button, Input, Right } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Modal } from 'react-native'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, ImgProfile, Star } from '../../assets'
import RatingProduct from '../product/rating'
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {API_URL} from '@env'
import { connect } from 'react-redux'


export class RatingReview extends Component {
    constructor(){
        super();
        this.state = {
            modalVisible: false,
            comment: '',
            ratingPrdct: '',
            review : [],
            allRating: 0
          };
    }
   

    setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    }
    
    
    ratingCompleted = (rating) =>  {
        //console.log("Rating is: " + rating)
        this.setState({
            ratingPrdct: rating
        })
      }
    
    handleSubmit = (rating,modalVisible) => {
        const id =  this.props.route.params[0]
        const data = { 
            user_id :this.props.id,
            rating : this.state.ratingPrdct,
            product_id: this.props.route.params[0],
            comment: this.state.comment
        }
        //console.log(data)
        axios
        .post(API_URL + '/rating',data)
        .then((data) => {
            //console.log(data)
            //alert("Review Berhasil DIkirim")
            this.props.navigation.push('Detail', id)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    getData = () => {
        const product_id =  this.props.route.params[0]
        axios
        .get(API_URL + '/rating/' + product_id)
        .then((data) => {
            //console.log(data.data.data.length)
            this.setState({
                review : data.data.data,
                allRating: data.data.data.length

            })
        })
        .catch((err) => {
            console.log(err)
        })

    }
    componentDidMount = () => {
        this.getData()
    }


    render() {
        const { modalVisible, review} = this.state;
        return (
            <View style={{padding: 15}}>
                <View style={{marginTop: 9}}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                </View>
                {/* Headerr */}
                <View style={{marginTop: 34}}>
                    <Text style={styles.title}>Rating & Reviews</Text>
                </View>

                {/* rating */}
                <View style={styles.containerRating}>
                    <View style={styles.ratingNum}>
                        <Text style={{fontSize: 44, fontWeight: 'bold'}}>{this.props.route.params[1].toFixed(1)}</Text>
                        <Text>{this.state.allRating} Rating</Text>
                    </View>
                    <View style={styles.ratingDtl}>
                        <View style={styles.rating}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 184, alignItems: 'center'}}>
                                <View style={styles.containerStar}>
                                    <Image source={Star} />
                                    <Image source={Star} />
                                    <Image source={Star} />
                                    <Image source={Star} />
                                    <Image source={Star} />
                                </View>
                                <View style={{width: 114}}>
                                    <View style={{height: 8, width: 114, justifyContent: 'flex-start', backgroundColor: '#DB3022', borderRadius: 4}}></View>
                                </View>
                            </View>
                            <View style={{marginLeft: 23}}>
                                <Text>9</Text>
                            </View>
                        </View>
                        <View style={styles.rating}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 184, alignItems: 'center'}}>
                                <View style={styles.containerStar}>
                                    <Image source={Star} />
                                    <Image source={Star} />
                                    <Image source={Star} />
                                    <Image source={Star} />
                                </View>
                                <View style={{width: 114}}>
                                    <View style={{height: 8, width: 80, justifyContent: 'flex-start', backgroundColor: '#DB3022', borderRadius: 4}}></View>
                                </View>
                            </View>
                            <View style={{marginLeft: 23}}>
                                <Text>4</Text>
                            </View>
                        </View>
                        <View style={styles.rating}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 184, alignItems: 'center'}}>
                                <View style={styles.containerStar}>
                                    <Image source={Star} />
                                    <Image source={Star} />
                                    <Image source={Star} />
                                </View>
                                <View style={{width: 114}}>
                                    <View style={{height: 8, width: 60, justifyContent: 'flex-start', backgroundColor: '#DB3022', borderRadius: 4}}></View>
                                </View>
                            </View>
                            <View style={{marginLeft: 23}}>
                                <Text>3</Text>
                            </View>
                        </View>
                        <View style={styles.rating}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 184, alignItems: 'center'}}>
                                <View style={styles.containerStar}>
                                    <Image source={Star} />
                                    <Image source={Star} />
                                </View>
                                <View style={{width: 114}}>
                                    <View style={{height: 8, width: 40, justifyContent: 'flex-start', backgroundColor: '#DB3022', borderRadius: 4}}></View>
                                </View>
                            </View>
                            <View style={{marginLeft: 23}}>
                                <Text>2</Text>
                            </View>
                        </View>
                        <View style={styles.rating}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 184, alignItems: 'center'}}>
                                <View style={styles.containerStar}>
                                    <Image source={Star} />
                                </View>
                                <View style={{width: 114}}>
                                    <View style={{height: 8, width: 20, justifyContent: 'flex-start', backgroundColor: '#DB3022', borderRadius: 4}}></View>
                                </View>
                            </View>
                            <View style={{marginLeft: 23}}>
                                <Text>0</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* total review */}

                <View style={{marginTop: 37}}> 
                    <Text style={{fontSize: 24, fontWeight: '800'}}>{this.state.allRating} Reviews</Text>
                </View>

                {/* Comment Section */}
                <ScrollView style={{height: 300, width:'100%'}}>
                    {review && review.map(({user_id, username, rating, comment, input_date}, index) => {
                        return (
                            <View style={{marginTop: 44}} key={index}>
                                <View style={styles.cardComent}>
                                    <Image source={ImgProfile} style={styles.imgComent}/>
                                    <View style={styles.cardContainer}>
                                        <Text>{username}</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <RatingProduct total_rating={rating} />
                                            <Text>{input_date.split("T")[0]}</Text>
                                        </View>
                                        <Text>
                                            {comment} 
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={{marginTop: 20}}>
                    <View style={styles.borderInput}>
                        <Text>Review</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this.setModalVisible(true)
                        }}>
                            <Text style={{color: 'white'}}>Write Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Show modal Comment and Rating */}
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>What is You Rate?</Text>

                        {/* Letak Rating picker */}
                        <View>
                        <Rating
                        showRating
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 10 }}
                        />
                        </View>
                        <View style={{height: 44, width: 227}}>
                            <Text style={{textAlign: 'center', fontSize: 18}}>Please share yout opinion about this product</Text>
                        </View>
                        <View style={{height:154, width: 343, backgroundColor: 'white', borderRadius: 4, marginTop: 18, padding: 15}}>
                            <Input 
                            style={{ fontSize: 14}}
                            multiline={true} 
                            placeholder="Put your opinion here"
                            name="comment"
                            onChangeText={(text) => {this.setState({comment: text})}}
                            />
                        </View>

                        <Button
                            style={styles.btnModal}
                            onPress={() => 
                            this.handleSubmit()
                        }
                        >
                            <Text style={styles.textStyle}>SEND REVIEW</Text>
                        </Button>
                        <Button
                            style={styles.btnModal}
                            onPress={() => {
                            this.setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>CANCEL</Text>
                        </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title : {
        fontSize: 34,
        fontWeight: 'bold'
    },
    containerRating: {
        height: 95,
        width: 330,
        marginTop: 41,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ratingNum : {
        width :64,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingDtl : {
        width :236,
        height: '100%',
        justifyContent: 'center'
    },
    rating : {
        flexDirection: 'row'
    },
    containerStar : {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        width: 60
    },
    cardComent : {
        minHeight: 100,
        width: 311,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 8,
    },
    imgComent : {
        height: 52, 
        width: 52, 
        borderRadius: 26, 
        top: -20, 
        left: -20
    },
    cardContainer : {
        width: 311,
        minHeight: 100,
        paddingHorizontal :23, 
        top: -20
    },
    borderInput : {
        width: 311, 
        height: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 15,
        borderRadius: 10
    },
    btn :{
        height: 36,
        width: 128,
        backgroundColor: '#DB3022',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -20,
        right: -20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 172
      },
      modalView: {
        height: 640,
        width: '100%',
        backgroundColor: "#F9F9F9",
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
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      btnModal: {
          alignSelf:'center', 
          height: 48, 
          width: 343, 
          backgroundColor: '#DB3022', 
          borderRadius: 25, 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: 30
        }
})

const mapStateToProps = ({auth}) => {
    return(
        auth
    )
}

export default connect(mapStateToProps)(RatingReview)
