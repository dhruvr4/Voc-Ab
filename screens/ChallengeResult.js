import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';


export default function ChallengeResult({route,navigation}) {
  let answer = "Time Up"
  const result = JSON.stringify(route.params.answer)
  const correct = JSON.stringify(route.params.correct)
  if( result === 'true') {
    answer = "You are correct"
  }
  if (result === 'false') {
    answer = "You are wrong"
  }
  const pushAction = StackActions.push('Challenge',{answer:"default"});
  return (
      <View>
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
    backgroundColor: 'white',
  
},
correct:{
  paddingTop: 40,
  fontWeight: 'bold',
  fontSize :30,
  backgroundColor: 'white',
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
