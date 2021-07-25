import React, {useEffect, useContext, useState} from 'react';
import { Text,Dimensions,View,SafeAreaView, Linking, FlatList,ImageBackground,TouchableOpacity ,Image, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width-30;
import {Context as AuthContext} from '../../context/AuthContext'
import api from '../../constants/api'
export default function ViewAllUsers ({navigation}) {
    const message = "May the last Ashrah becomes the source of mughfirah for all of us. Share this prayer with everyone you know so that we can maximize the impact. Little deeds go a long way. "
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
        fetch(`${api}/getalluserforagrnomist`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            setPlants(result);
        }).catch((err) => {
          console.log(err)
        })
    },[])


const Card = ({user})=> {
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SoilMessage",{user})} >
      <Image source={{uri:user.image}} style={{width:40, height:40 , borderRadius:80, backgroundColor:"red"}} />
      <View style={{marginLeft:10}}>
        <Text style={{color:"black"}}>Name: {user.username} </Text>
        <Text style={{color:"black"}}>Role: {user.role} </Text>
        <Text style={{color:"black"}}>Area: {user.area} </Text>
      </View>
     
    </TouchableOpacity>
   );
}
  return (
    <ImageBackground source={require('../../assets/Images/pdflowersetproject10-adj-38_2.jpg')} style={styles.container}> 
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Text style={{fontSize: 38, color: '#00B761', fontWeight: 'bold'}}>
           Plant For Properity
          </Text>
        </View>
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
              return <Card user={item} />;
            }}
          />
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
    justifyContent:"flex-start",
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