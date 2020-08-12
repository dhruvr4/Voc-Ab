import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import IconBack from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function Login({ navigation, route }) {
    function login_existing() {
        let words_done = { "easy": [], "medium": [], "hard": [] }
        let ans = "hard"
        let lvl = 1
        let xp = 0
        let pu = 0
        

        var user = firebase.auth().currentUser;
        var db = firebase.firestore();
        try {
        var userInfoRef = db.collection("Users").doc(user);
        userInfoRef.onSnapshot((doc) => {
        
            words_done = doc.data().wordsDone;
            ans = doc.data().mode
            lvl = doc.data().level
            xp = doc.data().xp
            pu = doc.data().powerups
          }
          );
          navigation.navigate('Home', { mode: ans,lvl: lvl, xp: xp, pu: pu,words_done:words_done })
            
        }
        catch{
            alert("Account Doesnt Exist")
        }
    }
    var result = route.params.mode
    const lvl = route.params.lvl
    const xp=route.params.xp
    const pu = route.params.pu
    var txt2 = ''
    const [text2, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    return (
        <View>
        <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: result,lvl:lvl,xp:xp,pu:pu,words_done:route.params.words_done })} style={styles.home} />
            <Text style={styles.AnswerText}>Log back in</Text>
            <View>
                <View style={styles.FieldContainer}>
                    <TextInput
                        style={styles.Field}
                        placeholder="Type your Email"
                        onChangeText={text2 => setText2(text2)}
                        defaultValue={text2}
                    />
                </View>
                <View style={styles.FieldContainer}>
                    <TextInput
                        style={styles.Field}
                        placeholder="Type your Password"
                        onChangeText={text3 => setText3(text3)}
                        defaultValue={text3}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.sumbitButton} onPress={() => { login_existing() }}>
              <Text style={styles.EnterText}>Submit !</Text>
            </TouchableOpacity>  
        </View>
    )
}
Login.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    home : {
        paddingTop: screenHeight/15,
        paddingLeft: 10,
        color: 'black',
        left: 10,
      },
    AnswerText: {
        fontWeight: 'bold',
        fontSize: 42,
        paddingTop: screenHeight / 15,
        textAlign : 'center'
    },
    EnterText: {
        fontWeight: 'bold',
        fontSize: 34,
        color:'white',
        textAlign : 'center'
    },
    sumbitButton: {
        width: screenWidth - 100,
        height: screenHeight / 14,
        backgroundColor: '#0b5cd5',
        alignItems: 'center',
        alignSelf : 'center',
        justifyContent: 'center',
        marginTop: screenHeight / 10,
        borderRadius: 30,
    },
    Field : {
        textAlign : 'center', 
        backgroundColor : '#ebebeb', 
        height : screenHeight / 15,
        borderRadius : 20,
        fontSize : 18,
    },
    FieldContainer : {
        paddingTop : screenHeight / 12,
        width : screenWidth - 40,
        alignSelf : 'center',
    }
});

export default Login


