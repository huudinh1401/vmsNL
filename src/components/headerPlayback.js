import React, {useState, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

import { Icon } from 'react-native-elements';

const HeaderPlayback = ({navigation, route}) => {
    return (
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginBottom: 10, marginTop: 2}}>
            <TouchableOpacity style={{flex: 1.5, justifyContent: 'center', alignItems:'center'}} onPress={()=>navigation.goBack()}>
                <Icon name='chevron-back-outline' type='ionicon' size={25} color={'white'}/>
            </TouchableOpacity>

            <View style={{flex: 7, justifyContent: 'center', alignItems:'center'}}>
                <Text style = {{color: 'white', fontSize: 18, textAlign: 'center'}}>Xem lại Camera</Text>
            </View>

            <TouchableOpacity style={{flex: 1.5, justifyContent: 'center', alignItems:'center'}} onPress={()=>navigation.navigate('Home')}>
                <Image style = {{width:35, height: 35}} source={require('../images/Ngluan.png')}></Image>
            </TouchableOpacity>
        </View>
  );
}
export default HeaderPlayback;
