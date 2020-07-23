import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';

export default function ChallengeResult({ route, navigation }) {
  let answer = "Time Up"
  const result = JSON.stringify(route.params.answer)
  const correct = JSON.stringify(route.params.correct)
  const mod = route.params.mode
  const per = route.params.perwee
  if (result === 'true') {
    answer = "You are correct"
  }
  if (result === 'false') {
    answer = "You are wrong"
  }
  const pushAction = StackActions.push('Challenge', { answer: mod });
  return (
    <View>
      <IconBack name="back" size={40} onPress={() => navigation.navigate('Home', { mode: mod, perweek: per })} style={styles.back} />

      <Text style={styles.result}> {answer}</Text>
      <Text style={styles.correct}> Correct Answer was = {correct}</Text>
      <Button title="Again" onPress={() => navigation.dispatch(pushAction)} />
    </View>
  );
}
const styles = StyleSheet.create({
  back: {
    paddingTop: 25,
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
