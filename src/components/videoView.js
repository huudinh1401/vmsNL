import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import Video from 'react-native-video';
import { Icon } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VideoView = ({navigation, route, video, videoKey}) => {
    const [videoSpeed, setVideoSpeed] = useState(1); 
    const [showBtn, setShowBtn] = useState(false);

    const handleSpeedChange = (speed) => {
        setVideoSpeed(speed);
    };
    return (
        <View style={{width: '99%', height: windowWidth/2+40, justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row', height: 30, alignItems:'center', width: '100%'}}>
                <TouchableOpacity
                    style={styles.btnSetting}
                    onPress={() => setShowBtn(!showBtn)}
                >
                    <Icon name='settings-outline' type='ionicon' size={18} color={'white'}/> 
                </TouchableOpacity>
                {
                    showBtn ? 
                    <>
                        <TouchableOpacity style={styles.btnSpeed} onPress={() => handleSpeedChange(0.25)}> 
                            <Text style={styles.btnText}>0.25x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSpeed} onPress={() => handleSpeedChange(0.5)}> 
                            <Text style={styles.btnText}>0.5x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSpeed} onPress={() => handleSpeedChange(1)}> 
                            <Text style={styles.btnText}>1x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSpeed} onPress={() => handleSpeedChange(2)}> 
                            <Text style={styles.btnText}>2x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSpeed} onPress={() => handleSpeedChange(4)}> 
                            <Text style={styles.btnText}>3x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSpeed} onPress={() => handleSpeedChange(8)}> 
                            <Text style={styles.btnText}>8x</Text>
                        </TouchableOpacity>
                    </> : null
                }
                
            </View>
            <Video
                key = {videoKey}
                source={{ uri: video, type: 'mp4' }}
                //source={require('../images/stream.mp4')}
                style={{width: '99%', height: windowWidth/2}}
                controls={true}
                resizeMode="contain"
                rate={videoSpeed}
            />
        </View>
  );
}
export default VideoView;
const styles = StyleSheet.create({
    btnSpeed: {
        height: 25, width: 40,
        backgroundColor: '#444444',
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 1,
        marginBottom: 5,
        elevation: 10,
    },
    btnSetting: {
        height: 25, width: 40,
        backgroundColor: '#666666',
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 1,
        marginBottom: 5, marginLeft: 15,
        elevation: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 12
    },
});
