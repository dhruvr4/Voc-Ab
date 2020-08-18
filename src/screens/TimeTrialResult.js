import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons';
import firebase from 'firebase'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function TimeTrialResult({ route, navigation }) {
  let answer = "Time Up"
  const result = "You got " + JSON.stringify(route.params.answer) + " correct"
  const correct = route.params.correct
  const mod = route.params.mode
  var lvl = route.params.lvl
  var words_done = route.params.words_done
  var xp = route.params.xp
  var pu = route.params.pu
  for (var i = 0; i < correct.length; i++) {
    const ab = correct[i][3] ? "Correct" : "Wrong"
    if (ab == "Correct") {
      words_done[mod].push(correct[i][0])
      if (mod == "easy") {
        xp = xp + 5
      }
      if (mod == "medium") {
        xp = xp + 10
      }
      if (mod == "hard") {
        xp = xp + 20
      }
    }
  }
 // console.log(words_done)
  function lvlupdate() {
    while (xp > levels[lvl]) {
      xp = xp - levels[lvl]
      lvl = lvl + 1
      pu = pu + 1
    }
  }

  const levels = []
  for (var i = 100; i < 10000; i = i + 10) {
    levels[i / 10 - 10] = i
  }
  lvlupdate();
  words_done[mod] = words_done[mod].filter((item, index) => words_done[mod].indexOf(item) === index);
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



  const r = []
  for (var f = 0; f < correct.length; f++) {
    const a = (correct[f][1] === correct[f][2]) ? "#5cb908" : "#ff5252"
    //console.log("Result = " + correct[f][0] + correct[f][1] + correct[f][2])

    r.push({
      ans: correct[f][0],
      def: correct[f][2],
      color: a
    })
  }

  const Item = ({ def, correctAns, color }) => (
    <View style={{
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: screenHeight / 20,
      backgroundColor: 'white',
      width: screenWidth - 40,
      height: screenHeight / 4,
      alignSelf: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
      backgroundColor: color,
      borderRadius: 20,
    }}>
      <Text style={styles.WordText}>{def}</Text>
      <Text style={styles.DefinitionText}>{correctAns}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item def={item.def} correctAns={item.ans} color={item.color} />
  );
  const pushAction2 = StackActions.push('TimeTrial', { answer: mod, lvl: lvl, xp: xp, pu: pu, words_done: words_done });
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: mod, lvl: lvl, xp: xp, pu: pu, words_done: words_done })} style={styles.home} />
        <Text style={styles.result}> {result}</Text>
        <FlatList
          data={r}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <IconForward name="control-forward" size={50} onPress={() => navigation.dispatch(pushAction2)} style={{ alignSelf: 'center', paddingTop: screenHeight / 20, marginBottom: screenHeight / 20 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    paddingTop: screenHeight / 15,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  result: {
    paddingTop: screenHeight / 35,
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center'
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
  WordText: {
    fontWeight: '700',
    fontSize: 32,
    alignSelf: 'center',
    paddingTop: screenHeight / 60,
    color: 'white'
  },
  DefinitionText: {
    fontWeight: '300',
    fontSize: 24,
    paddingLeft: screenWidth / 10,
    paddingRight: screenWidth / 10,
    paddingTop: screenHeight / 20,
    alignSelf: 'center',
    color: 'white'
  },
});
