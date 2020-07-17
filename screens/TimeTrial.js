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

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height)

export default function TimeTrial({ navigation, route }) {
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
  function create_database() {
    for (var i = 0; i < 262; i++) {
      add(GRE1.Adjective[i], GRE1.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE2.Adjective[i], GRE2.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE3.Adjective[i], GRE3.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE4.Adjective[i], GRE4.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE5.Adjective[i], GRE5.Word[i], "default");
    }


  }
  function add(a, def, type) {

    const toAdd = new Question(a, def);
    datab[type].push(toAdd)
  }
  function load(val) {
    console.log("Load function started")
    create_database()
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
    //console.log(txt)
    //console.log(cor)
    //console.log(options)
  }

  function answer(answer) {
    let va = (options).indexOf(correct) === answer
    if (answer == -1) {
      va = "Time Up"
      navigat(va)
    }
    //console.log(va)

    if (va === true) {
      settotscore(totscore + 1)
    }
    if (va === false) {
      settotwrong([...totwrong, [text, options[answer], correct]])
    }
    nextQuestion()
  }
  function nextQuestion() {
    val = "default"
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
  setText(txt)
  setCorrect(cor)
  setOptions(arr)
        
  }

  function navigat(ans) {
    clearInterval(time)
    //console.log(totscore)
    //console.log(totwrong)
    navigation.navigate("TimeTrialResult", { answer: totscore, correct: totwrong })
  }

  function tick() {
    if (timer == 0) {
      answer(-1)
    }
    else {
      setTimer(timer - 1)
    }
  }
  React.useEffect(() => {
    time = setInterval(tick, 1000)
    return () => {
      clearInterval(time)
    }
  })

  function shuffle(array) {

    array.sort(() => Math.random() - 0.5);
  }
  const result = JSON.stringify(route.params.answer)
  resul = result.substring(1, result.length - 1)
  //console.log(resul)
  let txt = ''
  let cor = ''
  let arr = []
  load(resul)
  const [text, setText] = React.useState(txt)
  const [options, setOptions] = React.useState(arr)
  const [correct, setCorrect] = React.useState(cor)
  const [totscore, settotscore] = React.useState(0)
  const [totwrong, settotwrong] = React.useState([])
  let [timer, setTimer] = React.useState(10)
  let time = null
  //let time = setInterval(this.tick, 1000);
  return (
    <View style={{ flex: 1, backgroundColor: '#F0FFF0' }}>
      <Text style={styles.timer}> {timer}</Text>
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
