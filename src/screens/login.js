import React, { useState,useEffect,useContext } from 'react';
import { View, TextInput, ToastAndroid, StyleSheet,Text, Image, TouchableOpacity, SafeAreaView, ScrollView,} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {Context as AuthContext} from '../context/AuthContext'
import api from '../constants/api'
export default function Login ({navigation}) {
  const {signin} = useContext(AuthContext)
  const [selectedValue, setSelectedValue] = useState("soilhealthlab");
  let [userName, setUserName] = useState('soilhealthlab');
  let [userPassword, setPassword] = useState('123456');
  let [id, setID] = useState("109")
  
    let login_user = () => {
    if (userName === '' || userPassword === '') {
        alert('Please enter your username and password!');
        return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
      try {
        fetch(`${api}/login`, {
          method: 'POST',
          headers:myHeaders,
          body:JSON.stringify({
            "username":userName,
            "password":userPassword,
          })
       }).then((response) => response.json())
        .then((json) => {
          console.log(json)
          if(json.error){
            ToastAndroid.showWithGravityAndOffset(
              "failed with some error",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }else{
            try{
              if(json[0].role === selectedValue){
                signin(json[0])
              }else{
                alert("wrong credentials")
              }
          }catch(err){
            ToastAndroid.showWithGravityAndOffset(
              "failed with some error",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
          }
       }).catch((error) =>{
         console.log(error, 'error')
        ToastAndroid.showWithGravityAndOffset(
          "Please Check Your Internet Connection",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
       })
      }catch(err){
        console.log('Error', err);
      }
  }  

  let farmerlogin = () => {
    if(id.length){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      try {
        fetch(`${api}/farmerlogin`, {
          method: 'POST',
          headers:myHeaders,
          body:JSON.stringify({
            "id":id
          })
       }).then((response) => response.json())
        .then((json) => {
         
          if(json.error){
            ToastAndroid.showWithGravityAndOffset(
              "failed with some error",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }else{
            try{
              if(json[0].role === selectedValue){
                signin(json[0])
              }else{
                alert("wrong credentials")
              }
          }catch(err){
            ToastAndroid.showWithGravityAndOffset(
              "failed with some error",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
          }
       }).catch((error) =>{
         console.log(error, 'error')
        ToastAndroid.showWithGravityAndOffset(
          "Please Check Your Internet Connection",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
       })
      }catch(err){
        console.log('Error', err);
      }
    }
  }

return(
  <SafeAreaView style={{paddingHorizontal: 20, flex: 1, backgroundColor: '#fff', paddingTop: 120}}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <Image
  style={{resizeMode: 'contain', height: 200, width: 180, marginLeft: 100}}
        source={require('../assets/Images/logo1.png')}
      />
         <Text> Please Select Account Type</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: "90%" }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Grower" value="grower" />
            <Picker.Item label="Vendor" value="vendor" />
            <Picker.Item label="Soil Health Lab" value="soilhealthlab" />
            <Picker.Item label="Agronomist" value="agronomist" />
            <Picker.Item label="Admin" value="admin" />
        </Picker>
        {selectedValue === "grower" || selectedValue === "vendor"?
        <View style={{width:'100%', justifyContent:"center", alignItems:"center"}}>
            <TextInput
              style={styles.input}
              placeholder='Enter Id'
              value={id}
              autoCapitalize="none"
              onChangeText={
                (userName) => setID(userName)
              }
            />
              <View style={styles.space}/>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>farmerlogin()}>
              <Text style={styles.loginText}>LOGIN/لاگ ان کریں</Text>
            </TouchableOpacity>
        </View>
        :
        <View style={{width:'100%', justifyContent:"center", alignItems:"center"}}>
            <TextInput
              style={styles.input}
              value={userName}
              placeholder='Email/ای میل'
              autoCapitalize="none"
              onChangeText={
                (userName) => setUserName(userName)
              }
            />
          <TextInput
            style={styles.input}
            value={userPassword}
            placeholder='Password/پاس ورڈ'
            secureTextEntry={false}
            autoCapitalize="none"
            onChangeText={
              (userPassword) => setPassword(userPassword)
            }
          />
            <View style={styles.space}/>
            <TouchableOpacity style={styles.loginBtn} onPress={login_user}>
              <Text style={styles.loginText}>LOGIN/لاگ ان کریں</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
      </SafeAreaView>
    );}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 50,
    margin: 10,
    padding: 8,
    fontSize: 18,
    borderWidth: 1,
    color: "black",
  },
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
  backgroundImage: {
    flex: 1,
  },
  Button: {
    color: 'green'
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  loginText: {
    color: "white"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF0000",
  },
})