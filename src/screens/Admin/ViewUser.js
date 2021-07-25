import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Text,Image, View,Linking,StyleSheet, SafeAreaView } from 'react-native';

import {Context as AuthContext} from '../../context/AuthContext'
export default function ViewUser({navigation,route}){
  const {state:{userdata}} = useContext(AuthContext);
 let user = route.params.user
 const message = "PRICE Organization"
  
  const sentpayment = () => {
      navigation.navigate("SentPatment",{user:user})
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center", backgroundColor: 'white' }}>
         <Text>Name: {user.firstname} {user.lastname}</Text>
         <Text>Cnic: {user.cnic} </Text>
         <Text>Area: {user.area}</Text>
         <Text>Mobile Number: {user.mobilenumber}</Text>
         <Text>Role: {user.role}</Text>
          
         <View style={{marginLeft:10, flexDirection:"row",   width:120, justifyContent:"space-around"}} >
            <TouchableOpacity   
            onPress={() => {
              Linking.openURL(
                `http://api.whatsapp.com/send?text=from:${userdata.firstname} to: ${user.firstname}: message: ${message}&phone=${user.mobilenumber}`
              );
            }}
            style={{backgroundColor:"gray", justifyContent:"center", alignItems:"center", borderRadius:50, width:50, height:50,}}>
                <Image style={{width:40,borderRadius:40, resizeMode:"center", height:40}} source={require('../../assets/Images/7b7bc658d3fce83780679e84dc62f2fa.png')}/>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
              Linking.openURL(
                `sms:${user.mobilenumber}?body=from:${userdata.firstname} to: ${user.firstname}: message: ${message}&phone=${user.mobilenumber}`
              );
            }}
            style={{backgroundColor:"gray", justifyContent:"center", alignItems:"center", borderRadius:50, width:50, height:50,}}>
              <Image style={{width:50,borderRadius:50, height:50}}  source={require('../../assets/Images/218-2180655_phone-call-icon-png.png')} />
            </TouchableOpacity>
      </View>
        <TouchableOpacity 
              onPress={() => {sentpayment()}}
           style={{...styles.button, backgroundColor:"gray"}}>
             <Text style={{fontWeight:"bold", color:"#fff"}}>Sent Payment </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button:{
    width:160, 
    height:40,
    marginTop:20,
    justifyContent:"center", 
    alignItems:"center", 
    borderRadius:10
  }
})