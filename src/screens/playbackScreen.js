import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList,
    Text,
    TextInput,
    View,
    Modal,
    TouchableOpacity,
    Alert,
} from 'react-native';

//import Video from 'react-native-video';
// import {WebView} from 'react-native-webview';
import { NativeModules } from 'react-native';
import { encode } from 'base-64';
import VideoView from '../components/videoView';
import { Icon } from 'react-native-elements';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import HeaderPlayback from '../components/headerPlayback';

const windowWidth = Dimensions.get('window').width;

//const urlVideos = 'https://vms.nguyenluanbinhthuan.com:3000/search?cameraName=ctynguyenluan&date=2023-12-20';
//https://vms.nguyenluanbinhthuan.com:3000/videos/ctynguyenluan/2023-12-20_00-03.mp4
const username = 'admin';
const password = '123456';
const credentials = `${username}:${password}`;
const base64Credentials = encode(credentials);
const headers = new Headers();
headers.set('Authorization', `Basic ${base64Credentials}`);
const apiUrl = 'https://vms.nguyenluanbinhthuan.com:3000/dscam';
const publicKeyHashes = [
    'sha256/302828d6233fc362303676e3c412bfeb553a0a2a9a2247036bb27402b905df80',
    // Add more public key hashes if needed
  ];

const PlaybackScreen = ({navigation, route}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [videoKey, setVideoKey] = useState(1);
    const [arrCam, setArrCam] = useState([]);
    const [arrVideo, setArrVideo] = useState([]);
    const [camera, setCamera] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [searchDay, setSearchDay] = useState('');
    const [modalCam, setModalCam] = useState(false);
    const [modalCalendar, setModalCalendar] = useState(false);
    const [linkVideo, setLinkVideo] = useState('');

    useEffect(() => {
        Text.defaultProps = { allowFontScaling: false, fontFamily: 'Inter'};
        //NativeModules.SSLCertificateModule.disableSSLCertificateChecking();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        setCurrentDate(year + '-' + month + '-' + date);
        
        fetch(apiUrl,{ 
            method: 'GET', 
            headers: headers, 
            rejectUnauthorized: false,
            
            requestCert: false,
            agent: false,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            const cameraNames = responseJson.cameras.map(camera => camera.name);
            setArrCam(cameraNames)
            console.log(cameraNames)
        })
        .catch((error) => { console.error(error); });

        // axios.get('https://your-api-endpoint.com', { httpsAgent: agent })
        // .then(response => console.log(response.data))
        // .catch(error => console.error('Error:', error));
        // axios.get(apiUrl, { headers: headers, agent: { rejectUnauthorized: false } })
        // .then(response => {
        //     const cameraNames = response.data.cameras.map(camera => camera.name);
        //     setArrCam(cameraNames);
        //     console.log(cameraNames);
        // })
        // .catch(error => {
        //     if (error.response) {
        //         // The request was made, but the server responded with a status code that falls out of the range of 2xx
        //         console.error('Server responded with an error:', error.response.data);
        //       } else if (error.request) {
        //         // The request was made but no response was received
        //         console.error('No response received:', error.request);
        //       } else {
        //         // Something happened in setting up the request that triggered an Error
        //         console.error('Error setting up the request:', error.message);
        //       }
        // });

    }, []);

    const formatTimeFromVideoName = (videoName) => {
        const timePart = videoName.split('_')[1].split('-');
        const formattedTime = `${timePart[0]}:${timePart[1]}`;
        return formattedTime;
    };

    const ItemView = ({item}) => {
        return (
            <View style={{flexDirection:'row',}}>
                <TouchableOpacity
                    style={{flex: 9, paddingLeft: 5, backgroundColor: '#111111', flexDirection:'row', justifyContent: 'center', alignItems: 'center', height: 40}}
                    onPress={() => _onPressGetCamName(item)}
                >
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', height: 40}}>
                        <Image style = {{ width: 25, height: 25}} source={require('../images/LogoCam.png')} />
                    </View>
                    <View style ={{height: 40, flex: 15, justifyContent: 'center'}}>
                        <Text style = {{color: 'white', fontSize: 14,}}> {item} </Text>
                    </View>
                </TouchableOpacity> 
                <View style={{flex:0.3}}/>
            </View>
        );
    };

    const _showListCam = () =>{ setModalCam(true)};

    const _onCancelSearch = () =>{
        setCamera('')
    };

    const _onPressGetCamName = (name) =>{ 
        setCamera(name)
        setSearchDay('')
        setArrVideo([])
        setLinkVideo('')
        setSelectedItem(null)
        setModalCam(false)
    };

    const _onPressGetTime = (day) =>{
        setSearchDay(day)
        setLinkVideo('')
        setSelectedItem(null)
        setModalCalendar(false)
        if (day > currentDate) {
            Alert.alert('Thông báo','Vui lòng chọn lại ngày!')
        } 
        fetch(`https://vms.nguyenluanbinhthuan.com:3000/search?cameraName=${camera}&date=${day}`,{ 
            method: 'GET', headers: headers, credentials: 'include',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setArrVideo(responseJson.videos)
            console.log(responseJson.videos)
        })
        .catch((error) => { console.error(error); });
    };

    const _onPressSetShowCalendar = () =>{ setModalCalendar(!modalCalendar)}

    const _onPressGetLinkVideo = (video, index) =>{
        setSelectedItem(index);
        setVideoKey((prevKey) => prevKey + 1);
        setLinkVideo(`https://admin:123456@vms.nguyenluanbinhthuan.com:3000/videos/${camera}/${video}`)
    };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111111', alignItems: 'center'}}>
            <HeaderPlayback navigation={navigation}/>
            <View style={{flexDirection:'row'}}>
{/* View chon khu vuc Camera */}
                <View style={styles.viewArea}>
                    <TextInput
                        style={styles.textInputStyle}
                        //onChangeText={(text) => setCamera(text)}
                        editable={false}
                        //value={camera}
                        autoCorrect={false}
                        autoCapitalize= 'none'
                        underlineColorAndroid="transparent"
                        placeholder="Chọn khu vực..."
                        placeholderTextColor={'gray'}
                    />
                    <View style={{alignItems:'center', justifyContent: 'center', flex: 1, marginRight: 10}}>
                        <TouchableOpacity
                            style={{borderRadius: 15, alignItems:'center', justifyContent:'center'}}
                            //onPress={() => _showListCam()}
                        >
                            <Icon name='chevron-down' type='ionicon' size={18} color={'white'}/> 
                        </TouchableOpacity>
                    </View>

                </View>
{/* View chon Camera */}
                <View style={styles.viewSearch}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => setCamera(text)}
                        editable={false}
                        value={camera}
                        autoCorrect={false}
                        autoCapitalize= 'none'
                        underlineColorAndroid="transparent"
                        placeholder="Chọn Camera..."
                        placeholderTextColor={'gray'}
                    />
                    <View style={{alignItems:'center', justifyContent: 'center', flex: 1, marginRight: 10}}>
                        <TouchableOpacity
                            style={{borderRadius: 15, alignItems:'center', justifyContent:'center'}}
                            onPress={() => _showListCam()}
                        >
                            <Icon name='chevron-down' type='ionicon' size={18} color={'white'}/> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

{/* chon thoi gian */}
            <View style={{flexDirection:'row'}}>
                <View style={styles.viewCalendar}>
                    <TextInput
                        style={{justifyContent: 'center', alignItems: 'center', flex: 2.5, color:'white', fontSize: 13, marginLeft: 10, height: 35,}}
                        editable={false}
                        onChangeText={(text) => setSearchDay(text)}
                        value={searchDay}
                        underlineColorAndroid="transparent"
                        placeholder="Chọn ngày..."
                        placeholderTextColor={'gray'}
                    />
                    <View style={{ flex: 0.7}}>
                        <TouchableOpacity onPress={()=>_onPressSetShowCalendar()}>
                            <Icon name='calendar-outline' type='ionicon' size={20} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{flex: 2}}/>
            </View>

{/* Modal chon Camera */}
            <Modal 
                visible={modalCam}
                transparent={true}
                animationType={'none'}
                onRequestClose={() => { setModalVisible(!modalCam); }} 
            >   
                <SafeAreaView style={{ backgroundColor: '#111111', width: '100%', height: '100%'}}>
                    <StatusBar barStyle={'light-content'}/>
    {/* Modal Text input chon Cam */}
                    <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems:'center', flexDirection:'row',  marginTop: 30}}>
                        <TouchableOpacity
                            style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', height: 40, marginRight: 5}}
                            onPress={()=>setModalCam(false)}
                        >
                            <Icon name='chevron-back-outline' type='ionicon' size={25} color={'white'}/>
                        </TouchableOpacity>
                        <View style={styles.viewSearchModal}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(text) => setCamera(text)}
                                editable={false}
                                value={camera}
                                autoCorrect={false}
                                autoCapitalize= 'none'
                                underlineColorAndroid="transparent"
                                placeholder="Chọn Camera..."
                                placeholderTextColor={'gray'}
                            />
                            <View style={{alignItems:'center', justifyContent: 'center', flex: 1, marginRight: 5}}>
                                <TouchableOpacity
                                    style={{borderRadius: 15, alignItems:'center', justifyContent:'center'}}
                                    onPress={() => {_onCancelSearch()}}
                                >
                                    <Icon name='close' type='ionicon' size={18} color={'white'}/> 
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex: 0.5}}/>
                    </View>
    {/* End Modal Text input chon Cam */}

    {/* FlatList Hien thi danh sach Camera */}
                    <View style={{marginTop: 5}}>
                        <FlatList
                            data={arrCam}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={ItemView}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
{/* End Modal chon Camera */}

{/* Modal chon ngay Calendar */}
            <Modal 
                visible={modalCalendar}
                transparent={true}
                animationType={'none'}
                onRequestClose={() => { setModalVisible(!modalCalendar); }} 
            >   
                <SafeAreaView style={{ backgroundColor: '#111111', width: '100%', height: '100%'}}>
                    <StatusBar barStyle={'light-content'}/>
                    <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems:'center', flexDirection:'row', marginTop: 40}}>
                        <TouchableOpacity
                            style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', height: 40, marginRight: 5}}
                            onPress={()=>setModalCalendar(false)}
                        >
                            <Icon name='chevron-back-outline' type='ionicon' size={25} color={'white'}/>
                        </TouchableOpacity>
                        <View style={styles.viewCalendarModal}>
                        <TextInput
                            style={{justifyContent: 'center', height: 35, alignItems: 'center', flex: 2.5, color:'white', fontSize: 13, marginLeft: 10}}
                            editable={false}
                            onChangeText={(text) => setSearchDay(text)}
                            value={searchDay}
                            underlineColorAndroid="transparent"
                            placeholder="Chọn ngày..."
                            placeholderTextColor={'gray'}
                        />
                        <View style={{ flex: 0.7}}>
                            <TouchableOpacity onPress={()=>_onPressSetShowCalendar()}>
                                <Icon name='calendar-outline' type='ionicon' size={20} color={'white'}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                        <View style={{flex: 0.5}}/>
                    </View>
    {/* End Modal Text input chon ngay */}

    {/* FlatList Hien thi Calendar */}
                    <View style={{marginTop: 5}}>
                        <Calendar
                            style={{borderWidth: 1, marginHorizontal: 15, paddingLeft: 3}}
                            theme={{ 
                                calendarBackground: '#222222', 
                                textSectionTitleColor: 'yellow', 
                                todayTextColor: 'aqua', dayTextColor: 'orange',
                                monthTextColor: 'aqua',
                            }}
                            current={currentDate}
                            onDayPress={day =>_onPressGetTime(day.dateString)}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
{/* End Modal chon ngay Calendar */}
            
            <View style={{width: windowWidth, height: windowWidth/2+60, justifyContent:'center', alignItems:'center', borderColor:'gray', borderWidth:1, backgroundColor: 'black'}}>
                {
                    linkVideo === ''?
                    <Image style = {{ width: windowWidth -10, height: windowWidth/2+10}} source={require('../images/banner.png')} />
                    :
                    <VideoView video = {linkVideo} videoKey = {videoKey}/>
                }
            </View>
            
            <View style={{marginTop: 10}}>
                <Text style={{color:'white', fontSize: 16, }}>Danh sách video</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center', width: windowWidth-2, marginTop: 5}}>
                <FlatList
                    data={arrVideo}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    numColumns={2}
                    //getItemLayout = { (data, index) => ({ length: 10, offset: 10 * index, index }) }
                    renderItem={({item, index}) =>
                        <View key={index} style={[styles.itemFlat, selectedItem === index && styles.selectedItem]}>
                            <TouchableOpacity 
                                onPress={() => _onPressGetLinkVideo(item, index)} 
                            >
                                <View style={{justifyContent: 'center'}}>
                                    <Text style = {{color: 'white', fontSize: 11, textAlign: 'center', marginBottom: 3}}>{formatTimeFromVideoName(item.replace('.mp4', ''))}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewArea: {
        flexDirection: 'row',
        backgroundColor: '#222222',
        borderRadius: 20,
        height: 30,
        alignItems:'center',
        zIndex: 5,
        flex: 1,
        marginVertical: 3,
        marginLeft: 3, marginRight: 1.5,
    },
    viewSearch: {
        flexDirection: 'row',
        backgroundColor: '#222222',
        borderRadius: 20,
        height: 30,
        alignItems:'center',
        zIndex: 5,
        flex: 1,
        marginVertical: 3,
        marginLeft: 1.5, marginRight: 3,
    },
    viewSearchModal: {
        flexDirection: 'row',
        backgroundColor: '#222222',
        borderRadius: 20,
        height: 30,
        alignItems:'center',
        zIndex: 5,
        flex: 9,
        marginVertical: 3,
        marginLeft: 1.5, marginRight: 3,
    },
    viewCalendar: {
        flexDirection:'row',
        backgroundColor: '#222222',
        height: 30,
        flex: 2.5,
        alignItems:'center',
        marginBottom: 3, marginLeft: 3,
        borderRadius: 20,
    },
    viewCalendarModal: {
        flexDirection: 'row',
        backgroundColor: '#222222',
        borderRadius: 20,
        height: 30,
        alignItems:'center',
        zIndex: 5,
        flex: 9,
        marginVertical: 3,
        marginLeft: 1.5, marginRight: 3,
    },
    textInputStyle: {
        flex: 9,
        height: 35,
        color: 'white',
        marginLeft: 5,
        fontSize: 13,
        paddingLeft: 10
    },
    itemFlat:{
        width: '49%',
        justifyContent: 'center', 
        alignItems:'center', 
        margin: 1, 
        borderRadius: 10,
        backgroundColor: '#333333',
        elevation: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    selectedItem: {
        backgroundColor: 'green', // Màu nền khi item được chọn
    },
});
export default PlaybackScreen;
