import React,{useState} from 'react';
import { Text,TextInput,View,SafeAreaView, Button, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('dbName.db')
const DeleteUser = ({ navigation }) => {
    let [inputUserId, setInputUserId] = useState('');
  
    let deleteUser = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  userRegister where user_id=?',
          [inputUserId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('AdminHome'),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Please insert a valid User Id');
            }
          }
        );
      });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Enter User Id"
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
                style={{ padding: 10 }}
              />
              <Button title="Delete User" onPress={deleteUser} />
            </View>
          </View>
        </SafeAreaView>
      );
    };
    
    export default DeleteUser;