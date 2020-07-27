import React, { useState, useEffect } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Text, FlatList } from "react-native";
import IconBack from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from 'react-native-elements'

import GRE1 from './Data/GRE_list_1.json';
import GRE2 from './Data/GRE_list_2.json';
import GRE3 from './Data/GRE_list_3.json';
import GRE4 from './Data/GRE_list_4.json';
import GRE5 from './Data/GRE_list_5.json';
import SAT1 from './Data/SAT_list_1.json';
import SAT2 from './Data/SAT_list_2.json';
import SAT3 from './Data/SAT_list_3.json';
import SAT4 from './Data/SAT_list_4.json';
import SAT5 from './Data/SAT_list_5.json';

export default function Dictionary({navigation, route}) {
    
    const datab = [];
    function create_database() {
        for (var i = 0; i < Object.values(SAT1.Adjective).length; i++) {
            add(SAT1.Adjective[i], SAT1.Word[i]);
        }
        for (var i = 0; i < Object.values(SAT2.Adjective).length; i++) {
            add(SAT2.Adjective[i], SAT2.Word[i]);
        }
        
        for (var i = 0; i < Object.values(SAT3.Adjective).length; i++) {
            add(SAT3.Adjective[i], SAT3.Word[i]);
        }
        for (var i = 0; i < Object.values(SAT4.Adjective).length; i++) {
            add(SAT4.Adjective[i], SAT4.Word[i]);
        }
        for (var i = 0; i < Object.values(SAT5.Adjective).length; i++) {
            add(SAT5.Adjective[i], SAT5.Word[i]);
        }
        for (var i = 0; i < Object.values(GRE1.Adjective).length; i++) {
            add(GRE1.Adjective[i], GRE1.Word[i]);
        }
        for (var i = 0; i < Object.values(GRE2.Adjective).length; i++) {
            add(GRE2.Adjective[i], GRE2.Word[i]);
        }
        for (var i = 0; i < Object.values(GRE3.Adjective).length; i++) {
            add(GRE3.Adjective[i], GRE3.Word[i]);
        }
        for (var i = 0; i < Object.values(GRE4.Adjective).length; i++) {
            add(GRE4.Adjective[i], GRE4.Word[i]);
        }
        for (var i = 0; i < Object.values(GRE5.Adjective).length; i++) {
            add(GRE5.Adjective[i], GRE5.Word[i]);
        }
    }
    
    function add(a, w) {
    datab.push(
        {
            word:w,
            adj:a
        })
    }
    
    const addKeys = (val, key) => ({key: key, ...val}); // fn to add keys to the database
    
    load = () => {
        console.log("Load function started")
        create_database();
        datab.map((val, key) => ({id: key, ...val})) // keys added
        datab.sort((a,b) => a.word>b.word); //sorted data base alphabetically
        console.log("Yooo, data ready");
    }

    const [search, setSearch] = useState('');
    const [displayedList, setDisplayedList] = useState([]);
    const [memory, setMemory] = useState([])
    

    const updateSearch = (event) => {
        const filteredList = memory.filter(
            (item) => {
                let word = item.word.toLowerCase();
                let lowerSearch = event.toLowerCase();
                return word.indexOf(lowerSearch) > -1;
            }
        )
        setSearch(event);
        setDisplayedList(filteredList);
    }

    //load db once at first render
    useEffect(() => {
        load();
        console.log("New Render Cycle");
        setDisplayedList(datab);
        setMemory(datab)
        
    }, [])

    renderItem = ({item}) => (
    <View style={{minHeight:70, padding:3, borderBottomWidth:1, borderBottomColor:'grey',}}>
        <Text style={{fontSize:20, paddingLeft:3, marginBottom:4, fontWeight:'bold'}}>{item.word}</Text>
        <Text style={{paddingLeft:3}}>{item.adj}</Text>
    </View>
    );

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#fff',
          }}>

            <View style={styles.head}>
                <Text style={styles.heading}>Dictionary</Text>
                <IconBack name="arrow-left" size={55} onPress={() => navigation.navigate('Home', route)} style={styles.back} />
            </View>
            <SearchBar 
            placeholder="Look up a word..." 
            onChangeText={(value) => updateSearch(value)} 
            value={search.toString()} 
            lightTheme={true} 
            round={true} 
            containerStyle={{backgroundColor:'white', borderTopWidth:0}}
            inputContainerStyle={{backgroundColor:'#EBEBEB', height: 40, width: '97%', marginLeft:'1%',}}/>
            <View style={{flex:1}}>
                <FlatList
                    data={displayedList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={()=> (
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginVertical:30}}>
                            <Text style={{fontSize:15}} >Word Unavailable</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginVertical: 10,
        justifyContent: 'center'
    },
    
    head: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        flexDirection: 'row'
    },

    inputBox: {
        borderRadius: 10,
        borderWidth:1,
    },

    heading: {
        fontSize: 48,
        fontWeight: '700',
        paddingLeft: 15,
    },
})
