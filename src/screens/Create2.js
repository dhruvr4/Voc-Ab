import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';

import IconBack from 'react-native-vector-icons/AntDesign';

import { firebase } from './../firebase/config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { normalize } from '../util';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function Login({ navigation, route }) {
    function login_new() {

        if (text3 !== text4) {
            alert("Passwords don't match.")
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(text2, text3)
            .then((response) => {
                const uid = response.user.uid
                firebase.auth().currentUser.updateProfile({
                    displayName: text
                }).then(function () {
                    console.log("Updated");
                }, function (error) {
                    console.log("Error happened");
                });
                const data = {
                    name: text,
                    email: text2,
                    words_done: [],
                    level: 1,
                    xp: 0,
                    powerups: 0,
                    mode: "medium"
                };

                const usersRef = firebase.firestore().collection('Users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', { mode: result, lvl: route.params.lvl, xp: route.params.xp, pu: route.params.pu, words_done: route.params.words_done })
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }
    var result = route.params.mode
    const lvl = route.params.lvl
    const xp = route.params.xp
    const pu = route.params.pu
    var txt2 = ''
    const [text, settext] = React.useState(txt2)
    const [text2, settext2] = React.useState(txt2)
    const [text3, settext3] = React.useState(txt2)
    const [text4, settext4] = React.useState(txt2)
    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: result, lvl: lvl, xp: xp, pu: pu, words_done: route.params.words_done })} style={styles.home} />


                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => settext(text)}
                    value={text}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => settext2(text)}
                    value={text2}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => settext3(text)}
                    value={text3}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => settext4(text)}
                    value={text4}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => login_new()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
    )
}
Login.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    home: {
        paddingTop: screenHeight / 15,
        paddingLeft: 10,
        color: 'black',
        left: 10,
    },
    AnswerText: {
        fontWeight: 'bold',
        fontSize: normalize(42),
        paddingTop: screenHeight / 15,
        textAlign: 'center'
    },
    input: {
        fontWeight: 'bold',
        fontSize: normalize(34),
        color: 'white',
        textAlign: 'center'
    },
    button: {
        width: screenWidth - 100,
        height: screenHeight / 14,
        backgroundColor: '#0b5cd5',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: screenHeight / 10,
        borderRadius: 30,
    },
    Field: {
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        height: screenHeight / 15,
        borderRadius: 20,
        fontSize: normalize(18),
    },
    FieldContainer: {
        paddingTop: screenHeight / 12,
        width: screenWidth - 40,
        alignSelf: 'center',
    }
});

export default Login


