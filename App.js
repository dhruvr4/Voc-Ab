import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react'
import { decode, encode } from 'base-64'
import { YellowBox } from 'react-native';
import _ from 'lodash';
import * as SQLite from 'expo-sqlite';
import firebase from 'firebase'
import HomeScreen from './src/screens/HomeScreen.js';
import LearnIt from './src/screens/LearnIt.js';
import Challenge from './src/screens/Challenge.js';
import TimeTrial from './src/screens/TimeTrial.js';
import LearnItResult from './src/screens/LearnItResult.js';
import ChallengeResult from './src/screens/ChallengeResult.js';
import TimeTrialResult from './src/screens/TimeTrialResult.js';
import Login from './src/screens/LoginScreen.js';
import Create from './src/screens/RegistrationScreen.js';
import tutorial from './src/screens/tutorial.js';
import Leaderboard from './src/screens/Leaderboard.js';
import PushNotification from "react-native-push-notification";

import SettingsScreen from './src/screens/SettingsScreen.js';
import Dictionary from './src/screens/Dictionary'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

let customFonts = {
  'ReemKufi': require('./assets/fonts/ReemKufi-Regular.ttf'),
  'SansForge': require('./assets/fonts/SansForgetica-Regular.otf'),

};


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
}
(window).Expo = Object.freeze({ ...(window).Expo, SQLite });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      fontsLoaded: false,
    };
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  testPush = () => {
    PushNotification.localNotification({
      ticker: "My Notification Ticker", // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
      shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      channelId: "your-custom-channel-id", // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      alertAction: "view", // (optional) default: view
      category: "", // (optional) default: empty string

      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    console.log("fonts loaded");
    this.setState({ fontsLoaded: true });
  }
  
  componentDidMount() {
    //loadFonts
    this._loadFontsAsync();

    //https://gist.github.com/zwily/e9e97e0f9f523a72c24c7df01d889482
    window.openDatabase = SQLite.openDatabase;

    // Hack 2: indexeddbshim will try to examine navigator.userAgent
    // if navigator exists. In React Native, it does, but has no
    // userAgent set. Set one here to avoid a crash.
    navigator.userAgent = "React-Native";

    // Hack 3: Initialize indexeddbshim with origin checks disabled,
    // cause they'll fail on our platform (and don't quite make sense.)
    // (Do not change this to an import, cause that will get hoisted above
    // our userAgent hack above.)
    const setGlobalVars = require("./node_modules/indexeddbshim/dist/indexeddbshim-noninvasive");
    setGlobalVars(window, { checkOrigin: false });

    // Hack 4: Firestore persistence really wants to use localStorage
    // to communicate between tabs. We don't really care about
    // communicating between tabs - everything will be in the same
    // process. However, Firestore needs something. So we'll give it
    // a really weak, fake, in-memory localStorage. (Persisted storage
    // will go through IndexedDB and into SQLite, on disk.)
    window.__localStorageStore = {};
    window.localStorage = {
      getItem: function (key) {
        return window.__localStorageStore[key];
      },
      setItem: function (key, value) {
        window.__localStorageStore[key] = value;
      },
      removeItem: function (key) {
        delete window.__localStorageStore[key];
      },
      clear: function () {
        window.__localStorageStore = {};
      },
      key: function (i) {
        // Ever since ES6, the order of keys returned here is
        // stable 🤞
        Object.keys(window.__localStorageStore)[i];
      }
    };
    firebase.firestore().enablePersistence()
      .catch(function (err) {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
        console.log(this.state.authenticated);
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }
  render() {
    if (this.state.loading || !this.state.fontsLoaded) return <AppLoading />;
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {this.state.authenticated ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="LearnIt" component={LearnIt} />
              <Stack.Screen name="Challenge" component={Challenge} />
              <Stack.Screen name="TimeTrial" component={TimeTrial} />
              <Stack.Screen name="LearnItResult" component={LearnItResult} />
              <Stack.Screen name="ChallengeResult" component={ChallengeResult} />
              <Stack.Screen name="TimeTrialResult" component={TimeTrialResult} />
              <Stack.Screen name="Setting" component={SettingsScreen} />
              <Stack.Screen name="Dictionary" component={Dictionary} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Create} />
              <Stack.Screen name="Tutorial" component={tutorial} />
              <Stack.Screen name="Leaderboard" component={Leaderboard} />

            </>
          ) : (
              <>
                <Stack.Screen name="Registration" component={Create} />

                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LearnIt" component={LearnIt} />
                <Stack.Screen name="Challenge" component={Challenge} />
                <Stack.Screen name="TimeTrial" component={TimeTrial} />
                <Stack.Screen name="LearnItResult" component={LearnItResult} />
                <Stack.Screen name="ChallengeResult" component={ChallengeResult} />
                <Stack.Screen name="TimeTrialResult" component={TimeTrialResult} />
                <Stack.Screen name="Setting" component={SettingsScreen} />
                <Stack.Screen name="Dictionary" component={Dictionary} />
                <Stack.Screen name="Tutorial" component={tutorial} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />


              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App


/*

*/
