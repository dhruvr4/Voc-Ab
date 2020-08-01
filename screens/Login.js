import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings,TextInput } from 'react-native';

function Login({ navigation, route }) {
    function login_existing() {
        navigation.navigate('Home', { mode: route.params.mode, perweek: route.params.perweek,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu})
    }
    var txt2=''
    const [text2, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    return (
        <View>
         <Text style = {styles.AnswerText}>Login to existing Account</Text>
         <TextInput
            paddingTop={10}
            style={{ height: 40 }}
            placeholder="Email"
            onChangeText={text2 => setText2(text2)}
            defaultValue={text2}
          />
                   <TextInput
            paddingTop={10}
            style={{ height: 40 }}
            placeholder="Password"
            onChangeText={text3 => setText3(text3)}
            defaultValue={text3}
          />
   <TouchableOpacity style={styles.AnswerButtonBlack} onPress={() => { login_existing() }}>
        <Text style={styles.LoginText}>Enter</Text>
      </TouchableOpacity>
      
        </View>
    )
}
Login.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    AnswerText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop:20
    },
    LoginText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop:20,
        color:'white'
    }
,
    pick: {
        paddingTop: 100,
        paddingBottom: 50,
        width: 400
    },
    result: {
        paddingTop: 100,
        fontWeight: 'bold',
        fontSize: 40,
        backgroundColor: 'white',

    },
    AnswerButtonBlue: {
        width: 250,
        height: 55,
        backgroundColor: '#4455BB',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 30,
    },
    AnswerButtonBlack: {
        width: 250,
        height: 55,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 30,
    },
    settings: {
        fontSize: 48,
        fontWeight: '700',
        paddingLeft: 15,
    },
    head: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        flexDirection: 'row'
    },
    subHeads: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        fontSize: 28,
        fontWeight: '700',
        paddingLeft: 18,
        marginVertical: 15,
    },
    goalMenu: {
        //flex: 1,
        marginVertical: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login


