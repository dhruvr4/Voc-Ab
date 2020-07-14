import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import IconFon from 'react-native-vector-icons/FontAwesome';
import IconSim from 'react-native-vector-icons/SimpleLineIcons';
import { MonoText } from '../components/StyledText';

 function HomeScreen({navigation}) {
  function navigat(ans) {
    navigation.navigate("Play",{answer :ans})
}
  return (
    <View style = {styles.container}>

      <IconFon name = "wrench"  size={40} onPress={() => navigation.navigate('Setting')} style = {styles.wrenchIcon} />
      <IconSim name = "globe" size={40} onPress={() => navigation.navigate('Setting')} style = {styles.globeIcon}/>
    
      <View style = {styles.buttonContainer}>
        <Button
          title="Play" 
          onPress={() => navigat("default")} 
          style = {styles.play} 
          color = "#841584"
        /> 
        
      </View> 
    </View>
    )
}
HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer:{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  wrenchIcon : {
    color : 'white',
    left : 10,
  },
  globeIcon : {
    position : "absolute",
    right : 10,
    color : 'white',
  },
  play : {
    width: 500,
    height: 500,
    borderRadius: 150/2,
    backgroundColor : 'red',
  }
});
