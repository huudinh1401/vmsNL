import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
    Platform,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

//import Video from 'react-native-video';
//import {WebView} from 'react-native-webview';

const HomeScreen = ({navigation, route}) => {
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <View style={{ flex: 1, backgroundColor: '#550000', margin: 10, borderRadius: 20, marginTop: 15, borderWidth: 1, borderColor: 'white',
                            shadowColor: 'black', shadowOffset:{width: 4, height: 5},
                            shadowRadius: 2, shadowOpacity: 0.3, elevation: 10,}}>
                <TouchableOpacity
                    style={{ alignItems:'center', justifyContent:'center', flex: 1}}
                    onPress={()=>navigation.navigate('Playback')}
                >
                    <Text style={{ textAlign:'center', color:'white', fontSize: 30}}>Xem lại</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: 'green', margin: 10, borderRadius: 20, marginBottom: 30, borderWidth: 1, borderColor: 'white',
                            shadowColor: 'black', shadowOffset:{width: 4, height: 5},
                            shadowRadius: 2, shadowOpacity: 0.3, elevation: 10,}}>
                <TouchableOpacity
                    style={{ alignItems:'center', justifyContent:'center', flex: 1}}
                >
                    <Text style={{ textAlign:'center', color:'white', fontSize: 30}}>Xem trực tiếp</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
}

export default HomeScreen;
