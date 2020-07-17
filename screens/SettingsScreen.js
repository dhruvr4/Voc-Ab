import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { MonoText } from '../components/StyledText';

 function SettingsScreen({navigation}) {
  function navigat(ans) {
      navigation.navigate("LearnIt",{answer :ans})
  }
  var mode = 'default'
  return (
    <View>
      <Text styles = {styles.result}>Mode</Text>
      <DropDownPicker
        items={[
            {label: 'Easy',value : 'easy'},
            {label: 'Medium',value : 'medium'},
            {label: 'Hard',value : 'hard'},
            {label: 'Random',value : 'default'},
        ]}
        defaultValue={'default'}
        style={styles.pick}
        onChangeItem={a=>
          mode = a.value
        }
        />
    <Button title="LearnIt" onPress={() => navigat(mode)} />
    </View>
    )
}
  


SettingsScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  pick:{
    paddingTop:100,
    paddingBottom:50,
    width:400
  },
    result:{
    paddingTop: 100,
    fontWeight: 'bold',
    fontSize :40,
    backgroundColor: 'white',
  
},});
export default SettingsScreen
