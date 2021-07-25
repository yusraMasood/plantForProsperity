import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {StyleSheet,Text, View} from 'react-native'
const MyComponent = ({label, value , setValue , error , setError }) => {
  
  return (
    <View style={{height:80, width:"100%", marginTop:5, backgroundColor:"#fff"}}>
        <TextInput
            label={label}
            theme={{ colors: { primary: 'green',underlineColor:'transparent',}}}
            style={{borderColor:"green"}}
            mode="outlined"
            error={error.length === 0 ?false:true}
            value={value}
            style={{backgroundColor:"#eee", marginHorizontal:10, height:50, borderBottomColor:"green", borderRadius:10}}
            onChangeText={text => setValue(text)}
        />
        <Text style={{color:"red",marginHorizontal:10, fontSize:9}} >{error}</Text>
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({

})