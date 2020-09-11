import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import firebase from 'firebase'
import { normalize } from '../util';
import datab from './WordsDatabase';
import IconBack from 'react-native-vector-icons/EvilIcons';



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
                              var color2=doc.data().fullName==user.displayName?"#D3D3D3":"white"
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
            const renderItem = ({ item, index }) => (
                <View style={{flexDirection : 'row' ,flex : 1, paddingVertical: normalize(5), 
                marginTop : normalize(4), marginHorizontal: '4%', 
                }}>
                        <View style = {{flex : 0.6, alignItems : 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderTopRightRadius:8, borderBottomRightRadius:8, 
                        borderWidth: 1.3, borderColor: 'grey', marginRight : '1%', backgroundColor:item.color}}>
                          <Text style={styles.connectOptionsText}>{'#'+(index + 1)}</Text>
                        </View>
                        <View style = {{flex : 2.3, backgroundColor:item.color, borderRadius : 8, borderWidth: 1.3, borderColor: 'grey', paddingLeft : 3,
                        alignItems : 'center'}}>
                          <Text style={styles.connectOptionsText}>{item.name}</Text>
                        </View>
                        <View style = {{flex : 0.6, alignItems : 'center', borderRadius : 8, borderTopRightRadius:15, borderBottomRightRadius:15, borderWidth: 1.3, borderColor: 'grey', marginLeft : '1%', backgroundColor:item.color}}>
                          <Text style={styles.connectOptionsText}>{item.level}</Text>
                        </View>   
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
                                        <Text style={{ fontSize: 15, fontFamily : 'ReemKufi' }} >Unable to load... try something else</Text>
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
            <View style={styles.head}>
                <Text style={styles.heading}>Leaderboard</Text>
                <IconBack name="arrow-left" size={normalize(55)} onPress={() => navigation.navigate('Home', {mode: route.params.mode,lvl:route.params.lvl,xp:route.params.xp,pu:route.params.pu,words_done:route.params.words_done})} style={styles.back} />
            </View>
      <ScrollView>
      <View style={{flexDirection : 'row' ,flex : 1, padding: 3, 
      marginTop : normalize(10),marginLeft : normalize(10), marginRight : normalize(10),}}>
        <View style = {{flex : 0.5, alignItems : 'flex-start', borderRadius : 10, marginLeft : '2.5%',}}>
         <Text style={styles.titleText}>Rank</Text>
        </View>
        <View style = {{flex : 1.1, borderRadius : 10, alignItems : 'center'}}>
          <Text style={styles.titleText}>Name</Text>
        </View>
        <View style = {{flex : 0.4, alignItems : 'center', marginRight : '0.5%'}}>
          <Text style={styles.titleText}>Level</Text>
        </View>        
      </View>

<FirebaseInfo></FirebaseInfo>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  
  titleText : {
    color : 'black',
    fontFamily : 'ReemKufi',
    fontSize : normalize(30)
  },
  heading: {
    fontSize: normalize(48),
    paddingLeft: 15,
    fontFamily: 'ReemKufi',
},
head: {
  width: '95%',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: normalize(55),
  flexDirection: 'row'
},
  connectOptionsText:{
    color:'black',
    fontFamily : 'ReemKufi',
    fontSize : normalize(27),
  },
});