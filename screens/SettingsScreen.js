import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Linking } from 'react-native';
import IconBack from 'react-native-vector-icons/EvilIcons';
import { Dimensions } from "react-native";
import { SocialIcon } from 'react-native-elements';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


function SettingsScreen({ navigation, route }) {
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
    <View style={styles.page}>
      <View style={styles.head}>
        <Text style={styles.settings}>Settings</Text>
        <IconBack name="arrow-left" size={55} onPress={() => navigation.navigate('Home', { mode: retu, perweek: retu2,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu})} style={styles.back} />
      </View>
      <Text style={styles.subHeads}>In App Difficulty</Text>

      

      <Text style={styles.subHeads}>Connect</Text>
      <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Login', { mode: retu, perweek: retu2,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu})}>
        <Text style={styles.connectOptionsText}>Login to existing account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Create', { mode: retu, perweek: retu2,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu})}>
        <Text style={styles.connectOptionsText}>Create New Account</Text>
      </TouchableOpacity>
      <Text style={styles.subHeads}>Connect with Us</Text>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flexDirection: 'column', paddingLeft: 60}}>
          <SocialIcon 
            type="facebook"
            onPress={() => Linking.openURL('https://www.facebook.com/Voc-AB-104139488054172')}
            />
        </View>
        <View style={{ flexDirection: 'column',paddingLeft: 45 }}>
          <SocialIcon
            type="instagram"
            onPress={() => Linking.openURL('https://www.instagram.com/vocabulary.app')
            }
          />
        </View>
        <View style={{ flexDirection: 'column', paddingLeft: 45 }}>
          <SocialIcon
            type="linkedin"
            onPress={() => {
              Linking.openURL('https://www.linkedin.com/company/68693070')
            }}
          />
        </View>    
      </View>  
    </View>
  )
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  AnswerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },

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
  connectOptions: {
    marginTop:10,
    alignContent: "center",
    padding:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#0099FF',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  connectOptionsText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  settings: {
    fontSize: 56,
    fontWeight: '700',
    paddingLeft: 15,
  },
  head: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    flexDirection: 'row',
    fontFamily: 'Reem-Kufi'
  },
  subHeads: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    fontSize: 33,
    fontWeight: '700',
    paddingLeft: 18,
    marginVertical: 15,
    paddingTop: 20
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
