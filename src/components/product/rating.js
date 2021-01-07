import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import { Star, Star0 } from '../../assets'

export class Rating extends Component {
    render() {
        const {total_rating} = this.props
        // console.log(total_rating)
        let a = '';
        for(let i = 0; i< total_rating; i++){
            a += i
        }
        let lop = a.split('')
        
        return (
            <View style={{flexDirection: 'row', marginTop: 8}}>
                {/* <Image source={Star0} />
                <Image source={Star0} />
                <Image source={Star0} />
                <Image source={Star0} />
                <Image source={Star0} /> */}
                {lop.map((data, id) => {
                        return <Image source={Star} key={id}/>
                    })}
                <Text style={{fontSize: 10, marginLeft: 3, color:'#9B9B9B'}}>({total_rating})</Text>
            </View>
        )
    }
}

export default Rating
