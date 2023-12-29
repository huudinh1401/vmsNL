import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/homeScreen';
import PlaybackScreen from './src/screens/playbackScreen';

//const AppContainer = NavigationContainer(appNavigator);
const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: 'purple' }, 
          headerTitleAlign: 'center', 
          headerBackTitleVisible: false,
          headerTitleStyle: { fontWeight: 'normal'},
        }}
      >
        <Stack.Screen name="Home"           component={HomeScreen}              options={{ title: 'VMS Nguyên Luân' }} />
        <Stack.Screen name="Playback"       component={PlaybackScreen}          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;