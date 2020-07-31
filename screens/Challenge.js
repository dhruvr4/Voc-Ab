import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';
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

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height)

export default function Challenge({ navigation, route }) {
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
    create_database(val)
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
    let ans = (correct.toLocaleLowerCase() === answer.toLocaleLowerCase())
    navigation.navigate("ChallengeResult", { answer: ans, correct: correct, mode: result, perwee: perweek, question: text, lvl: lvl, xp: xp, pu: powerupp })
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  function powerup() {
    if (powerupp > 0 && text3.length < correct.length) {
      setText3(text3 + correct[text3.length])
      sethint2("Hint : The word starts with " + text3 + correct[text3.length] + " The length of the word is = " + correct.length)
      setpowerupp(powerupp - 1)
    }
  }

  const result = route.params.answer
  const perweek = route.params.perweek
  const lvl = route.params.lvl
  const xp = route.params.xp
  var pu = route.params.pu

  let txt = ''
  let cor = ''
  let arr = []

  let txt2 = ''
  load(result)
  const [powerupp, setpowerupp] = React.useState(pu)
  const [text, setText] = React.useState(txt)
  const [options, setOptions] = React.useState(arr)
  const [correct, setCorrect] = React.useState(cor)
  const [text2, setText2] = React.useState(txt2)
  const [text3, setText3] = React.useState(correct[0].toLocaleUpperCase())

  const hint = "Hint : The word starts with " + text3 + " The length of the word is = " + correct.length;
  const [hint2, sethint2] = React.useState(hint)

  return (
    <KeyboardAvoidingView
    behavior= "position" 
    style={{ flex: 1, backgroundColor : 'white'}} keyboardVerticalOffset = {-100}>
        <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: result, perweek: perweek, lvl: lvl, xp: xp, pu: powerupp })} style={styles.home} />
        <TouchableOpacity style={styles.PowerButton} onPress={() => { powerup() }}>
        <Text style={styles.AnswerText}>Power Up</Text>
      </TouchableOpacity>
        <View style={styles.questionBox}>
          <Text style={styles.text}> {text}</Text>
        </View>
       
        <View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center', paddingTop: screenHeight / 15 }}>
          <Text style={styles.text2}> {hint2}</Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here!"
            onChangeText={text2 => setText2(text2)}
            defaultValue={text2}
          />
        </View>
        <Button
          onPress={() => { answer(text2) }}
          title="Enter"
          color="#841584"
        />
     </KeyboardAvoidingView>
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
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: "center"
  },
  questionBox: {
    width: screenWidth - 40,
    height: screenHeight / 5,
    backgroundColor: '#ebb400',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: screenHeight / 6,
  },
  text: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 36,
  },
  text2: {
    textAlign: "center",
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: screenWidth / 8,
    paddingRight: screenWidth / 8,
  },
  inputBox: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: screenHeight / 20,
    width: screenWidth - 40,
    borderWidth: 1,
  }
});