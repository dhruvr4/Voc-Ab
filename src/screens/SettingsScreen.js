import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking, Animated, Switch } from 'react-native';
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SocialIcon } from 'react-native-elements';
import firebase from 'firebase'
import { normalize } from '../util';
import Notifications from 'expo-notifications';
import Permissions from 'expo-permissions';

function SettingsScreen({ navigation, route }) {
function navigat(a,b){
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  var signed_in = false
  try {
    var userInfoRef = db.collection("Users").doc(user.uid);
    signed_in = true
  }
  catch{}
  try {
    if (signed_in) {
      userInfoRef.update({
    "mode":retu,
  })
}
  }
  catch{}


navigation.navigate(a,b)
}
function logout() {
  firebase.auth().signOut().then(function () {
      console.log('Signed Out');
  }, function (error) {
      console.error('Sign Out Error', error);
  });
  navigation.navigate('Login')
}

askPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  return true;
};

function load(val) {
  const today = new Date().getFullYear() * 365 + new Date().getMonth() * 31 + new Date().getDate()
  var num = Math.abs((today) % datab['default'].length)
  const ques = datab['default'][num]
  txt = ques.question
  cor = ques.correctanswer
}
  
  var mode = route.params.mode
  const [retu, setretu] = React.useState(mode)
  handleSlide = type => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true
    }).start();
  };
  

  const [active, setactive] = React.useState(10)
  const [xeasy, setxeasy] = React.useState(0)
  const [xmedium, setxmedium] = React.useState(0)
  const [xhard, setxhard] = React.useState(0)
  const [translateX] = React.useState(new Animated.Value(0))
  if (active == 10) {
    if (mode == "easy") {
      setactive(0)
      handleSlide(0)
    }
    if (mode == "medium") {
      setactive(1)
      handleSlide(123.80952453613281)
    }
    if (mode == "hard") {
      setactive(2)
      handleSlide(246.4761962890625)
    }
  }
  //console.log(active)

  const [isSwitchEnabled, setSwitch] = React.useState(false)
  if(isSwitchEnabled) {
    this.askPermissions()
  }
  else {
    Notifications.dismissAllNotificationsAsync()
  }
  
  scheduleNotification = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "Hey a new word",
        body: txt
      },
      {
        repeat: "minute",
        time: new Date().getTime() + 10000
      }
    );
    console.log(notificationId);
  };

  return (
    <View style={styles.page}>
      <View style={styles.head}>
        <Text style={styles.heading}>Settings</Text>
        <IconBack name="arrow-left" size={normalize(55)} onPress={() => navigat('Home', { mode: retu, lvl: route.params.lvl, xp: route.params.xp, pu: route.params.pu, words_done: route.params.words_done })} style={styles.back} />
      </View>
      {/*Easy, Medium, Hard*/}
      <Text style={styles.subHeads}>In App Difficulty</Text>
      <View>
        <View style={{ flex: 1 }}>
          <View style={{
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          >
            <View style={{
              flexDirection: 'row',
              marginTop: 10,
              height: 50,
              borderRadius: 4,
              backgroundColor: '#EBEBEB',
              position: 'relative'
            }}
            >
              <Animated.View style={{
                position: 'absolute',
                width: '33.33%',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: 4,
                transform: [{
                  translateX
                }]
              }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 4,
                  borderRightWidth: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
                onLayout={event => setxeasy(event.nativeEvent.layout.x)}
                onPress={() => {
                  setactive(0)
                 // console.log(xeasy)
                  handleSlide(xeasy)
                  setretu("easy")
                }}
              >
                <Text style={{ color: active === 0 ? '#0099FF' : '#C2C2C2', fontSize: normalize(23), fontFamily:'ReemKufi' }}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 4,
                  borderRightWidth: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }}
                onLayout={event => setxmedium(event.nativeEvent.layout.x)}
                onPress={() => {
                  setactive(1)
                //  console.log(xmedium)
               setretu("medium")
                  handleSlide(xmedium)
                }}
              >
                <Text style={{ color: active === 1 ? '#0099FF' : '#C2C2C2', fontSize: normalize(23), fontFamily:'ReemKufi' }}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 4,
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }}
                onLayout={event => setxhard(event.nativeEvent.layout.x)}
                onPress={() => {
                  setactive(2)
                 // console.log(xhard)
                  handleSlide(xhard)
                  setretu("hard")
                }}
              >
                <Text style={{ color: active === 2 ? '#0099FF' : '#C2C2C2', fontSize: normalize(23), fontFamily:'ReemKufi' }}>Hard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.subHeads2}>Reminders</Text>
        <View style={{flexDirection: 'row', flex:1, marginHorizontal: '2%'}}>
        <View style={{flex:1, marginLeft: '2%'}}>
            <Text style={styles.text}>In-App Notifications</Text>
        </View>
        <View style={{flex:1}}>
            <Switch
                value={isSwitchEnabled}
                onValueChange={(value) => setSwitch(value)}
            />
        </View>
        </View>
        
      </View>

      {/*Login Buttons*/}
      <Text style={styles.subHeads2}>Connect</Text>
      <TouchableOpacity style={styles.connectOptions} activeOpacity={0.8} onPress={() => logout()}>
        <Text style={styles.connectOptionsText}>Log Out</Text>
      </TouchableOpacity>

      {/*Socials*/}
      <Text style={styles.subHeads}>Connect with Us</Text>
      <View style={{flexDirection: 'row', flex:1, marginHorizontal: '5%'}}>
        <View style={{flex:1, marginLeft: '9%'}}>
          <SocialIcon
            type="facebook"
            onPress={() => Linking.openURL('https://www.facebook.com/Voc-AB-104139488054172')}
          />
        </View>
        <View style={{flex:1}}>
          <SocialIcon
            type="instagram"
            onPress={() => Linking.openURL('https://www.instagram.com/vocabulary.app')
            }
          />
        </View>
        <View style={{flex:1}}>
          <SocialIcon
            type="linkedin"
            onPress={() => {
              Linking.openURL('https://www.linkedin.com/company/voc-ab')
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
  connectOptions: {
    marginTop: '2%',
    alignContent: "center",
    padding: normalize(15),
    marginHorizontal: '15%',
    backgroundColor: '#0099FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  text: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    fontSize: normalize(23),
    paddingLeft: 20,
    fontFamily: 'ReemKufi',
  },
  connectOptionsText: {
    fontSize: normalize(24),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily:'ReemKufi'
  },
  heading: {
    fontSize: normalize(48),
    paddingLeft: 15,
    fontFamily: 'ReemKufi',
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
    fontSize: normalize(33),
    paddingLeft: 18,
    marginVertical: '4%',
    paddingTop: 10,
    fontFamily: 'ReemKufi'
  },
  subHeads2: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    fontSize: normalize(33),
    paddingLeft: 18,
    marginVertical: '4%',
    marginTop: '22%',
    fontFamily: 'ReemKufi'
  },
  goalMenu: {
    marginVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SettingsScreen
