import React, {useEffect,useState} from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

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
    borderRadius:20,
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center'
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
  
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    
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

const CocktailDetails = ({ route, navigation }) => {
    const { data } = route.params;
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(data);
    return (      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card containerStyle={styles.card}>            
            <Image style={{width:350, height:350, borderRadius:20}}  source={{uri:data?.strDrinkThumb}} />
            <Text style={{marginTop:10,fontSize:38,color:"white"}}>{data.strDrink}</Text>
            {data.ingredientes.length>0 && data.ingredientes.map((ingrediente) => {
              return(
                <Text style={{marginTop:10,fontSize:15,color:"white"}}>
                - {ingrediente}
                </Text>
              )
            })}        
            <Text style={{marginTop:10,marginBottom:10,fontSize:18,color:"white"}}>How to prepare: {data.strInstructions}</Text>
                   
            <Button title="Volver" style={{marginBottom:10}} onPress={() => navigation.navigate('Cocktail')} />            
            </Card>
            
        </View> 
    )
}

export default CocktailDetails;