import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function ResultScreen({route,navigation}) {
    const answer = JSON.stringify(route.params.answer)?"You are Correct!!":"You are wrong!!"
  return (
      <View>
    <Text style = {styles.result}> {answer}</Text>
    <Button title="Again" onPress={() => navigation.navigate('Play')} />
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
