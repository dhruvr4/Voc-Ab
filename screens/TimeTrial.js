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
import IconBack from 'react-native-vector-icons/AntDesign';

import { StackActions } from '@react-navigation/native';
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
    console.log("Load function started")
    var incorrects = []

    create_database(val)
    const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    //console.log(ques)
    txt = ques.question
    cor = ques.correctanswer
    var ar = [ques.correctanswer]
    var pups = [true, true, true, true]
   
    while (ar.length < 4) {
      const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
      if (!(arr.includes(ques.correctanswer))) {
        ar.push(ques.correctanswer)
        incorrects.push(ques.correctanswer)
    
      }
    }
    arr = ar
    shuffle(arr)
    pups[arr.indexOf(incorrects[0])] = false
    pups[arr.indexOf(incorrects[1])] = false
    //console.log(pups)
    powup = pups

  }
  function answer(answer) {
    let va = (options).indexOf(correct) === answer
    setto_show([true,true,true,true])
    if (va === true) {
      settotscore(totscore + 1)
      settotwrong([...totwrong, [text, options[answer], correct, va]])
    }
    if (va === false) {
      settotwrong([...totwrong, [text, options[answer], correct, va]])
    }
    nextQuestion()
    setTimer(tim - (new Date().getMinutes() * 60 + new Date().getSeconds()) + tx)
    if (timer < 0.5) {
      navigat()
    }
  }
  function nextQuestion() {
    var incorrects = []
    const val = mode
    const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    txt = ques.question
    cor = ques.correctanswer
    var ar = [ques.correctanswer]
    var pups = [true, true, true, true]
    while (ar.length < 4) {
      const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
      if (!(arr.includes(ques.correctanswer))) {
        ar.push(ques.correctanswer)
        incorrects.push(ques.correctanswer)
      }
    }
    arr = ar
    shuffle(arr)
    pups[arr.indexOf(incorrects[0])] = false
    pups[arr.indexOf(incorrects[1])] = false
    //console.log(pups)
    setshow(pups)
    setText(txt)
    setCorrect(cor)
    setOptions(arr)
  }
  function navigat() {
    console.log("Navigat called")
    clearInterval(time)
    console.log(pu)
    const pushAction2 = StackActions.push("TimeTrialResult", { answer: totscore, correct: totwrong, mode: mode, perwee: perweek, lvl: lvl, xp: xp, pu: powerupp });
    navigation.dispatch(pushAction2)
  }

  function tick() {
    if (timer < 0.5) {
      navigat()
    }
    else {
      setTimer(tim - (new Date().getMinutes() * 60 + new Date().getSeconds()) + tx)
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
  function powerup() {
    console.log(powerupp)
    console.log(to_show)
    if(powerupp > 0 && JSON.stringify(to_show) == JSON.stringify([true,true,true,true])) {
    console.log("Hi")
    //console.log(show)
    setto_show(show)
    setpowerupp(powerupp-1)
    }
    //console.log(to_show)

  }
  const mode = route.params.answer
  const perweek = route.params.perweek
  const lvl = route.params.lvl
  const xp = route.params.xp
  var pu = route.params.pu

  let txt = ''
  let cor = ''
  let arr = []
  let powup = []
  const [tx] = React.useState(10)
  let [tim, settim] = React.useState(new Date().getMinutes() * 60 + new Date().getSeconds())
  let [timer, setTimer] = React.useState(tx)
  load(mode)
  const [powerupp, setpowerupp] = React.useState(pu)
  const [text, setText] = React.useState(txt)
  const [options, setOptions] = React.useState(arr)
  const [correct, setCorrect] = React.useState(cor)
  const [totscore, settotscore] = React.useState(0)
  const [totwrong, settotwrong] = React.useState([])
  const [show, setshow] = React.useState(powup)
  const [to_show, setto_show] = React.useState([true,true,true,true])

  let time = null
  return (
    <View style={{ flex: 1, backgroundColor: '#F0FFF0' }}>
      <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: mode, perweek: perweek, lvl: lvl, xp: xp, pu: powerupp })} style={styles.home} />
      <Text style={styles.timer}> {timer}</Text>

      <View style={styles.QuestionContainer}>
        <Text style={styles.text}> {text}</Text>
      </View>
      <TouchableOpacity style={styles.PowerButton} onPress={() => { powerup() }}>
        <Text style={styles.AnswerText}>Power Up</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FFF0' }}>
        {
        to_show[0] &&
          <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(0) }}>
            <Text style={styles.AnswerText}>{options[0]}</Text>
          </TouchableOpacity>
        }
        {
        to_show[1] &&
          <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(1) }}>
            <Text style={styles.AnswerText}>{options[1]}</Text>
          </TouchableOpacity>
        } 
      {to_show[2] &&
        <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(2) }}>
          <Text style={styles.AnswerText}>{options[2]}</Text>
        </TouchableOpacity>
      }
      {to_show[3] &&
        <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(3) }}>
          <Text style={styles.AnswerText}>{options[3]}</Text>
        </TouchableOpacity>
      }
               </View>
    
    </View>
  );
}
const styles = StyleSheet.create({
  PowerButton: {
    width: screenWidth - 300,
    height: 30,
    backgroundColor: '#bd0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    borderRadius: 30,
  },
  home: {
    paddingTop: 30,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  timer: {
    paddingTop: screenHeight / 50,
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
    backgroundColor: '#a50303',
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
  AnswerButton: {
    width: screenWidth - 40,
    height: 55,
    backgroundColor: '#bd0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderRadius: 30,
  },
});
