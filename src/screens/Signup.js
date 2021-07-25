import React, { useState} from 'react';
import {Image, StyleSheet,ScrollView,ToastAndroid, SafeAreaView, TouchableOpacity,Text} from 'react-native';
import TextInput from '../components/Textinput'
import {Picker} from '@react-native-picker/picker';
import api from '../constants/api'
export default function Signup ({navigation}) {

const [selectedValue, setSelectedValue] = useState("grower");
const [firstName, setFirstName] = useState("")
const [fnerror, setFnerror] = useState("")

const [lastName, setLastName] = useState("")
const [lnerror, setlneror] = useState("")

const [username, setUsername] = useState("");
const [usernameerror , setUserNameError] = useState("");

const [password, setPassword] = useState("");
const [passworderror, setPassworderror] = useState("")

const [area, setArea] = useState("")
const [areaerror , setAreaError] = useState("")

const [address, setAddress] = useState("");
const [addresserror, setAddressError]= useState("")

const [mobilenumber, setMobileNumber] = useState("")
const [mobilenumbererror, setMobileNumberError] = useState("");

const [cnic, setCnic] = useState("")
const [cnicError , setCnicError] = useState("")

const [accountnumber, setAccountNumber]= useState("")
const [accountnumbererror, setAccountNumbererror] = useState("")
 
const register_user = () => {
  if(username.length < 3){
    setUserNameError("Please Enter user Name");
    return;
  }
  if(password.length < 4){
      setUserNameError("");
      setPassworderror("Please Enter strong Password")
      return;
  }
  setPassworderror("");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  try {
    fetch(`${api}/signup`, {
      method: 'POST',
      headers:myHeaders,
      body:JSON.stringify({
        "firstname":firstName,
        "lastname":lastName,
        "username":username,
        "password":password,
        "area":area,
        "role":selectedValue,
        "cnic":cnic,
        "mobilenumber":mobilenumber,
        "accountnumber":accountnumber,
        "address":address
      })
   }).then((response) => response.json())
    .then((json) => {
      if(json.error){
        setUserNameError("the username is already used");
      }else{
        setUserNameError("")
        ToastAndroid.showWithGravityAndOffset(
          "Registeration Done",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
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
};
    return (
      <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: "#fff"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image
  style={{resizeMode: 'contain', height: 200, width: 180, marginLeft: 100}}
        source={require('../assets/Images/logo1.png')}
      />
        <Text style={{textAlign: "center", color: "#FF0000", fontWeight: "bold", fontSize: 20}}>Sign Up</Text> 
        
        <TextInput label="First name" value={firstName} setValue={setFirstName} error={fnerror} setError={setFnerror} />
       
        <TextInput label="Last name" value={lastName} setValue={setLastName} error={lnerror} setError={setlneror} />
       
        <TextInput label="Area" value={area} setValue={setArea} error={areaerror} setError={setAreaError} />
       
        <TextInput label="Mobile Number" value={mobilenumber} setValue={setMobileNumber} error={mobilenumbererror} setError={setMobileNumberError} />
       
        <TextInput label="Address" value={address} setValue={setAddress} error={addresserror} setError={setAddressError} />
       
        <TextInput label="Cnic" value={cnic} setValue={setCnic} error={cnicError} setError={setCnicError} />
       
        <TextInput label="Bank Account Number" value={accountnumber} setValue={setAccountNumber} error={accountnumbererror} setError={setAccountNumbererror} />
       
        <TextInput label="username" value={username} setValue={setUsername} error={usernameerror} setError={setUserNameError} />
       
        <TextInput label="Password" value={password} setValue={setPassword} error={passworderror} setError={setPassworderror} />
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
      </Picker>
     
        <TouchableOpacity style={styles.loginBtn}
        onPress={register_user}
        >
        <Text style={styles.loginText}>Signup/سائن اپ</Text>
      </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    )
  }
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
    space: {
      width: 20, // or whatever size you need
      height: 150,
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop:10,
      backgroundColor: "#FF0000",
      marginLeft: 40,
    },

  })