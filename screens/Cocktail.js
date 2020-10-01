import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import ProgressCircle from 'react-native-progress-circle'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,  
    Button,
    StatusBar,
    Image,
    TextInput
  } from 'react-native';

import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import { exportCocktails } from '../redux/actions/cocktail';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';

  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    card:{
      backgroundColor:'rgba(56, 172, 236, 1)',
      borderWidth:0,
      borderRadius:20
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderRadius:20,
      borderColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
    },
    search:{
      backgroundColor: Colors.lighter    
    },
    drink:{
          fontSize:25,
          color:'#fff'
    },
    drinkDesc: {
      fontSize:15,
      color:'#fff'
    },
    image:{
      borderRadius:20,     
    },
    notes: {
          fontSize: 18,
          color:'#fff',
          textTransform:'capitalize',
          marginBottom: 10,
          marginLeft: 7
      },
    carga:{
      fontSize: 50,
      color:'#000000',
      textTransform:'capitalize'
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,    
    },
    sectionContainer: {
      marginTop: 12,
      paddingHorizontal: 24,
      marginBottom: 5
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
});



const Cocktail = ({ navigation }) => {  
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [cocktails, setCocktails] = useState([]);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState('');
    const {cocktails: result, max, actual} = useSelector( state => state.cocktail);
    
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

    const updateSearch = (e) =>{ 
        if (e) {
          const newData = cocktails.filter(
            function (item) {
              const itemData = item.strDrink
                ? item.strDrink.toUpperCase()
                : ''.toUpperCase();
              const textData = e.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });          
          setFilters(newData);
        } else {
          setFilters(cocktails);      
        }   
        setSearch(e);
    }

    useEffect(() => {
      dispatch(exportCocktails());      
    }, [dispatch]);   

    useEffect(() => {         
        if(result.length>0) {          
          setCocktails(result); 
          setFilters(result);
          setIsLoading(false);
        }
    }, [result]);

    if(isLoading){
      return (
        <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
            >
            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop: '50%'}}>            
            <ProgressCircle
                percent={(actual+1)*max/100}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 18 }}>{(actual+1)*max/100+'%'}</Text>
            </ProgressCircle>
            </View>
            </ScrollView>
      </SafeAreaView>
      );
    }

    return (
        <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
            >                                             
                <View style={styles.sectionContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(e) => updateSearch(e)}
                        value={search}
                        underlineColorAndroid="transparent"
                        placeholder="Buscar..."
                    />            
                </View>
                <View style={styles.sectionContainer}>
                {filters.length>0 && filters.map((section) => {
                    
                    const detalles = section.details[0][0];
                    const result = Object.keys(detalles).filter(word => word.indexOf("Ingredient") !== -1);                    
                    const array = [];
                    result.forEach(element => {                      
                      if(detalles[element] !== null){                                                                        
                        array.push(detalles[element]);
                      }
                    });

                    detalles["ingredientes"] = array;

                    return(                          
                        <Card containerStyle={styles.card} key={section.idDrink}>
                            <Text style={styles.drink}>{section.strDrink}</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginTop: 10}}>
                              <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                                
                                {array.length>2 ? (
                                  <>
                                  <Text style={styles.drinkDesc}>
                                    - {array[0]}
                                  </Text>
                                  <Text style={styles.drinkDesc}>
                                    - {array[1]}
                                  </Text>
                                  <Text style={styles.drinkDesc}>
                                    y {array.length-2} ingredientes más
                                  </Text>
                                  </>
                                ) : (
                                  <>
                                  <Text style={styles.drinkDesc}>
                                    - {array[0]}
                                  </Text>
                                  <Text style={styles.drinkDesc}>
                                    - {array[1]}
                                  </Text>                                  
                                  </>
                                )}  
                                
                              </View>
                              <View>
                                <Image style={{width:150, height:150, borderRadius:10}}  source={{uri:section.strDrinkThumb}} />
                              </View>
                            
                            </View>
                            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.notes}>Cocktail</Text>
                            <Button
                                title="Ver detalles"
                                onPress={() => navigation.navigate('CocktailDetails',{
                                    data: detalles                                    
                                })}
                            />
                            </View>
                        </Card>
                        
                    );
                })}
                </View>
            </ScrollView>
      </SafeAreaView>
    );  
}

export default Cocktail;