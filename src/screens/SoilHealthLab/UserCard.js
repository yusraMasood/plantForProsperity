import React,{useContext} from 'react';
import {View, SafeAreaView, Image,Linking, Text,TouchableOpacity,StyleSheet} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext'
const UserCard = ({navigation,route}) => {
  
  const {state:{userdata}} = useContext(AuthContext);
  const user= route.params;
  console.log(user.user.mobilenumber)
  const message = "May the last Ashrah becomes the source of mughfirah for all of us. Share this prayer with everyone you know so that we can maximize the impact. Little deeds go a long way. "
  return (
    <SafeAreaView>
    <View style={{backgroundColor: '#C0C0C0' , height: 230, borderRadius: 10}}>
      <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            {/* <Image
              source={user.image}
              style={{flex: 1, resizeMode: 'contain'}}
            /> */}
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10, textAlign: 'center'}}>
            {user.name}
          </Text>
          <View style={styles.space}/>
          <View style={{flexDirection:'row',width:"80%", alignItems:"center", justifyContent:"space-around", alignSelf:"center", flex: 1}}>
          <TouchableOpacity   
            onPress={() => {
              Linking.openURL(
                `http://api.whatsapp.com/send?text=from:${userdata.firstname} to: ${user.firstname}: message: ${message}&phone=${user.user.mobilenumber}`
              );
            }}
            style={{backgroundColor:"gray", justifyContent:"center", alignItems:"center", borderRadius:50, width:50, height:50,}}>
                <Image style={{width:40,borderRadius:40, resizeMode:"center", height:40}} source={require('../../assets/Images/7b7bc658d3fce83780679e84dc62f2fa.png')}/>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
              Linking.openURL(
                `sms:${user.user.mobilenumber}?body=from:${userdata.firstname} to: ${user.firstname}: message: ${message}&phone=${user.user.mobilenumber}`
              );
            }}
            style={{backgroundColor:"gray", justifyContent:"center", alignItems:"center", borderRadius:50, width:50, height:50,}}>
              <Image style={{width:50,borderRadius:50, height:50}}  source={require('../../assets/Images/218-2180655_phone-call-icon-png.png')} />
            </TouchableOpacity>
            </View>
            </View>
    </SafeAreaView>
  );
};

export default UserCard;
const styles = StyleSheet.create({
  picture: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginLeft: 40,
    marginRight:80
  },
  space: {
    width: 10, // or whatever size you need
    height: 20,
  },
});

/*

*/