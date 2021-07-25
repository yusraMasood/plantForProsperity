import React, { useState,useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet,Text,SafeAreaView, ScrollView} from 'react-native'
import {Context as AuthContext} from '../../context/AuthContext'
import api from '../../constants/api'

function PaymentScreen({ navigation, route }) {
    let user = route.params.user
    const {state:{userdata}} = useContext(AuthContext);
    const [amount, setAmount] = useState("")
    const sendpayment = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'POST',
          redirect: 'manual',
          headers:myHeaders,
          body:JSON.stringify({
             amount:`${amount}`,
             sendername:`${userdata.firstname}${userdata.lastname}`,
             senderaccountno:`${userdata.accountnumber}`,
             recievername:`${user.firstname}${user.lastname}`,
             recieveraccountno:`${user.accountnumber}`,
             recieverid:`${user.id}`        
          })
        };
          fetch(`${api}/paymentinsert`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              console.log(result, "Result")
          }).catch((err) => {
            console.log(err)
          })
    }
  return (
    <SafeAreaView >
        <ScrollView>
         <Text style={{...styles.text, fontSize:25, marginVertical:20, textAlign:"center"}}>Sent Payment to {'\n'} {user.firstname} {user.lastname}</Text>
            <View style={{paddingHorizontal:20,marginHorizontal:20, alignSelf:"center"}}>
             <Text style={styles.text}>Reciever Name</Text>
            <TextInput
                style={styles.input}
                value={user.username}
                placeholder='Enter username'
                autoCapitalize="none"
                editable={false}
            />
             <Text style={styles.text}> Reciever Account Number</Text>
            <TextInput
                style={styles.input}
                value={user.accountnumber}
                placeholder='Enter Account Number'
                autoCapitalize="none"
                editable={false}
            />

             <Text style={styles.text}>Sender Name</Text>
            <TextInput
                style={styles.input}
                value={userdata.username}
                placeholder='Enter Sender Name'
                autoCapitalize="none"
                editable={false}
            />
            
             <Text style={styles.text}> Sender Account Nubmer</Text>
            <TextInput
                style={styles.input}
                value={userdata.accountnumber}
                placeholder='Enter Account Number'
                autoCapitalize="none"
                editable={false}
            />

            <Text style={styles.text}>Enter Amount</Text>
            <TextInput
                style={styles.input}
                value={amount}
                placeholder='Enter Amount'
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(text) => setAmount(text) }
            />
            <View style={styles.space}/>
            <TouchableOpacity style={styles.loginBtn} onPress={() =>sendpayment()}>
              <Text style={{color: "white"}}>sent</Text>
            </TouchableOpacity>
         
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default PaymentScreen

const styles = StyleSheet.create({
    input: {
      width: 350,
      height: 50,
      marginBottom: 20,
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
    loginBtn: {
      width:100,
      borderRadius:5,
      height: 40,
      alignSelf:"center",
      alignItems: "center",
      justifyContent: "center",
      marginVertical:20,
      backgroundColor: "#FF0000",
    },
    text:{
        marginLeft:0,
        fontSize:15, 
        color:"black", 
        fontWeight:"bold" 
    }
  })