import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

state ={
  text : "",
  options : [],
  correct : ""
}
export default function PlayScreen({navigation}) {
  load();
  return (
    <View>
      <Text style = {styles.text}> {state.text}</Text>
      <Button
        onPress={() => {
          navigation.navigate("Result",{answer :answer(0)})}}
        title={state.options[0]}
        color="#841584"
      />    
      <Button
         onPress={() => {
             navigation.navigate("Result",{answer :answer(1)})}}
         title={state.options[1]}
         color="#841584"
      />    
      <Button
        onPress={() => {
          navigation.navigate("Result",{answer :answer(2)})}}
        title={state.options[2]}
        color="#841584"
      />    
      <Button
       onPress={() => {
          navigation.navigate("Result",{answer :answer(3)})}}
        title={state.options[3]}
        color="#841584"
      />    

    </View>
    );
}
answer = answer => {
return (state.options).indexOf(state.correct) == answer
  };

function load(){
  state.text = 'Something you are not sure about'
  state.options = ["ambigous","ambivalent","flowery","delicious"]
  state.correct = 'ambigous'
}

const styles = StyleSheet.create({
  text:{
    paddingTop: 100,
    fontWeight: 'bold',
    fontSize :30
  },
  button0:{
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
