import React, { useState } from 'react'
import { Dimensions, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { firebase } from '.././firebase/config'
import { normalize } from '../util';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('Users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', { user, "xp": -1 })
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
        behavior= "position" 
        style={{ flex: 1, }} 
        keyboardVerticalOffset={-240}
      >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>

            

                <View style={styles.FieldContainer}>
                <Text style={{fontSize: normalize(40), alignSelf: 'center', fontFamily: 'ReemKufi', paddingVertical: '10%'}}>Welcome</Text>

                    <TextInput
                        style={styles.Field}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /></View>

                <View style={styles.FieldContainer}>

                    <TextInput
                        style={styles.Field}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /></View>
                <View style={styles.FieldContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        alignItems: 'center',
    },
    title: {

    },
    Field: {
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        height: screenHeight / 15,
        borderRadius: 15,
        fontSize: normalize(23),
    },
    FieldContainer: {
        paddingTop: '15%',
        width: screenWidth - 40,
        alignSelf: 'center',
    },

    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        height: screenHeight / 15,
        borderRadius: 15,
        fontSize: 18,
    },
    button: {
        width: screenWidth - 150,
        height: normalize(45),
        backgroundColor: '#0b5cd5',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        borderRadius: 15,

    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})