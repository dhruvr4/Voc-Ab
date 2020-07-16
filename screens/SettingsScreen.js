import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { MonoText } from '../components/StyledText';
import firebase from 'firebase';

 function SettingsScreen({navigation}) {
  function navigat(ans) {
      navigation.navigate("Play",{answer :ans})
  }
  function facebook() {


    //Pushing facebook data in database
    facebook_Data={
      Username:'Dhruvr4',
      email_id:'dhruvz123z@gmail.com',
      level:{
        easy:100,
        medium:100,
        hard:100
      }
    }
    //location = 'users/' + facebook_Data.Username
    location = 'users/' + Math.floor(Math.random()*1000)  
    firebase.database().ref(location).set({
      ...facebook_Data
    }).then(()=>{
      console.log("Firebase success");
    }).catch((error)=>{
      console.log(error)
    });
}
function google() {


  //Pushing google data in database
  google_Data={
    Username:'Dhruvr2',
    email_id:'dhruvz123z@gmail.com',
    level:{
      easy:100,
      medium:100,
      hard:100
    }
  }
  //location = 'users/' + google_Data.Username
  location = 'users/' + Math.floor(Math.random()*1000)
  

  firebase.database().ref(location).set({
    ...google_Data
  }).then(()=>{
    console.log("Firebase success");
  }).catch((error)=>{
    console.log(error)
  });
}
function guest() {


  //Pushing guest data in database
  guest_Data={
    Username:'Dhruvr3',
    email_id:'dhruvz123z@gmail.com',
    level:{
      easy:100,
      medium:100,
      hard:100
    }
  }
  //location = 'users/' + guest_Data[Username]
  location = 'users/' + Math.floor(Math.random()*1000)
  
  firebase.database().ref(location).set({
    ...guest_Data
  }).then(()=>{
    console.log("Firebase success");
  }).catch((error)=>{
    console.log(error)
  });
}
React.useEffect(()=> {
  var firebaseConfig = {
    apiKey: "AIzaSyD6Xi2XISAlkaY_24kSXxhNikzNirylw_4",
    authDomain: "voc-ab.firebaseapp.com",
    databaseURL: "https://voc-ab.firebaseio.com",
    projectId: "voc-ab",
    storageBucket: "voc-ab.appspot.com",
    messagingSenderId: "48251159172",
    appId: "1:48251159172:web:201f544d60bcd8c3c878d1",
    measurementId: "G-CWE55Q64X9"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  
})




  var mode = 'default'
  return (
    <View>
      <Text styles = {styles.result}>Mode</Text>
      <DropDownPicker
        items={[
            {label: 'Easy',value : 'easy'},
            {label: 'Medium',value : 'medium'},
            {label: 'Hard',value : 'hard'},
            {label: 'Random',value : 'default'},
        ]}
        defaultValue={'default'}
        style={styles.pick}
        onChangeItem={a=>
          mode = a.value
        }
        />
    <Button title="Play" onPress={() => navigat(mode)} />
    <Button title="Facebook Login" onPress={() => facebook()} />
    <Button title="Google Login" onPress={() => google()} />
    <Button title="Guest Login" onPress={() => guest()} />
    
    </View>
    )
}
  


SettingsScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  pick:{
    width:50

  },
    result:{
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize :40,
    backgroundColor: 'white',
  
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
export default SettingsScreen

