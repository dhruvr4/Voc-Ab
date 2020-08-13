import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';


export default function ResultScreen({route,navigation}) {
  let answer = "Time Up"
  const result = JSON.stringify(route.params.answer)
  const correct = JSON.stringify(route.params.correct)
  if( result === 'true') {
    answer = "You are correct"
  }
  if (result === 'false') {
    answer = "You are wrong"
  }
  const pushAction = StackActions.push('Play',{answer:"default"});
  return (
    <View style = {{flex : 1, backgroundColor: result === 'true'? '#0EAA66' : '#A80505', alignItems : 'center',
    justifyContent : 'center'}}>
      <Text style = {styles.result}> {answer}</Text>
      <Text style = {styles.correct}> Correct Answer was = {correct}</Text>
      <Button title="Again" onPress={() => navigation.dispatch(pushAction)} />
    </View>
    );
}

const styles = StyleSheet.create({
  result:{
      paddingTop: 100,
      fontWeight: 'bold',
      fontSize :40,
  },
  correct:{
    paddingTop: 40,
    fontWeight: 'bold',
    fontSize :30,
    alignItems : 'center',
    justifyContent : 'center'
  }, 
  });
