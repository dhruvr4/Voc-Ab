import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen.js';
import LearnIt from './src/screens/LearnIt.js';
import Challenge from './src/screens/Challenge.js';
import TimeTrial from './src/screens/TimeTrial.js';
import LearnItResult from './src/screens/LearnItResult.js';
import ChallengeResult from './src/screens/ChallengeResult.js';
import TimeTrialResult from './src/screens/TimeTrialResult.js';
import Login from './src/screens/Login.js';
import Create from './src/screens/Create.js';

import SettingsScreen from './src/screens/SettingsScreen.js';
import Dictionary from './src/screens/Dictionary'

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

const Stack = createStackNavigator();
function App (){
  return (
  <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="LearnIt" component={LearnIt} />
        <Stack.Screen name="Challenge" component={Challenge} />
        <Stack.Screen name="TimeTrial" component={TimeTrial} />
        <Stack.Screen name="LearnItResult" component={LearnItResult} />
        <Stack.Screen name="ChallengeResult" component={ChallengeResult} />
        <Stack.Screen name="TimeTrialResult" component={TimeTrialResult} />
        <Stack.Screen name="Setting" component={SettingsScreen} /> 
        <Stack.Screen name="Dictionary" component={Dictionary} /> 
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Create" component={Create} /> 


        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App