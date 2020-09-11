import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from "react-native";
import datab from './WordsDatabase'
import IconBack from 'react-native-vector-icons/AntDesign';
import IconPower from 'react-native-vector-icons/AntDesign';

import { StackActions } from '@react-navigation/native';
import { normalize } from '../util';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height)

export default function TimeTrial({ navigation, route }) {
  function load(val) {
    // console.log("Load function started")
    var incorrects = []

    var ques = datab[val][0]
    do {
      ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    } while (words_done[val].includes(ques.question))
    //console.log(ques)
    txt = ques.question
    cor = ques.correctanswer
    var ar = [ques.correctanswer]
    var pups = [true, true, true, true]

    while (ar.length < 4) {
      const ques2 = datab[val][Math.floor(Math.random() * datab[val].length)]
      if (!(arr.includes(ques.correctanswer))) {
        ar.push(ques2.correctanswer)
        incorrects.push(ques2.correctanswer)

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
    setto_show([true, true, true, true])
    if (va === true) {
      settotscore(totscore + 1)
      words_done[mode] = [...words_done[mode],text]
      check_words_done()
      settotwrong([...totwrong, [text, options[answer], correct, va]])
    }
    if (va === false) {
      settotwrong([...totwrong, [text, options[answer], correct, va]])
    }
    nextQuestion()
    setTimer(tim - (new Date().getMinutes() * 60 + new Date().getSeconds()) + tx)
    if (timer < 0.5) {
      //setTimer(-1)
      navigat()
    }
  }
  function   check_words_done(){
    
    if(words_done["easy"].length==datab["easy"].length){
      words_done["easy"]=[]
    }
    if(words_done["medium"].length==datab["medium"].length){
      words_done["medium"]=[]
    }
    if(words_done["hard"].length==datab["hard"].length){
      words_done["hard"]=[]
    }
    
  }

  function nextQuestion() {
    var incorrects = []
    const val = mode
    var ques = datab[val][0]
    do {
      ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    } while (words_done[val].includes(ques.question))
    txt = ques.question
    cor = ques.correctanswer
    var ar = [ques.correctanswer]
    var pups = [true, true, true, true]
    while (ar.length < 4) {
      const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
      if (!(ar.includes(ques.correctanswer))) {
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
    // console.log(pu)
    const pushAction2 = StackActions.push("TimeTrialResult", { answer: totscore, correct: totwrong, mode: mode, lvl: lvl, xp: xp, pu: powerupp, question: text, words_done: words_done });
    navigation.dispatch(pushAction2)
  }

  function tick() {
    if (timer < 0.5) {
      //      setTimer(-1)
      navigat()
    }
    else {
      setTimer(tim - (new Date().getMinutes() * 60 + new Date().getSeconds()) + tx)
    }
  }
  React.useEffect(() => {
    do2()
    return () => {
      clearInterval(time)
    }
  })
  function do2() {

    time = setInterval(tick, 100)
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  function powerup() {
    if (powerupp > 0 && JSON.stringify(to_show) == JSON.stringify([true, true, true, true])) {
      setto_show(show)
      setpowerupp(powerupp - 1)
    }
    //console.log(to_show)

  }
  const mode = route.params.answer
  const lvl = route.params.lvl
  const xp = route.params.xp
  var pu = route.params.pu
  var words_done = route.params.words_done

  let txt = ''
  let cor = ''
  let arr = []
  let powup = []
  const [tx] = React.useState(60)
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
  const [to_show, setto_show] = React.useState([true, true, true, true])

  let time = null
  return (
    <View style={{ flex: 1, backgroundColor: '#f5fcfc' }}>
      <View style={{ flexDirection: 'row' }}>
        <IconBack name="home" size={normalize(40)} onPress={() => navigation.navigate('Home', { mode: mode, lvl: lvl, xp: xp, pu: powerupp, words_done: words_done })} style={styles.home} />
        <View style={styles.PowerButton}>
          <IconPower name="star" size={normalize(40)} onPress={() => { powerup() }} style={{ alignSelf: 'flex-end' }} color='black' />
        </View>
      </View>

      <View style={styles.numberPow}>
        <Text style={{ fontSize: normalize(24) }}>{powerupp}</Text>
      </View>
      <Text style={styles.quest}>Choose The Correct Word...</Text>
      <Text style={styles.timer}>{timer}</Text>

      <View style={{ flexWrap: 'wrap', alignContent: 'center' }}>
        <TouchableOpacity style={styles.QuestionContainer}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5fcfc' }}>
        {
          to_show[0] &&
          <TouchableOpacity style={styles.FirstAnswerButton} onPress={() => { answer(0) }}>
            <Text style={styles.AnswerText}>{options[0]}</Text>
          </TouchableOpacity>
        }
        {
          to_show[1] &&
          <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(1) }}>
            <Text style={styles.AnswerText}>{options[1]}</Text>
          </TouchableOpacity>
        }
        {
          to_show[2] &&
          <TouchableOpacity style={styles.AnswerButton} onPress={() => { answer(2) }}>
            <Text style={styles.AnswerText}>{options[2]}</Text>
          </TouchableOpacity>
        }
        {
          to_show[3] &&
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
    width: screenWidth / 1.25,
    paddingTop: screenHeight / 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  home: {
    paddingTop: screenHeight/15,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  timer: {
    fontSize: normalize(46),
    textAlign: "center",
    fontFamily:'ReemKufi',
  },
  quest: {
    marginTop: '4%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: normalize(28),
    textAlign : 'center',
    fontFamily:'ReemKufi',
    paddingHorizontal:5,
  },
  text: {
    fontSize: normalize(30),
    fontWeight: '900',
    color: 'white',
    fontFamily : 'ReemKufi',
    textAlign : 'center'
  },
  QuestionContainer: {
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor: '#a50303',
    borderRadius: 20,
    marginTop: '2%',
    paddingVertical : normalize(14),
    paddingHorizontal: normalize(4),
    width : screenWidth  - 40,
    minHeight: '18%',
  },
  AnswerText: {
    fontSize: normalize(25),
    marginVertical:normalize(9),
    color: 'white',
    fontWeight : '800',
    fontFamily : 'ReemKufi'
  },
  AnswerButton: {
    width: screenWidth - 50,
    backgroundColor: '#bd0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    borderRadius: 30,
  },
  FirstAnswerButton: {
    width: screenWidth - 50,
    backgroundColor: '#bd0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    borderRadius: 30,
  },
  numberPow: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: screenWidth,
    paddingRight: screenWidth / 9,
  },
});
