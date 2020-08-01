import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';
import { Dimensions } from "react-native";
import IconBack from 'react-native-vector-icons/AntDesign';
import datab from './WordsDatabase.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function LearnIt({ navigation, route }) {
  function load(val) {
    const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    txt = ques.question
    cor = ques.correctanswer
    var ar = [ques.correctanswer]
    while (ar.length < 4) {
      const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
      if (!(arr.includes(ques.correctanswer))) {
        ar.push(ques.correctanswer)
      }
    }
    arr = ar
    shuffle(arr)
  }
  function answer(answer) {
    let ans = ((options).indexOf(correct) === answer)
    navigation.navigate("LearnItResult", { answer: ans, correct: correct, mode: result, perwee: perweek, question : text,lvl:lvl,xp:xp,pu:pu })
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  var result = route.params.answer
  const perweek = route.params.perweek
  const lvl = route.params.lvl
  const xp=route.params.xp
  const pu = route.params.pu
  console.log(result)
  let txt = ''
  let cor = ''
  let arr = []
  load(result)
  const [text, setText] = React.useState(txt)
  const [options, setOptions] = React.useState(arr)
  const [correct, setCorrect] = React.useState(cor)
  return (
    <View style={{ flex: 1, backgroundColor: '#F0FFF0' }}>
      <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: result, perweek: perweek,lvl:lvl,xp:xp,pu:pu })} style={styles.home} />
      <View style={styles.QuestionContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FFF0' }}>
        <TouchableOpacity style={styles.FirstAnswerButton} onPress={() => { answer(0) }}>
          <Text style={styles.AnswerText}>{options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(1) }}>
          <Text style={styles.AnswerText}>{options[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(2) }}>
          <Text style={styles.AnswerText}>{options[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(3) }}>
          <Text style={styles.AnswerText}>{options[3]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  home : {
    paddingTop: 30,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  timer: {
    paddingTop: screenHeight / 10,
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: "center"
  },
  text: {
    fontWeight: 'bold',
    fontSize: 36,
    color: 'white'
  },
  QuestionContainer: {
    width: screenWidth - 40,
    height: 180,
    backgroundColor: '#003f9e',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: screenHeight/8,
  },
  AnswerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  AnswerButton: {
    width: screenWidth - 40,
    height: 55,
    backgroundColor: '#0b5cd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight/16,
    borderRadius: 30,
  },
  FirstAnswerButton: {
    width: screenWidth - 40,
    height: 55,
    backgroundColor: '#0b5cd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight/10,
    borderRadius: 30,
  }
});
