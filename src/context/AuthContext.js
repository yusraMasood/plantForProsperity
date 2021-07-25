import createDataContext from './createDataContext'
// import AsyncStorage from '@react-native-community/async-storage'
import  AsyncStorage from  "@react-native-async-storage/async-storage"
const authReducer = (state,action) =>{
    switch(action.type){
      case "logout":
        return{
          ...state,
          loggedin:false,
          userdata:null
        }
      case 'signin':
        return{
          ...state,
          loading:false,
          userdata:action.payload,
        }
         default:
            return state;
    }
}


const tryLocalSignin  = dispatch => async () =>{
  //console.log('local sign in')
  var token =  await AsyncStorage.getItem('token')  
 // console.log('token from local storage ', token)
  dispatch({type:'signin', payload:JSON.parse(token)})
}

const signin  = dispatch => async (data) =>{
  dispatch({type:'signin', payload:data})
}


const signout = dispatch => async () =>{
  try{
      await AsyncStorage.removeItem('token');
      dispatch({type:"logout"})
  }catch{
    console.log('Error');
  }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, tryLocalSignin },
    { loggedin:false, userdata:null, loading:true}
  );
  