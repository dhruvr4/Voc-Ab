import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Linking, Animated } from 'react-native';
import IconBack from 'react-native-vector-icons/EvilIcons';
import { Dimensions } from "react-native";
import { SocialIcon } from 'react-native-elements';
import AnimatedTab from '../components/AnimatedTab'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


function SettingsScreen({ navigation, route }) {
  const mode = route.params.mode
  const [retu, setretu] = React.useState(mode)
  
  return (
    <View style={styles.page}>
      <View style={styles.head}>
        <Text style={styles.settings}>Settings</Text>
        <IconBack name="arrow-left" size={55} onPress={() => navigation.navigate('Home', { mode: retu,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu,words_done:route.params.word_done})} style={styles.back} />
      </View>
      {/*Easy, Medium, Hard*/}
      <Text style={styles.subHeads}>In App Difficulty</Text>
      <AnimatedTab/>

      {/*Login Buttons*/}
      <Text style={styles.subHeads}>Connect</Text>
      <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Login', { mode: retu,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu,words_done:route.params.word_done})}>
        <Text style={styles.connectOptionsText}>Login to existing account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => navigation.navigate('Create', { mode: retu,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu,words_done:route.params.word_done})}>
        <Text style={styles.connectOptionsText}>Create New Account</Text>
      </TouchableOpacity>
      
      {/*Socials*/}
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
    paddingTop: 0
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
