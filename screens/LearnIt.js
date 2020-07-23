import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';
import { Dimensions } from "react-native";
import GRE1 from './Data/GRE_list_1.json';
import GRE2 from './Data/GRE_list_2.json';
import GRE3 from './Data/GRE_list_3.json';
import GRE4 from './Data/GRE_list_4.json';
import GRE5 from './Data/GRE_list_5.json';
import SAT1 from './Data/SAT_list_1.json';
import SAT2 from './Data/SAT_list_2.json';
import SAT3 from './Data/SAT_list_3.json';
import SAT4 from './Data/SAT_list_4.json';
import SAT5 from './Data/SAT_list_5.json';

import Coverflow from 'react-native-coverflow';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function LearnIt({ navigation, route }) {
  class Question {
    question = "";
    correctanswer = "";
    constructor(a, c) {
      this.question = a;
      this.correctanswer = c;
    }
  }
  const datab = {
    easy: [],
    medium: [],
    hard: [],
    default: []
  }
  function create_database(val) {
    if (val == "easy") {
      for (var i = 0; i < Object.values(SAT1.Adjective).length; i++) {
        add(SAT1.Adjective[i], SAT1.Word[i], "easy");
      }
      for (var i = 0; i < Object.values(SAT2.Adjective).length; i++) {
        add(SAT2.Adjective[i], SAT2.Word[i], "easy");
      }
  }
  if (val == "medium") {
    for (var i = 0; i < Object.values(SAT3.Adjective).length; i++) {
      add(SAT3.Adjective[i], SAT3.Word[i], "medium");
    }
    for (var i = 0; i < Object.values(SAT4.Adjective).length; i++) {
      add(SAT4.Adjective[i], SAT4.Word[i], "medium");
    }
    for (var i = 0; i < Object.values(SAT5.Adjective).length; i++) {
      add(SAT5.Adjective[i], SAT5.Word[i], "medium");
    }
  }
  if (val == "hard") {    
    for (var i = 0; i < Object.values(GRE1.Adjective).length; i++) {
      add(GRE1.Adjective[i], GRE1.Word[i], "hard");
    }
    for (var i = 0; i < Object.values(GRE2.Adjective).length; i++) {
      add(GRE2.Adjective[i], GRE2.Word[i], "hard");
    }
    for (var i = 0; i < Object.values(GRE3.Adjective).length; i++) {
      add(GRE3.Adjective[i], GRE3.Word[i], "hard");
    }
    for (var i = 0; i < Object.values(GRE4.Adjective).length; i++) {
      add(GRE4.Adjective[i], GRE4.Word[i], "hard");
    }
    for (var i = 0; i < Object.values(GRE5.Adjective).length; i++) {
      add(GRE5.Adjective[i], GRE5.Word[i], "hard");
    }
  }
  }
  function add(a, def, type) {
    const toAdd = new Question(a, def);
    datab[type].push(toAdd)
  }
  function load(val) {
    //console.log(datab)
    console.log("Load function started")
    create_database(val)
    //console.log(datab)

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
    navigation.navigate("LearnItResult", { answer: ans, correct: correct, mode: result, perwee: perweek })
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  var result = route.params.answer
  const perweek = route.params.perweek
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
      <View style={styles.QuestionContainer}>
        <Text style={styles.text}> {text}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FFF0' }}>
        <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { answer(0) }}>
          <Text style={styles.AnswerText}>{options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerButtonBlue} onPress={() => { answer(1) }}>
          <Text style={styles.AnswerText}>{options[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { answer(2) }}>
          <Text style={styles.AnswerText}>{options[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerButtonBlue} onPress={() => { answer(3) }}>
          <Text style={styles.AnswerText}>{options[3]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
    backgroundColor: '#696969',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 60,
  },
  AnswerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  AnswerButtonBlack: {
    width: screenWidth - 40,
    height: 55,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    borderRadius: 30,
  },
  AnswerButtonBlue: {
    width: screenWidth - 40,
    height: 55,
    backgroundColor: '#4455BB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    borderRadius: 30,
  }
});
