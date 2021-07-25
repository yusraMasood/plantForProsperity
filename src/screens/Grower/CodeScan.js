import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Context as AuthContext} from '../../context/AuthContext'
import api from '../../constants/api'
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {state:{userdata}} = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      redirect: 'manual',
      headers:myHeaders,
      body:JSON.stringify({
        area:`${userdata.area}`,
        id:`${userdata.id}`,
        type, data
      })
    };
      fetch(`${api}/savebarcode`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          console.log(result, "Result")
      }).catch((err) => {
        console.log(err)
      })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      {scanned ?<BarCodeScanner
        onBarCodeScanned={scanned ?handleBarCodeScanned:undefined}
        style={StyleSheet.absoluteFillObject}
      />:
        <TouchableOpacity onPress={() => setScanned(true)} style={{backgroundColor:"green", width:200,height:50, borderRadius:10, justifyContent:"center", alignItems:"center", alignSelf:"center"}} >
            <Text>Tap Here to Scan</Text>
        </TouchableOpacity>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});