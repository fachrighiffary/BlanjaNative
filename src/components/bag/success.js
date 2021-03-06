import React, {Component} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import {SuccessLogo} from '../../assets'
import {setEmptyBag} from '../../public/redux/ActionCreators/Bag'



class Success extends Component{

   
    componentDidMount = () => {
        this.props.dispatch(setEmptyBag())
    }

    render(){
        const {navigation} = this.props
        return(
            <View>
                <View style={styles.container}>
                    <Image source={SuccessLogo} />
                    <Text style={{
                        fontSize: 34,
                        fontWeight: 'bold',
                        marginTop: 49
                    }}>Success!</Text>
                    <Text style={{
                        textAlign: 'center', 
                        width: 248,
                        fontSize: 14
                        }}>Your order will be delivered soon. Thank you for choosing our app!</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.popToTop('HomeScreen')
                }}>
                    <View style={styles.btn}>
                        <Text style={{color: 'white'}}>CONTINUE SHOPPING</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 130
        },
    btn : {
        alignItems: 'center', 
        height: 48, 
        width: 343, 
        backgroundColor: '#DB3022', 
        borderRadius: 25, 
        alignSelf: 'center', 
        justifyContent: 'center',
        marginTop: 163
    }
})


const mapStateToProps = ({auth,bag}) => {
    return{
        auth,
        bag
    }
}

export default connect(mapStateToProps)(Success)
