
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import IconSetting from 'react-native-vector-icons/Feather';
import ProgressCircle from 'react-native-progress-circle'
import datab from './WordsDatabase'
import Coverflow from 'react-native-coverflow';
import firebase from 'firebase'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
let unsubscribe;

function HomeScreen({ navigation, route }) {
  console.log("lollll")
  let words_done = { "easy": [], "medium": [], "hard": [] }
  let ans = "hard"
  let lvl = 1
  let xp = 0
  let pu = 0
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  var userInfoRef = db.collection("Users").doc(user.uid);
  const levels = []
  for (var i = 100; i < 400; i = i + 10) {
    levels[i / 10 - 10] = i
  }

  lvlupdate()
  console.log("Data Received"+route.params)

  try {
    if (route.params.xp >-1){
    console.log("Pulling from phone ")
    words_done = route.params.words_done
    ans = route.params.mode
    lvl = route.params.lvl
    xp = route.params.xp
    pu = route.params.pu
    userInfoRef.update({
      "mode": ans,
      "words_done": words_done,
      "level": lvl,
      "xp": xp,
      "powerups": pu
    })
  }
  else {
    throw Error
  }
}
catch {
if (route.params== undefined || route.params.xp <0){
  console.log("Pulling from firebase")
  userInfoRef.onSnapshot((doc) => {
    words_done = doc.data().words_done;
    ans = doc.data().mode
    lvl = doc.data().level
    xp = doc.data().xp
    pu = doc.data().powerups
  })
}
}
  function load(val) {
    const today = new Date().getFullYear() * 365 + new Date().getMonth() * 31 + new Date().getDate()
    var num = Math.abs((today) % datab['default'].length)
    const ques = datab['default'][num]
    txt = ques.question
    cor = ques.correctanswer
  }
  function lvlupdate() {
    while (xp > levels[lvl]) {
      xp = xp - levels[lvl]
      lvl = lvl + 1
      pu = pu + 1
    }
  }

  let txt = ''
  let cor = ''
  let arr = []
  load('default')
  //console.log(ans)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <IconSetting name="settings" size={45} onPress={() => navigation.navigate('Setting', { mode: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })} style={styles.wrenchIcon} />
        <View style={styles.titleContainer}>
          <Text style={styles.ButtonText}>VOC-AB</Text>
        </View>
        <View style={styles.Progress}>
          <ProgressCircle
            percent={(xp / levels[lvl]) * 100}
            radius={25}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#e6e6e6"
            bgColor="#fff">
            <Text style={{ fontSize: 20 }}>{lvl}</Text>
          </ProgressCircle>
        </View>
      </View>
      <View>
        <Coverflow style={styles.buttonContainer} onChange={(index) => {
          console.log('Current item', index)
          setTimeout(function(){},10000)
          }}>
            <TouchableOpacity style={styles.play} onPress={() => navigation.navigate("LearnIt", { answer: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}>
              <Text style={{ fontFamily: 'serif', fontSize: 48, fontWeight: '700', color: 'white' }}>Learn It</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeTrial} onPress={() => navigation.navigate("TimeTrial", { answer: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}>
              <Text style={{ fontSize: 48, fontWeight: '700', fontFamily: 'serif', color: 'white' }}>Time Trial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wordUp} onPress={() => navigation.navigate("Challenge", { answer: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}>
              <Text style={{ fontSize: 48, fontWeight: '700', fontFamily: 'serif', color: 'white' }}>Challenge</Text>
            </TouchableOpacity>
        </Coverflow>
      </View>
      
      <View style={{ flexDirection: 'row', paddingTop: screenHeight / 13, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ paddingRight: screenWidth / 10, paddingTop: 6 }}>
          <IconSetting name="book-open" size={40} onPress={() => navigation.navigate('Dictionary', { mode: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })} style={styles.Dictionary} />
        </View>
        <View style={{ paddingRight: screenWidth / 10 }}>
          <Text style={{ fontSize: 38, fontWeight: '600', }}>Word Of the day</Text>
        </View>
      </View>

      <View style={styles.WordOfDay}>
        <Text style={styles.WordText}>{cor.charAt(0).toUpperCase() + cor.substring(1, cor.length)}</Text>
        <Text style={styles.DefinitionText}>{txt}</Text>
      </View>
    </View>
  )
}
HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcfc',
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: screenHeight / 3.6,
    width : screenWidth,
    marginTop: screenHeight / 20,
  },
  ButtonText: {
    fontSize: 60,
    fontWeight: '700',
    fontFamily: 'serif',
  },
  wrenchIcon: {
    paddingTop: screenHeight / 15,
    paddingLeft: screenHeight / 40,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: 'black',
  },
  play: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    width: screenWidth - 50,
    height : screenHeight / 3.2,
    backgroundColor: '#0b5cd5',
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 20,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.00,
    elevation: 24,
  },
  timeTrial: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 50,
    height : screenHeight / 3.2,
    backgroundColor: '#bd0a0a',
    borderRadius: 35,
    paddingRight: 10,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 20,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.00,
    elevation: 24,
  },
  wordUp: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 50,
    backgroundColor: '#ffc300',
    borderRadius: 35,
    marginLeft: 15,
    height : screenHeight / 3.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 20,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.00,
    elevation: 24,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: screenHeight / 20,
  },
  WordText: {
    fontWeight: '700',
    fontSize: 32,
    alignSelf: 'flex-start',
    paddingLeft: screenWidth / 30,
    paddingTop: screenHeight / 60
  },
  DefinitionText: {
    fontWeight: '300',
    fontSize: 24,
    paddingLeft: screenWidth / 10,
    paddingRight: screenWidth / 35,
    paddingTop: screenHeight / 55
  },
  WordOfDay: {
    borderRadius: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: 'white',
    width: screenWidth - 40,
    height: screenHeight / 3.2,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  Progress: {
    paddingBottom: screenHeight / 70,
    paddingRight: screenWidth / 20,
    alignItems: "flex-end",
    justifyContent: 'flex-end',
  },
  Dictionary: {
    paddingLeft: screenHeight / 45,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: 'black',
  }
});
