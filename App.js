import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen.js';
import LearnIt from './screens/LearnIt.js';
import Challenge from './screens/Challenge.js';
import TimeTrial from './screens/TimeTrial.js';
import LearnItResult from './screens/LearnItResult.js';
import ChallengeResult from './screens/ChallengeResult.js';
import TimeTrialResult from './screens/TimeTrialResult.js';


import SettingsScreen from './screens/SettingsScreen.js';

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