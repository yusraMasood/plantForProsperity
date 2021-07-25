import React, {useEffect, useState} from 'react';
import { Text,Dimensions,View,SafeAreaView, FlatList,ImageBackground,TouchableOpacity ,Image, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width-30;
import api from '../../constants/api'
export default function GrowerHome ({navigation}) {
  const [plants, setPlants] = useState([])
  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      redirect: 'manual'
    };
      fetch(`${api}/getallpayments`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          setPlants(result);
      }).catch((err) => {
        console.log(err)
      })
  },[])

const Card = ({user})=> {
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ViewUser",{user})} >
      <View style={{marginLeft:10}}>
        <Text style={{color:"black"}}>Sender Name: {user.sendername} </Text>
        <Text style={{color:"black"}}>Sender Account Number: {user.senderaccountno} </Text>
        <Text style={{color:"black"}}>Reciever Name: {user.recievername} </Text>
        <Text style={{color:"black"}}>Reciever Account Number: {user.recieveraccountno} </Text>
        <Text style={{color:"black"}}>Amount : {user.amount} </Text>
      </View>
    </TouchableOpacity>
   );
}
  return (
    <ImageBackground source={require('../../assets/Images/pdflowersetproject10-adj-38_2.jpg')} style={styles.container}> 
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Text style={{fontSize: 38, color: '#FF0000', fontWeight: 'bold'}}>
          Payment History
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