import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';

export default function TimeTrialResult({ route, navigation }) {
  let answer = "Time Up"
  const result = "You got " + JSON.stringify(route.params.answer) + "correct"
  const correct = route.params.correct
  const mod = route.params.mode
  const per = route.params.perwee
  const lvl = route.params.lvl
  var xp=route.params.xp
  const pu = route.params.pu
  
  var corr = ""
  for (var i = 0; i < correct.length; i++) {
    const ab = correct[i][3]? "Correct":"Wrong"
    if(ab == "Correct") {
      if (mod == "easy") {
        xp = xp+20
      }
      if (mod == "medium") {
        xp = xp+30
      }
      if (mod == "hard") {
        xp = xp+50
      }
  
    }
    corr = corr + "For the definition " + correct[i][0] + "You chose " + correct[i][1] + "Correct Answer was " + correct[i][2] + "You were " + ab
  }
  const pushAction2 = StackActions.push('TimeTrial', { answer: mod,perweek:per,lvl:lvl,xp:xp,pu:pu });
  return (
    <View>
      <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: mod, perweek: per,lvl:lvl,xp:xp,pu:pu })} style={styles.home} />
      <Text style={styles.result}> {result}</Text>
      <Text style={styles.correct}> {corr}</Text>
      <Button title="Again" onPress={() => navigation.dispatch(pushAction2)} />
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    paddingTop: 30,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  result: {
    paddingTop: 100,
    fontWeight: 'bold',
    fontSize: 40,
    backgroundColor: 'white',

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
});
