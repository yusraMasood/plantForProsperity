import React,{useEffect, useContext, useState} from 'react';
import { Text,Dimensions,View,SafeAreaView, Linking, FlatList,TouchableOpacity ,Image, StyleSheet} from 'react-native';
import api from '../../constants/api';
import {Context as AuthContext} from '../../context/AuthContext'
const width = Dimensions.get('window').width-30;
function HomeScreen({ navigation }) {
const {state:{userdata}} = useContext(AuthContext);
const [data, setData] = useState([]);
  
  useEffect(() =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers:myHeaders,
        body:JSON.stringify({
          id:userdata.id
        }),
        redirect: 'manual'
      };
 
    fetch(`${api}/getpackages`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setData(result)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  const Card = ({code})=> {
  
    return (
      <SafeAreaView style={styles.card}>
        <View style={{marginLeft:10}}>
          <Text style={{color:"black"}}>Name: {code.name} </Text>
          <Text style={{color:"black"}}>Duration: {code.duration} </Text>
          <Text style={{color:"black"}}>Quantity: {code.quantity} </Text>
          <Text style={{color:"black"}}>Price: {code.price} </Text>
          <TouchableOpacity style={{color:"black"}} onPress={() => Linking.openURL(`${code.pdfpath}`)}>
          <Text>Click Here</Text>
    </TouchableOpacity>
        </View>
      </SafeAreaView>
     );
  }
  return (
    <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
     {data.length?
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 30,
              paddingBottom: 50,
            }}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item}) => {
              return <Card code={item} />;
            }}
          />:null}
    </View>
  );
}

export default HomeScreen
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
    height:130,
   // backgroundColor:"red"
    backgroundColor: 'gray',
  }
});