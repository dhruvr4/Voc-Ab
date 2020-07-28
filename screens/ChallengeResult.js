import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function ChallengeResult({ route, navigation }) {
  let answer = "Time Up"
  const result = route.params.answer
  const correct = route.params.correct
  const question = route.params.question
  const mod = route.params.mode
  const per = route.params.perwee
  const lvl = route.params.lvl
  const xp=route.params.xp
  const pu = route.params.pu
      
  console.log(result)
  let Color = " "
  if (result === true) {
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
  if (result === false) {
    answer = "Incorrect"
    Color = "red"
  }
  const pushAction = StackActions.push('Challenge', { answer: mod,perweek:per,lvl:lvl,xp:xp,pu:pu });
  return (
    <View style = {{flex : 1, backgroundColor : 'white'}}>
      <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: mod, perweek: per,lvl:lvl,xp:xp,pu:pu })} style={styles.home} />

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
    paddingLeft : screenWidth / 30,
    paddingTop : screenHeight / 60
  },
  DefinitionText : {
    fontWeight : '300',
    fontSize : 24,
    paddingLeft : screenWidth / 10,
    paddingRight : screenWidth / 35,
    paddingTop : screenHeight / 20
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
