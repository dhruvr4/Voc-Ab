import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '.././firebase/config'
import {normalize} from '../util'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [err, seterr] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                firebase.auth().currentUser.updateProfile({
                    displayName: fullName
                }).then(function () {
                    console.log("Updated");
                }, function (error) {
                    seterr(error)
                    console.log("Error happened");
                });
                const data = {
                    id: uid,
                    email,
                    fullName,
                    words_done: { easy: [], medium: [], hard: [] },
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
                        navigation.navigate('Home', { xp: -2 })
                    })
                    .catch((error) => {
                        alert(error)
                        console.log(error)
                    });
            })
            .catch((error) => {
                alert(error)
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', paddingTop: screenHeight * 0 }}
                keyboardShouldPersistTaps="always">
                
                <Text style={{fontSize: normalize(40), alignSelf: 'center', fontFamily: 'ReemKufi', paddingTop: '15%'}}>Welcome Onboard</Text>

                <View style={styles.FieldContainer}>
                    <TextInput
                        style={styles.Field}
                        placeholder='Full Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setFullName(text)}
                        value={fullName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /></View>


                <View style={styles.FieldContainer}>

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


                        <TextInput
                            style={styles.Field}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Confirm Password'
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        /></View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onRegisterPress()}>
                        <Text style={styles.buttonTitle}>Create account</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                    </View>
            </KeyboardAwareScrollView>
                </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    Field: {
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        height: screenHeight / 15,
        borderRadius: 15,
        fontSize: normalize(23),
    },
    FieldContainer: {
        paddingTop: '9%',
        width: screenWidth - 40,
        alignSelf: 'center',
    },

    button: {
        width: screenWidth - 100,
        height: normalize(50),
        backgroundColor: '#0b5cd5',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: screenHeight / 10,
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
