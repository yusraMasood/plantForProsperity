import React, {useEffect, useState} from 'react';
import { Text,Dimensions,View,SafeAreaView, FlatList,ImageBackground,TouchableOpacity ,Image, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width-30;
import api from '../../constants/api'
export default function ViewAllUsers ({navigation}) {
  const [plants, setPlants] = useState([])
  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      redirect: 'manual'
    };
      fetch(`${api}/getallusersforadmin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
         setPlants(result);  
  }).catch((err) => {
        console.log(err)
      })
  },[])

const deleteuser = (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers:myHeaders,
    body:JSON.stringify({
        id:id
    }),
    redirect: 'manual'
  };
 
  fetch(`${api}/deleteuser`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    let noJohn = plants.filter( el => el.id !== id ); 
    setPlants(noJohn);
  }).catch((err) => {
    console.log(err)
  })
}
const Card = ({user})=> {
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ViewUser",{user})} >
      <Image source={{uri:user.image}} style={{width:40, height:40 , borderRadius:80, backgroundColor:"red"}} />
      <View style={{marginLeft:10}}>
        <Text style={{color:"black"}}>Name: {user.username} </Text>
        <Text style={{color:"black"}}>Role: {user.role} </Text>
        <Text style={{color:"black"}}>Area: {user.area} </Text>
      </View>
      <View style={{marginLeft:10, flexDirection:"row",   width:120, justifyContent:"space-around"}} >
        <TouchableOpacity onPress={() => {navigation.navigate("UpdateUser", {item:user})}}  style={{backgroundColor:"gray", justifyContent:"center", alignItems:"center", borderRadius:50, width:50, height:50,}}>
            <Image style={{width:25, height:25}} source={require('../../assets//Images/user_refresh.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"gray", justifyContent:"center", alignItems:"center", borderRadius:50, width:50, height:50,}} onPress={() => deleteuser(user.id)}>
          <Image style={{width:25, height:25}}  source={require('../../assets//Images/remove-user-male.png')} />
        </TouchableOpacity>
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