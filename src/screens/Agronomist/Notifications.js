import React, {useEffect, useContext, useState} from 'react';
import { Text,Dimensions,View,SafeAreaView, Linking, FlatList,ImageBackground,TouchableOpacity ,Image, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width-30;
import {Context as AuthContext} from '../../context/AuthContext'
import api from '../../constants/api'
export default function GrowerHome ({navigation}) {
  const message = "PRICE Organization"
  const [plants, setPlants] = useState([])
  const {state:{userdata}} = useContext(AuthContext);
  
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      redirect: 'manual',
      headers:myHeaders,
      body:JSON.stringify({
        area:`${userdata.area}`
      })
    };
      fetch(`${api}/getbarcode`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          setPlants(result);
      }).catch((err) => {
        console.log(err)
      })
  },[])


const Card = ({code})=> {
  
  return (
    <TouchableOpacity style={styles.card}>
      <View style={{marginLeft:10}}>
        <Text style={{color:"black"}}>Type: {code.type} </Text>
        <Text style={{color:"black"}}>Data: {code.data} </Text>
        <Text style={{color:"black"}}>Area: {code.area} </Text>
        <Text style={{color:"black"}}>UserId: {code.userid} </Text>
        <Text style={{color:"black"}}>Status: {code.status} </Text>
      </View>
    </TouchableOpacity>
   );
}
  return (
    <ImageBackground source={require('../../assets/Images/pdflowersetproject10-adj-38_2.jpg')} style={styles.container}> 
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Text style={{fontSize: 38, color: '#FF0000', fontWeight: 'bold'}}>
           Plant For Properity
          </Text>
        </View>
        {plants.length?
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 30,
              paddingBottom: 50,
            }}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            data={plants}
            renderItem={({item}) => {
              return <Card code={item} />;
            }}
          />:null}
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card:{
    alignItems:'center',
    justifyContent:"space-between",
    flexDirection:"row",
    width:width-10,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding:2,
    height:100,
   // backgroundColor:"red"
    backgroundColor: '#F1F1F1',
  }
});