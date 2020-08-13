import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons'
import firebase from 'firebase'

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
  var xp=route.params.xp
  var pu = route.params.pu
  let Color = ""
  if (result === 'true') {
    words_done[mod].push(question)
    if (mod == "easy") {
      xp = xp+20
    }
    if (mod == "medium") {
      xp = xp+30
    }
    if (mod == "hard") {
      xp = xp+50
    }
    answer = "Correct"
    Color = "green"
  }
  if (result === 'false') {
    answer = "Incorrect"
    Color = "red"
  }
  const levels = []
  for (var i = 100; i < 400; i = i + 10) {
    levels[i / 10 - 10] = i
  }

  function lvlupdate() {
    while (xp > levels[lvl]) {
      xp = xp - levels[lvl]
      lvl = lvl + 1
      pu = pu + 1
    }}
lvlupdate()

var user = firebase.auth().currentUser;
var db = firebase.firestore();
var signed_in = false
try {
var userInfoRef = db.collection("Users").doc(user.uid);  
signed_in= true
}
catch{}
if (signed_in){
  userInfoRef.update({
    "mode":mod,
    "words_done": words_done,
    "level":lvl,
    "xp":xp,
    "powerups":pu
  })
}





  const pushAction = StackActions.push('LearnIt', { answer: mod,lvl:lvl,xp:xp,pu:pu,words_done:words_done});
  
  return (
    <View style = {{flex : 1, backgroundColor : 'white'}}>
      <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: mod,lvl:lvl,xp:xp,pu:pu,words_done:words_done })} style={styles.home} />

      <Text style={{
        paddingTop: screenHeight/20,
        fontWeight: '700',
        fontSize: 48,
        alignSelf : 'center',
        color : Color,
      }}> {answer}</Text>
      <Text style = {{fontSize : 40, alignSelf : 'center', paddingTop : screenHeight/ 10,}}>The answer is </Text>
      <View style={styles.WordOfDay}>
        <Text style={styles.WordText}>{correct.charAt(0).toUpperCase()+correct.substring(1,correct.length)}</Text>
        <Text style={styles.DefinitionText}>{question.charAt(0).toUpperCase()+question.substring(1,question.length)}</Text>
    </View>
      <IconForward name = "control-forward" size={50} onPress={() => navigation.dispatch(pushAction)} style = {styles.forward}/>
    </View>
  );
}
const styles = StyleSheet.create({
  forward: {
    alignSelf : 'center',
    paddingTop : screenHeight / 10
  },
  correct: {
    paddingTop: 40,
    fontWeight: 'bold',
    fontSize: 30,
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
  home : {
    paddingTop: screenHeight / 15 + 4,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  WordText: {
    fontWeight: '700',
    fontSize : 32,
    alignSelf : 'center',
    paddingTop : screenHeight / 60
  },
  DefinitionText : {
    fontWeight : '300',
    fontSize : 24,
    paddingLeft : screenWidth / 10,
    paddingRight : screenWidth / 10,
    paddingTop : screenHeight / 20,
    alignSelf : 'center'
  },
  WordOfDay : {
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    marginTop: screenHeight / 20,
    backgroundColor: 'white', 
    width: screenWidth - 40, 
    height : screenHeight/4, 
    alignSelf : 'center',
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
