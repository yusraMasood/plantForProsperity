import React, { useState,useEffect,useContext } from 'react';
import { View,StyleSheet,Text, SafeAreaView,ScrollView, TouchableOpacity} from 'react-native'
import { Link } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {Context as AuthContext} from '../context/AuthContext'
import api from '../constants/api'

export default function Login ({navigation}) {
  const {signout} = useContext(AuthContext)

return(
  <SafeAreaView
  style={{paddingHorizontal: 20, flex: 1, backgroundColor: "#fff"}}>
  <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{marginTop: 300, textAlign: "center"}}>Are you sure you want to logout?</Text>
        <View style={{ flexDirection:"row" }}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => signout()}> 
          <Text style={{color:"white"}}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.goBack()}> 
          <Text style={{color:"white"}}>No</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
      </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
  
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
 
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginLeft: 20,
    backgroundColor: "#FF0000",
  },
  button: {
    flex: 1
  }
})