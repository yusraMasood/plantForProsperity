import React,{useState, useContext} from 'react';
import {ImageBackground,TouchableOpacity,Button, Text,StyleSheet, ScrollView,SafeAreaView} from 'react-native';
import TextInput from '../../components/Textinput'
import * as DocumentPicker from 'expo-document-picker';
import api from '../../constants/api';
import {Context as AuthContext} from '../../context/AuthContext'
const UploadReport = ({navigation}) => {
  
const [sampleDate, setSampleDate] = useState("")
const [area, setArea] = useState("")
const [sderror, setSderror] = useState("")
const [resulturi, setResultUri] = useState(undefined)
const {state:{userdata}} = useContext(AuthContext);


const [sampleCollected, setSampleCollected] = useState("")
const [scerror, setScerror] = useState("")

const [ec, setEc] = useState("")
const [ecerror, setEcerror] = useState("")

const [ph, setPh] = useState("")
const [pherror, setPherror] = useState("")

const _pickDocument = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    type:"application/pdf"
  });
  setResultUri(result.uri);
  uploaddocumnet(result.uri)
}

const uploaddocumnet = (uri) => {
    var formdata = new FormData();
    var photo = {
      uri: uri,
      type: 'application/pdf',
      name: 'file.pdf',
    };
    formdata.append("file", photo);
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type' :'multipart/form-data'
    },
    body: formdata
   
  };
  
  fetch(`${api}/uploadPdf`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setResultUri(`${api}/pdffiles/${result.filename}`)
    }).catch(error => console.log('errorrrrrrr', error));
  
}

const submitdata = () => {
 
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers:myHeaders,
    body:JSON.stringify({
      uri:resulturi,
      sampleDate:sampleDate,
      sampleCollected:sampleCollected,
      ec:ec,
      ph:ph,
      userid:userdata.id,
      area:userdata.area
    }),
    redirect: 'manual'
  };
 
  fetch(`${api}/soilhealthlabdata`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    if(result.affectedRows){
      alert("document uploaded")
    }else{
      alert("falied")
    }
  }).catch((err) => {
    console.log(err)
  })
}
    return(
      <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: "#fff"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 23, color: "#FF0000", marginTop: 30, marginBottom: 40}}>Soil Health Description Report</Text>
          <TextInput label="input Area" value={area} setValue={setArea} error={sderror} setError={setSderror} />
          <TextInput label="Sample Collection Date" value={sampleDate} setValue={setSampleDate} error={sderror} setError={setSderror} />
          <TextInput label="Sample Collected by" value={sampleCollected} setValue={setSampleCollected} error={scerror} setError={setScerror} />
          <TextInput label="Ec" value={ec} setValue={setEc} error={ecerror} setError={setEcerror} />
          <TextInput label="Ph" value={ph} setValue={setPh} error={pherror} setError={setPherror} />
         
          <TouchableOpacity 
              style={styles.loginBtn}
              onPress={() => _pickDocument()}
          ><Text style={{color: "white"}}>Upload Pdf</Text>
          </TouchableOpacity>
          {resulturi!==undefined?
          <TouchableOpacity 
              style={styles.loginBtn} 
              onPress={() => submitdata()} >
            <Text style={{color: "white"}}>Submit</Text>
          </TouchableOpacity>
          :null}
          </ScrollView>
        </SafeAreaView>

    );
};

export default UploadReport;

const styles = StyleSheet.create({
     container: {
    
       justifyContent: 'center',
      
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
      alignSelf:"center",
      backgroundColor: "#FF0000",
    },

  })
