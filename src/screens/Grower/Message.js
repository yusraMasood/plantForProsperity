import React, {useContext,useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext'
import api from '../../constants/api'
export default function Contacts({navigation}) {
  const {state:{userdata}} = useContext(AuthContext);
  const [contact, setContact] = useState([])
  useEffect(() => {
    var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers:myHeaders,
      body:JSON.stringify({
        "role":`${userdata.role}`,
        "area":`${userdata.area}`
      })
    }
    fetch(`${api}/getallusers`,requestOptions).then((data) => data.json())
    .then((res) => {
      setContact(res)
    }).catch((err) => {
      console.log(err)
    })
  },[])
  
  

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('UserCard', item)}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.firstname} {item.lastname}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );}
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
          data={contact}
          keyExtractor = {(item) => {
            return item.id.toString();
          }}
          renderItem={renderItem}/>
      </View>
    );
  };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});