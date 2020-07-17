
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings } from 'react-native';
import { Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import IconSetting from 'react-native-vector-icons/Feather';
import IconLeader from 'react-native-vector-icons/MaterialCommunityIcons';
import { MonoText } from '../components/StyledText';
import * as Progress from 'react-native-progress';
import GRE1 from './Data/GRE_list_1.json';
import GRE2 from './Data/GRE_list_2.json';
import GRE3 from './Data/GRE_list_3.json';
import GRE4 from './Data/GRE_list_4.json';
import GRE5 from './Data/GRE_list_5.json';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function HomeScreen({ navigation }) {
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
  function create_database() {
    for (var i = 0; i < 262; i++) {
      add(GRE1.Adjective[i], GRE1.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE2.Adjective[i], GRE2.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE3.Adjective[i], GRE3.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE4.Adjective[i], GRE4.Word[i], "default");
    }
    for (var i = 0; i < 262; i++) {
      add(GRE5.Adjective[i], GRE5.Word[i], "default");
    }
  }
  function add(a, def, type) {
    const toAdd = new Question(a, def);
    datab[type].push(toAdd)
  }
  function load(val) {
    console.log("Load function started")
    create_database()

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
  }

  let txt=''
  let cor =''
  let arr=[]
  load('default')
  let ans = "default"
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row' }}>
        <IconSetting name="settings" size={40} onPress={() => navigation.navigate('Setting')} style={styles.wrenchIcon} />
        <View style={styles.progressBar}>
          <Progress.Bar progress={0.75} color={'blue'} width={screenWidth / 2} size={50} borderColor={'white'}
            unfilledColor={'white'} height={10} borderRadius={5} borderWidth={1.5} />
        </View>
        <IconLeader name="podium" size={43} onPress={() => navigation.navigate('Setting')} style={styles.globeIcon} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.ButtonText}>VOC-AB</Text>
      </View>

      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.play} onPress={() => navigation.navigate("LearnIt", { answer: ans })}>
            <Text style={{ fontFamily: 'serif', fontSize: 48, fontWeight: '700' }}>Learn It</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeTrial} onPress={() => navigation.navigate("TimeTrial", { answer: ans })}>
            <Text style={{ fontSize: 48, fontWeight: '700', fontFamily: 'serif' }}>Time Trial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wordUp} onPress={() => navigation.navigate("Challenge", { answer: ans })}>
            <Text style={{ fontSize: 48, fontWeight: '700', fontFamily: 'serif' }}>Challenge</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.swipeText}>Word Of the day</Text>
      </View>

      <View style={{
        alignItems: 'center', justifyContent: 'center', marginTop: 30,
        backgroundColor: 'white', width: screenWidth,
      }}>
        <Text>{cor}:{txt}</Text>
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
    backgroundColor: '#D1F6FF',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 270,
    marginTop: 70
  },
  ButtonText: {
    fontSize: 70,
    fontWeight: '700',
    fontFamily: 'serif',
  },
  wrenchIcon: {
    paddingTop: screenHeight / 15 + 4,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  globeIcon: {
    paddingTop: screenHeight / 15,
    paddingRight: 10,
    right: 10,
    color: 'black',
  },
  play: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: screenWidth - 50,
    backgroundColor: 'white',
    marginLeft: 15,
  },
  timeTrial: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 50,
    backgroundColor: '#76E0D3',
    borderRadius: 15,
    paddingRight: 10,
    marginLeft: 15,
  },
  wordUp: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 50,
    backgroundColor: '#EA8585',
    borderRadius: 15,
    marginLeft: 15,
  },
  swipeText: {
    fontSize: 38,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  progressBar: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight / 15 + 4,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  }
});