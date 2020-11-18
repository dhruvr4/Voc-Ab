import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons'
import firebase from 'firebase'
import { normalize } from '../util';
import datab from './WordsDatabase'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function LearnItResult({ route, navigation }) {
  let answer = "Time Up"
  var words_done = route.params.words_done
  const result = JSON.stringify(route.params.answer)
  const correct = (route.params.correct)
  const question = (route.params.question)
  const mod = route.params.mode
  var lvl = route.params.lvl
  var xp = route.params.xp
  var pu = route.params.pu
  let Color = ""
  if (result === 'true') {
    if (!words_done[mod].includes(question)){
    words_done[mod].push(question)
    }
    if (mod == "easy") {
      xp = xp + 5
    }
    if (mod == "medium") {
      xp = xp + 10
    }
    if (mod == "hard") {
      xp = xp + 20
    }
    answer = "Correct"
    Color = "green"
  }
  if (result === 'false') {
    answer = "Incorrect"
    Color = "red"
  }
  const levels = []
  for (var i = 100; i < 10000; i = i + 10) {
    levels[i / 10 - 10] = i
  }

  function lvlupdate() {
    while (xp > levels[lvl]) {
      xp = xp - levels[lvl]
      lvl = lvl + 1
      pu = pu + 1
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

  lvlupdate()
  check_words_done()

  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  var userInfoRef = db.collection("Users").doc(user.uid);
  userInfoRef.update({
    "mode": mod,
    "words_done": words_done,
    "level": lvl,
    "xp": xp,
    "powerups": pu
  })

  const pushAction = StackActions.push('LearnIt', { answer: mod, lvl: lvl, xp: xp, pu: pu, words_done: words_done });

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <IconBack name="home" size={normalize(40)} onPress={() => navigation.navigate('Home', { mode: mod, lvl: lvl, xp: xp, pu: pu, words_done: words_done })} style={styles.home} />

      <Text style={{
        paddingTop: '4%',
        fontSize: normalize(48),
        fontFamily: 'ReemKufi',
        alignSelf: 'center',
        color: Color,
      }}>{answer}</Text>
      <Text style={{ fontSize: normalize(40), alignSelf: 'center', paddingTop: '11%', fontFamily: 'ReemKufi'}}>The answer is:</Text>
      <View style={styles.WordOfDay}>
        <Text style={styles.WordText}>{correct.charAt(0).toUpperCase() + correct.substring(1, correct.length)}</Text>
        <Text style={styles.DefinitionText}>{question.charAt(0).toUpperCase() + question.substring(1, question.length)}</Text>
      </View>
      <IconForward name="control-forward" size={normalize(50)} onPress={() => navigation.dispatch(pushAction)} style={styles.forward} />
    </View>
  );
}
const styles = StyleSheet.create({
  forward: {
    alignSelf: 'center',
    marginTop: '20%'
  },
  correct: {
    paddingTop: 40,
    fontSize: 30,
    backgroundColor: 'white',
    fontFamily: 'ReemKufi',
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
    fontSize: normalize(15),
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  home: {
    paddingTop: screenHeight / 15 + 4,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  WordText: {
    fontFamily: 'ReemKufi',
    fontSize: normalize(34),
    alignSelf: 'center',
    paddingTop: normalize(10),
    fontWeight:'400',
  },
  DefinitionText: {
    fontWeight: '300',
    fontFamily: 'ReemKufi',
    fontSize: normalize(24),
    paddingLeft: normalize(25),
    paddingRight: screenWidth / 35,
    paddingTop: normalize(25),
    marginBottom: '11%'
  },
  WordOfDay: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: screenHeight / 20,
    backgroundColor: 'white',
    width: screenWidth - 40,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  }
});
