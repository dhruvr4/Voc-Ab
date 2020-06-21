import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';
import {Database} from '../screens/Database.js';
import {Question} from '../screens/Question.js';


export default function PlayScreen({navigation}) {  
  function answer ( answer) {
    let va= (options).indexOf(correct) === answer
    if (answer == -1) {
      va = "Time Up"
    } 
     navigat(va) 
  }
    function load() {
    //database = new Database("Hello");
    txt='Something you are not sure about'
    cor ='ambigous'
    arr=["ambigous","ambivalent","flowery","delicious"]
    shuffle(arr)
    }
    function navigat(ans) {
      clearInterval(time)
        navigation.navigate("Result",{answer :ans,correct:correct})
    }
    function tick() {
      if (timer == 0)  {
        answer(-1)
          }
      else {
          setTimer(timer-1)
        }
    }
    React.useEffect(()=> {
        time = setInterval(tick,1000)
        return () => {
          clearInterval(time)
        }
    })
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    let txt=''
    let cor =''
    let arr=[]
    load()
    const [ text, setText ] = React.useState(txt)
    const [ options, setOptions ] = React.useState (arr)
    const [ correct, setCorrect ] = React.useState(cor)
    let [ timer, setTimer ] = React.useState(10)
    let time = null
    //let time = setInterval(this.tick, 1000);
    return (
    <View>
      <Text style = {styles.timer}> {timer}</Text>
      <Text style = {styles.text}> {text}</Text>
      <Button
        onPress={() => {answer(0)}}
        title={options[0]}
        color="#841584"
      />    
      <Button
        onPress={() => {answer(1)}}
        title={options[1]}
         color="#841584"
      />    
      <Button
        onPress={() => {answer(2)}}
        title={options[2]}
        color="#841584"
      />    
      <Button
        onPress={() => {answer(3)}}
        title={options[3]}
        color="#841584"
      />   
    </View>
    );
}
const styles = StyleSheet.create({
  timer:{
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize :30,
    textAlign: "center"    
  },
  text:{
    textAlign: "center",
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize :30
  },
  button0:{
    paddingTop:20,
    backgroundColor:'white',
    width:400,
    height :90,
  },
  button1:{
    width:400,
    height :90,
    backgroundColor:'white'
  },
  button2:{
    width:400,
    height :90,
    backgroundColor:'white'
  },
  button3:{
    width:400,
    height :90,
    backgroundColor:'white'
  },


  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
