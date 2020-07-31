import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function TimeTrialResult({ route, navigation }) {
  let answer = "Time Up"
  const result = "You got " + JSON.stringify(route.params.answer) + " correct"
  const correct = route.params.correct
  const mod = route.params.mode
  const per = route.params.perwee
  const lvl = route.params.lvl
  var xp=route.params.xp
  const pu = route.params.pu
  
  var corr = ""
  for (var i = 0; i < correct.length; i++) {
    const ab = correct[i][2]? "Correct":"Wrong"
    if(ab == "Correct") {
      if (mod == "easy") {
        xp = xp+20
      }
      if (mod == "medium") {
        xp = xp+30
      }
      if (mod == "hard") {
        xp = xp+50
      }
    }
    corr = corr + "For the definition " + correct[i][0] + "You chose " + correct[i][1] + "Correct Answer was " + correct[i][2] + "You were " + ab
  }

  const r = []
  for(var f = 0; f < correct.length; f++)
  {
      const a = (correct[f][1] === correct[f][2])? "#5cb908":"#ff5252"
      r.push({
        ans: correct[f][0], 
        def: correct[f][2],
        color: a
      })
  }

  const Item = ({def, correctAns, color}) => (
    <View style={{
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      marginTop: screenHeight / 20,
      backgroundColor: 'white', 
      width: screenWidth - 40, 
      height : screenHeight/4, 
      alignSelf : 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
      backgroundColor : color,
      borderRadius : 20,
    }}>
      <Text style={styles.WordText}>{def}</Text>
      <Text style={styles.DefinitionText}>{correctAns}</Text>
    </View>
  );  

  const renderItem = ({item}) => (
    <Item def={item.def} correctAns = {item.ans} color = {item.color}/>
  );
  const pushAction2 = StackActions.push('TimeTrial', { answer: mod,perweek:per,lvl:lvl,xp:xp,pu:pu});
  return (
    <View style = {{flex : 1, backgroundColor : 'white'}}>
      <ScrollView>
        <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: mod, perweek: per,lvl:lvl,xp:xp,pu:pu })} style={styles.home} />
        <Text style={styles.result}> {result}</Text>
        <FlatList
          data = {r}
          renderItem = {renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <IconForward name = "control-forward" size={50} onPress={() => navigation.dispatch(pushAction2)} style = {{alignSelf : 'center',paddingTop : screenHeight / 20, marginBottom : screenHeight / 20}}/>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    paddingTop: screenHeight / 15,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  result: {
    paddingTop : screenHeight / 35,
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf : 'center'
  },
  correct: {
    paddingTop: 40,
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  WordText: {
    fontWeight: '700',
    fontSize : 32,
    alignSelf : 'center',
    paddingTop : screenHeight / 60,
    color : 'white'
  },
  DefinitionText : {
    fontWeight : '300',
    fontSize : 24,
    paddingLeft : screenWidth / 10,
    paddingRight : screenWidth / 10,
    paddingTop : screenHeight / 20,
    alignSelf : 'center',
    color : 'white'
  },
});
