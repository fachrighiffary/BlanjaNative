import React, { Component } from 'react'
import { Image, StyleSheet, Text, Modal, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconCamera, IconGalery } from '../../../assets'
import DropDownPicker from 'react-native-dropdown-picker';
import { Input,Button } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from "@env"


export class EditProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            product_name: '',
            category: '',
            product_price: '',
            product_qty: '',
            product_size: '',
            product_color: '',
            condition: '',
            photoFromDB: '',
            image: null,
            images: null,
            product_img: [],
            taken_pic: {},
            modalVisible: false,
            isSetImage: false,
            loading: false
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    
//  -------------CAMERA----------------------------------------------------------   
    chooseFile = () => {
    ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
    })
        .then((images) => {
            console.log(images.length);
            this.setState({ product_img: images });
        })
        .catch((err) => {
            console.log(err);
        });
    };

    takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ taken_pic: images });
            })
            .catch((err) => {
                console.log(err);
            });
    };
//------------------GET DATA BY ID---------------------------------------------
    getdata = () => {
        const id = this.props.route.params
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
                'Content-type': 'multipart/form-data',
            },
        };
        axios
        .get(API_URL + '/product/' + id, config)
        .then((data) => {
            console.log(data.data.data[0])
            this.setState({
                product_name: data.data.data[0].product_name.toString(),
                product_price: data.data.data[0].product_price.toString(),
                product_qty: data.data.data[0].product_qty.toString(),
                product_size: data.data.data[0].product_size,
                product_color: data.data.data[0].product_color,
                photoFromDB: data.data.data[0].product_img,
            })
        })
        .catch((err) => {
            console.log(err)
        })

    }
    componentDidMount = () => {
        this.getdata();
    }

// -----------------HANDLE UPLOAD----------------------------------
    handleUploadProduct = () => {
        const id = this.props.route.params
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
                'Content-type': 'multipart/form-data',
            },
        };
        const data = new FormData();
        data.append('product_name', this.state.product_name)
        data.append('product_price', this.state.product_price)
        data.append('product_qty', this.state.product_qty)
        data.append('product_size', this.state.product_size)
        data.append('product_color', this.state.product_color)
        if (Object.keys(this.state.taken_pic).length > 0) {
            data.append('product_img', {
                name: this.state.taken_pic.path.split('/').pop(),
                type: this.state.taken_pic.mime,
                uri:
                    Platform.OS === 'android'
                        ? this.state.taken_pic.path
                        : this.state.taken_pic.path.replace('file://', ''),
            })
        }
        if (this.state.product_img[0]) {
            for (let i = 0; i < this.state.product_img.length; i++) {
                data.append('product_img',
                    {
                        name: this.state.product_img[i].path.split('/').pop(),
                        type: this.state.product_img[i].mime,
                        uri:
                            Platform.OS === 'android'
                                ? this.state.product_img[i].path
                                : this.state.product_img[i].path.replace('file://', ''),
                    }
                );
            }
        }
    console.log('ini config',)
    console.log('ini adalah data dari data input',data)
    axios
    .patch(API_URL + `/product/` + id , data , config)
    .then((data) => {
        console.log(data)
        this.props.navigation.push("MyProduct")
    })
    .catch(({response}) => {
        console.log(response.data)
        alert('Data gagal Diubah')
    })
    } 
   


    render() {
        const {isSetImage, modalVisible,product_img,taken_pic,product_name, category, product_price, product_qty, product_size, product_color, condition} = this.state;
        console.log(this.props.auth.token)
        let thumbPhoto;
        let {photoFromDB} = this.state
        photoFromDB = photoFromDB.split(',')
        if (!isSetImage) {
            thumbPhoto =
                <>
                    {
                        photoFromDB && photoFromDB.map((items, index) => <>
                            <Image
                                key={index}
                                source={{ uri: API_URL + items }}
                                style={styles.imageStyle}
                            />
                        </>)
                    }
                </>
        }
        console.log(this.state)
        let prevImgFromCamera;
        if (Object.keys(this.state.taken_pic).length > 0) {
            prevImgFromCamera =
                <>
                    <Image
                        source={{uri:taken_pic.path}}
                        style={styles.imageStyle}
                    />
                </>
        }

        return (
            <ScrollView >
                <View style={{paddingHorizontal: 16, paddingTop: 20}}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <Image source={IconBack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Edit Product</Text>
                </View>
                <View style={styles.container}>
                    <View style={{marginBottom: 20}}>
                        <Text style={{marginLeft: 7, fontSize: 18, marginBottom: 10}}>Product Name</Text>
                        <View style={styles.input}>
                            <Input 
                            placeholder="input product name" 
                            value={product_name} 
                            onChangeText={(text) => { this.setState({ product_name: text }) }}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Price</Text>
                        <View style={styles.input}>
                            <Input 
                            placeholder="input price" 
                            keyboardType='number-pad' 
                            value={product_price} 
                            onChangeText={(text) => { this.setState({ product_price: text }) }}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Quantity</Text>
                        <View style={styles.input}>
                            <Input 
                            placeholder="input quantity" 
                            keyboardType='number-pad' 
                            value={product_qty} 
                            onChangeText={(text) => { this.setState({ product_qty: text }) }}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Size</Text>
                        <View style={styles.input}>
                            <Input 
                            placeholder="exp : M, L / 39,40,41"
                            value={product_size} 
                            onChangeText={(text) => { this.setState({ product_size: text }) }}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Color</Text>
                        <View style={styles.input}>
                            <Input 
                            placeholder="exp : white, green, blue" 
                            value={product_color} 
                            onChangeText={(text) => { this.setState({ product_color: text }) }}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Product Image</Text>
                        <ScrollView horizontal={true}>
                          <View style={{ flexDirection: 'row' }}>
                            {product_img && product_img.map((item) => {
                                return (
                                    <Image
                                        key={product_img.indexOf(item)}
                                        source={{ uri: product_img.length !== 0 ? item.path : '' }}
                                        style={styles.imageStyle}
                                    />
                                );
                            })}
                            {prevImgFromCamera}
                            {thumbPhoto}
                        </View>
                        </ScrollView>
                        <TouchableOpacity 
                        activeOpacity={0.6} 
                        style={styles.input}
                        onPress={() => {
                            this.setModalVisible(true);
                          }}
                        >
                            <Text>Upload Image</Text>
                        </TouchableOpacity>
                    </View> 





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
                        <View style={{width: 200, height: 100,justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Button 
                            style={styles.modalPicker} 
                            onPress={() => {
                                this.setModalVisible(!modalVisible)
                                this.chooseFile()
                            }}
                            >
                                <Image source={IconGalery} />
                                <Text>Galery</Text>
                            </Button>
                            <Button 
                            style={styles.modalPicker}  
                            onPress={() => {
                                this.setModalVisible(!modalVisible)
                                this.takePicture()
                            }}
                            >
                                <Image source={IconCamera} />
                                <Text>Camera</Text>
                            </Button>
                        </View>

                        <Button
                            style={{alignSelf: 'center',backgroundColor: '#DB3022', width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                            this.setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Button>
                        </View>
                    </View>
                    </Modal>
                    <TouchableOpacity 
                    style={styles.btn}
                    onPress={this.handleUploadProduct}
                    >
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
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        marginTop: 600,
        width: '100%',
        height: 300,
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
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      modalPicker: {
        borderColor: 'transparent', 
        borderRadius: 0,
        flexDirection: 'column',
        backgroundColor: 'white'
      },
      imageStyle: {
        width: 50,
        height: 50,
        margin: 5,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
    },
})

const mapStateToProps = ({auth}) => {
    return {
        auth,
    };
};

export default connect(mapStateToProps)(EditProduct) 
