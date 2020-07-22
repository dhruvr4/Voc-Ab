import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { MonoText } from '../components/StyledText';
//import IconBack from 'react-native-vector-icons/AntDesign';
import IconBack from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from "react-native";
import MultiSwitch from '../components/MultiSwitch';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


function SettingsScreen({ navigation, route }) {
  function navigat(ans) {
    navigation.navigate("LearnIt", { answer: ans })
  }
  function answer(num) {
    if (num == 1) {
      seteasy2()
    }
    if (num == 2) {
      setmedium2()
    }
    if (num == 3) {
      sethard2()
    }
  }
  function seteasy2() {
    if (easy == styles.AnswerButtonBlue) {
      seteasy(styles.AnswerButtonBlack)
      setmedium(styles.AnswerButtonBlue)
      sethard(styles.AnswerButtonBlue)
      setretu("easy")
    }
  }
  function setmedium2() {
    if (medium == styles.AnswerButtonBlue) {
      seteasy(styles.AnswerButtonBlue)
      setmedium(styles.AnswerButtonBlack)
      sethard(styles.AnswerButtonBlue)
      setretu("medium")
    }
  }
  function sethard2() {
    if (hard == styles.AnswerButtonBlue) {
      seteasy(styles.AnswerButtonBlue)
      setmedium(styles.AnswerButtonBlue)
      sethard(styles.AnswerButtonBlack)
      setretu("hard")
    }
  }
  function answer2(num) {
    console.log("Hi")
    if (num == 1) {
      setfifty2()
    }
    if (num == 2) {
      sethundred2()
    }
    if (num == 3) {
      settwohundred2()
    }
  }
  function setfifty2() {
    if (fifty == styles.AnswerButtonBlue) {
      setfifty(styles.AnswerButtonBlack)
      sethundred(styles.AnswerButtonBlue)
      settwohundred(styles.AnswerButtonBlue)
      setretu2("fifty")
    }
  }
  function sethundred2() {
    if (hundred == styles.AnswerButtonBlue) {
      setfifty(styles.AnswerButtonBlue)
      sethundred(styles.AnswerButtonBlack)
      settwohundred(styles.AnswerButtonBlue)
      setretu2("hundred")
    }
  }
  function settwohundred2() {
    if (twohundred == styles.AnswerButtonBlue) {
      setfifty(styles.AnswerButtonBlue)
      sethundred(styles.AnswerButtonBlue)
      settwohundred(styles.AnswerButtonBlack)
      setretu2("twohundred")
    }
  }
  const [easy, seteasy] = React.useState(styles.AnswerButtonBlue)
  const [medium, setmedium] = React.useState(styles.AnswerButtonBlack)
  const [hard, sethard] = React.useState(styles.AnswerButtonBlue)
  const mode = route.params.mode
  const [retu, setretu] = React.useState(mode)
  if (retu == "easy") {
    seteasy2()
  }
  if (retu == "medium") {
    setmedium2()
  }
  if (retu == "hard") {
    sethard2()
  }
  const [fifty, setfifty] = React.useState(styles.AnswerButtonBlue)
  const [hundred, sethundred] = React.useState(styles.AnswerButtonBlack)
  const [twohundred, settwohundred] = React.useState(styles.AnswerButtonBlue)
  const perweek = route.params.perweek
  const [retu2, setretu2] = React.useState(perweek)
  if (retu2 == "fifty") {
    setfifty2()
  }
  if (retu2 == "hundred") {
    sethundred2()
  }
  if (retu2 == "twohundred") {
    settwohundred2()
  }
  return (
    <View >
      <View style={styles.head}>
        <Text style={styles.settings}>Settings</Text>
        <IconBack name="arrow-left" size={55} onPress={() => navigation.navigate('Home', { mode: retu, perweek: retu2 })} style={styles.back}/>
      </View>

      <Text style={styles.subHeads}>In App Difficulty</Text>
      
      <TouchableOpacity style={easy} onPress={() => { answer(1) }}>
        <Text style={styles.AnswerText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={medium} onPress={() => { answer(2) }}>
        <Text style={styles.AnswerText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity style={hard} onPress={() => { answer(3) }}>
        <Text style={styles.AnswerText}>Hard</Text>
      </TouchableOpacity>

      <Text style={styles.subHeads}>Connect</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Image  source={require('../assets/images/fb-login.png')} style={{marginLeft:2, marginTop:10, height:50, width:280, borderRadius:1}}/>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Image  source={require('../assets/images/g-login.png')} style={{height:50, width:283, marginVertical:10}}/>
      </TouchableOpacity>

      <Text style={styles.subHeads}>Weekly Goal</Text>

      <View style={styles.goalMenu}>
        <MultiSwitch g1={() => answer2(1) } g2={() => answer2(2) } g3={() => answer2(3) }/>
      </View>

      {/* <TouchableOpacity style={fifty} onPress={() => { answer2(1) }}>
        <Text style={styles.AnswerText}>50</Text>
      </TouchableOpacity>
      <TouchableOpacity style={hundred} onPress={() => { answer2(2) }}>
        <Text style={styles.AnswerText}>100</Text>
      </TouchableOpacity>
      <TouchableOpacity style={twohundred} onPress={() => { answer2(3) }}>
        <Text style={styles.AnswerText}>200</Text>
      </TouchableOpacity> */}
    </View>
  )
}
SettingsScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  page: {
    flexDirection:'column'
  },
  AnswerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  // back: {
  //   alignSelf:'flex-end',
  //   paddingTop: 50,
  //   paddingRight: 20,
  //   color: 'black',
  //   left: 10,
  // },
  pick: {
    paddingTop: 100,
    paddingBottom: 50,
    width: 400
  },
  result: {
    paddingTop: 100,
    fontWeight: 'bold',
    fontSize: 40,
    backgroundColor: 'white',

  },
  AnswerButtonBlue: {
    width: 250,
    height: 55,
    backgroundColor: '#4455BB',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 30,
  },
  AnswerButtonBlack: {
    width: 250,
    height: 55,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 30,
  },
  settings: { 
    fontFamily: 'ReemKufi-Regular', 
    fontSize: 48, 
    fontWeight: '700',
    paddingLeft: 15,
  },
  head: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    flexDirection: 'row'
  },
  subHeads: {
    justifyContent: 'flex-start',
    fontFamily: 'ReemKufi-Regular',
    fontSize: 28, 
    fontWeight: '700',
    paddingLeft: 18,
    marginTop: 15,
  },
  goalMenu: {
    //flex: 1,
    marginVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SettingsScreen
