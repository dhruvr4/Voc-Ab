import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';
import {Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function LearnIt({navigation,route}) {  
  class Question {
    question="";
    answers=[];
    correctanswer="";
    constructor( a, b, c) {
        this.question=a;
        for( i=0;i<4;i++) {
            this.answers[i] = b[i];
        }
        this.correctanswer=c;
    }
}
  const datab = {
    easy :[],
    medium:[],
    hard :[],
    default :[]
}
  function create_database() {
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","easy");
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","medium");
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","hard");
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","default");
  }
  add=( a,  b, c, type) => {
    toAdd = new Question(a,b,c);
    datab[type].push(toAdd)
}  
    function load(val) {
    create_database()
    const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    txt=ques.question
    cor =ques.correctanswer
    arr=ques.answers
    shuffle(arr)
    }

    function answer ( answer) {
      let ans= (options).indexOf(correct) === answer  
      navigation.navigate("LearnItResult",{answer : ans,correct:correct})
    }  
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    const result = JSON.stringify(route.params.answer)
    resul = result.substring(1,result.length-1)
    //console.log(resul)
    let txt=''
    let cor =''
    let arr=[]
    load(resul)
    const [ text, setText ] = React.useState(txt)
    const [ options, setOptions ] = React.useState (arr)
    const [ correct, setCorrect ] = React.useState(cor)
    //let time = setInterval(this.tick, 1000);
    return (
      <View style = {{ flex : 1, backgroundColor : '#F0FFF0'}}>
        <View style = {styles.QuestionContainer}> 
          <Text style = {styles.text}> {text}</Text>
        </View> 
  
        <View style = {{alignItems : 'center', justifyContent: 'center', backgroundColor : '#F0FFF0'}}> 
          <TouchableOpacity style = {styles.AnswerButtonBlack} onPress={() => {answer(0)}}>
            <Text style = {styles.AnswerText}>{options[0]}</Text>
          </TouchableOpacity>    
          <TouchableOpacity style = {styles.AnswerButtonBlue}  onPress={() => {answer(1)}}>
            <Text style = {styles.AnswerText}>{options[1]}</Text>
          </TouchableOpacity>   
          <TouchableOpacity style = {styles.AnswerButtonBlack} onPress={() => {answer(2)}}>
            <Text style = {styles.AnswerText}>{options[2]}</Text>
          </TouchableOpacity>   
          <TouchableOpacity style = {styles.AnswerButtonBlue} onPress={() => {answer(3)}}>
            <Text style = {styles.AnswerText}>{options[3]}</Text>
          </TouchableOpacity>
        </View>   
      </View>
      );
}
const styles = StyleSheet.create({
  timer:{
    paddingTop: screenHeight/10,
    fontWeight: 'bold',
    fontSize : 48,
    textAlign: "center"    
  },
  text:{
    fontWeight: 'bold',
    fontSize : 36,
    color : 'white'
  },
  QuestionContainer : {
    width : screenWidth - 40,
    height : 180,
    backgroundColor:'#696969',
    alignSelf : 'center',
    alignItems : 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop : 60,
  },
  AnswerText : {
    fontWeight : 'bold',
    fontSize : 24,
    color : 'white'
  },
  AnswerButtonBlack : {
    width : screenWidth - 40,
    height : 55,
    backgroundColor : 'black',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop : 45,
    borderRadius : 30,
  },
  AnswerButtonBlue : {
    width : screenWidth - 40,
    height : 55,
    backgroundColor : '#4455BB',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop : 45,
    borderRadius : 30,
  }
});
