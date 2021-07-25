import React,{useEffect, useContext,useRef, useState} from 'react';
import { Text,Dimensions,View,SafeAreaView, Linking, FlatList,ImageBackground,TouchableOpacity ,Image, StyleSheet} from 'react-native';
import api from '../../constants/api';
import {Context as AuthContext} from '../../context/AuthContext'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const width = Dimensions.get('window').width-30;
function HomeScreen({ navigation }) {
 
  const {state:{userdata}} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification(lenght) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got Paymnets! 📬",
        body: 'Your have got Some Payments',
        data: { data:  `Your Have Got new ${lenght} Payments` },
      },
      trigger: { seconds:1 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

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
 
    fetch(`${api}/getpayments`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setData(result)
      if(result.length){
        schedulePushNotification(result.length)
      }
    }).catch((err) => {
      console.log(err) 
    })
  },[])

  const Card = ({code})=> {
  
    return (
      <TouchableOpacity style={styles.card}>
        <View style={{marginLeft:10}}>
          <Text style={{color:"black"}}>sendername: {code.sendername} </Text>
          <Text style={{color:"black"}}>recievername: {code.recievername} </Text>
          <Text style={{color:"black"}}>senderaccountno: {code.senderaccountno} </Text>
          <Text style={{color:"black"}}>recieveraccountno: {code.recieveraccountno} </Text>
          <Text style={{color:"black"}}>amount: {code.amount} </Text>
        </View>
      </TouchableOpacity>
     );
  }
  console.log('data.log', data)
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
          />:<Text style={{backgroundColor:"gray", paddingHorizontal:40, paddingVertical:20,color:"#fff",fontWeight:"bold", borderRadius:20,}}>No Payments</Text>}
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