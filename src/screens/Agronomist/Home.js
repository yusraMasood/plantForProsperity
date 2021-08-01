import React from 'react';
import { Text,Dimensions,View,SafeAreaView, FlatList,ImageBackground,TouchableOpacity ,Image, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width / 2.5 - 30;
export default function GrowerHome ({navigation}) {
  const plants = [
    
    {
      id: 2,
      name: 'Message',
      img: require('../../assets/Images/chat.png'),
      src: 'UserCard'
    }, {
        id: 1,
        name: 'Designing Package',
        img: require('../../assets/Images/pack.png'),
        src: 'ScanCode'
      }, 

      {
        id: 3,
        name:"Reports",
        src:"SoilHealthLabReport",
        img: require('../../assets/Images/pack.png'),
      }
    
  ]
  
 const onclick_item = (src) => {
     console.log(src)
    switch (src) {
      case "ScanCode":
        //navigate
        navigation.navigate('AgrnomistPackgeDesing')
        break;
      case "UserCard":
        navigation.navigate('AgronomistHome')
        //navigate
        break;
      case "SoilHealthLabReport":
        navigation.navigate("SoilHealthLabReport")
        break;
      default:
      //whatever you want
    }
  }
  
const Card =({plant})=>{
  return (
  <TouchableOpacity
        style={styles.card}
        onPress={item => onclick_item(plant.src)}
        >
          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={plant.img}
              style={{flex: 1, resizeMode: 'contain'}}
            />
            </View>
            <Text style={{fontSize: 17, marginTop: 10}}>
            {plant.name}
            </Text>
        </TouchableOpacity>);
}
  return (
    <ImageBackground source={require('../../assets/Images/pdflowersetproject10-adj-38_2.jpg')} style={styles.container}> 
        <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Text style={{fontSize: 38, color: '#FF0000', fontWeight: 'bold'}}>
           Plant For Properity
          </Text>
        </View>
        <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 30,
              paddingBottom: 50,
            }}
            numColumns={2}
            data={plants}
            renderItem={({item}) => {
              return <Card plant={item} />;
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
    justifyContent: 'center',
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    height:150,
    backgroundColor: '#F1F1F1',
  }
});