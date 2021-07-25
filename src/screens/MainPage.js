import React from 'react';
import { SafeAreaView,ScrollView,StyleSheet,Image,TouchableOpacity,Text,View} from 'react-native';
export default function MainPage ({navigation}) {
    return(
        <SafeAreaView
  style={{paddingHorizontal: 20, flex: 1, backgroundColor: '#fff', paddingTop: 120}}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <Image
  style={{resizeMode: 'contain', height: 200, width: 180, marginLeft: 100}}
        source={require('../assets/Images/logo1.png')}
      />
      <View style={styles.space}/>
    
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginText}>LOGIN/لاگ ان کریں</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.loginText}>Signup/سائن اپ</Text>
            </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    space: {
        width: 50, // or whatever size you need
        height: 100,
      },
    loginBtn: {
        marginLeft: 40,
        width: "80%",
        borderRadius: 25,
        color: "white",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF0000",
      },
      loginText: {
        color: "white",
    
      },
});