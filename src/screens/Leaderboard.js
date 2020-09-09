import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons';
import firebase from 'firebase'
import { normalize } from '../util';
import datab from './WordsDatabase';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Leaderboard({ route, navigation }) {
    let unsubscribe
    class FirebaseInfo extends React.Component {
        state = { groupIDs: [],loading :true};
        componentDidMount() {
            var user = firebase.auth().currentUser;
            var db = firebase.firestore();
               var groupsRef = db.collection("Users");
                unsubscribe = groupsRef
                    .onSnapshot(function namae(querySnapshot) {
                        var cities = [];
                        querySnapshot.forEach(function (doc) {
                                
                                var color2=doc.data().fullName==user.displayName?"#90ee90":"#add8e6"
                                cities.push({ name: doc.data().fullName, level: doc.data().level,color:color2});
                        });
                        cities.sort((a, b) => (a.level < b.level) ? 1 : -1)
                        //console.log(cities)
                         this.setState({ groupIDs: cities,loading:false});
                    }.bind(this));
        }
        componentWillMount() {
            return unsubscribe;
        }
        render() {
            const renderItem = ({ item }) => (
                <View style={{ minHeight: 70, padding: 3, borderBottomWidth: 1, borderBottomColor: 'grey',backgroundColor:item.color}}>
                        <Text style={styles.connectOptionsText}>{item.name}</Text>
                        <Text style={styles.connectOptionsText}>{item.level}</Text>
                   </View>
            );
            return (
                <View>
                    {
                        this.state.loading ? (
                            <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" />
                            </View>
                        ) : null
                    }
                    <FlatList
                        data={this.state.groupIDs}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                                {
                                    this.state.loading ? null : (
                                        <Text style={{ fontSize: 15 }} >No such Group found... try something else</Text>
                                    )
                                }
                            </View>
                        )}
                    />
                </View>);
        }
    }
    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>         
      <ScrollView>
      <IconBack name="home" size={normalize(35)} onPress={() => navigation.navigate('Home', { mode: route.params.mode, lvl: route.params.lvl, xp: route.params.xp, pu: route.params.pu, words_done: route.params.words_done })} style={styles.home} />

<FirebaseInfo></FirebaseInfo>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    paddingTop: screenHeight / 25,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  connectOptionsText:{
    color:'green'
  },
  result: {
    paddingTop: screenHeight / 35,
    fontSize: normalize(40),
    fontWeight: '300',
    alignSelf: 'center',
    fontFamily: 'ReemKufi',
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
    fontFamily: 'ReemKufi',
    fontSize: normalize(32),
    alignSelf: 'center',
    paddingTop: '3%',
    color: 'white'
  },
  DefinitionText: {
    fontFamily: 'ReemKufi',
    fontSize: normalize(24),
    paddingHorizontal: '7%',
    paddingTop: '4%',
    alignSelf: 'center',
    color: 'white'
  },
});
