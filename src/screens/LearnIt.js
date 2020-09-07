import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import IconBack from 'react-native-vector-icons/AntDesign';
import datab from './WordsDatabase.js';
import { normalize } from '../util.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function LearnIt({ navigation, route }) {
  function load(val) {
    var ques = datab[val][0]   
    do {
     ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    }while(words_done[val].includes(ques.question))
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
    navigation.navigate("LearnItResult", { answer: ans, correct: correct, mode: result, question : text,lvl:lvl,xp:xp,pu:pu,words_done:words_done })
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  var words_done = route.params.words_done
  //console.log(words_done)
  var result = route.params.answer
  const lvl = route.params.lvl
  const xp=route.params.xp
  const pu = route.params.pu
  //console.log(result)
 // console.log(words_done)
  let txt = ''
  let cor = ''
  let arr = []
  load(result)
  const [text, setText] = React.useState(txt)
  const [options, setOptions] = React.useState(arr)
  const [correct, setCorrect] = React.useState(cor)
  return (
    <View style={{ flex: 1, backgroundColor: '#f5fcfc' }}>
      <IconBack name="home" size={normalize(40)} onPress={() => navigation.navigate('Home', { mode: result,lvl:lvl,xp:xp,pu:pu,words_done:words_done })} style={styles.home} />
      <Text style={styles.quest}>GIVE ONE WORD FOR...</Text>
      <View style = {{flexWrap : 'wrap', alignContent: 'center'}}>
        <TouchableOpacity style={styles.QuestionContainer}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5fcfc' }}>
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
    paddingTop: screenHeight/15,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  text: {
    fontSize: normalize(31),
    fontWeight: '900',
    color: 'white',
    fontFamily : 'ReemKufi',
    textAlign : 'center'
  },
  QuestionContainer: {
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor: '#003f9e',
    borderRadius: 20,
    marginTop: '2%',
    paddingVertical : normalize(15),
    paddingHorizontal: normalize(5),
    width : screenWidth  - 40,
    minHeight: '20%',
  },
  AnswerText: {
    fontSize: normalize(25),
    marginVertical:normalize(10),
    color: 'white',
    fontWeight : '800',
    fontFamily : 'ReemKufi'
  },
  AnswerButton: {
    width: screenWidth - 45,
    backgroundColor: '#0b5cd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    borderRadius: 30,
  },
  FirstAnswerButton: {
    width: screenWidth - 45,
    backgroundColor: '#0b5cd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '13%',
    borderRadius: 30,
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
});
