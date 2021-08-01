import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MainPage from './src/screens/MainPage';
import Login from './src/screens/login';
import Signup from './src/screens/Signup';
import Logout from './src/screens/logout'
// grower home
import GrowerHome from './src/screens/Grower/GrowerHome';
import Message from './src/screens/Grower/Message';
import UserCard from './src/screens/Grower/UserCard';
import ScanCode from './src/screens/Grower/CodeScan'
import Pyaments from './src/screens/SoilHealthLab/Payments'


// admin screens 
import AdminHome from './src/screens/Admin/AdminHome'
import ViewUser from './src/screens/Admin/ViewUser'
import DeleteUser from './src/screens/Admin/DeleteUser'
import UpdateUser from './src/screens/Admin/UpdateUser'
import SentPatment from './src/screens/Admin/sentpayments'
import PaymentHistory from './src/screens/Admin/ViewPaymentHistory'
import Notifications from './src/screens/Admin/AdminNotifications'

// Agrnomist
import AgronomistHome from './src/screens/Agronomist/AgronomistHome'
import AgrnomistNotifications from './src/screens/Agronomist/Notifications'
import AgrnomistDashboard from './src/screens/Agronomist/Home'
import AgrnomistPackgeDesing from './src/screens/Agronomist/DesignPackage'
import SoilHealthLabReport from './src/screens/Agronomist/SoilHealthLabReport'

// sponser
// import SponsorHome from './src/screens/Sponsor/SponsorHome'

// vendor
import VendorHome from './src/screens/Vendor/VendorHome'
import VendorNotification from './src/screens/Vendor/VendorNotifications'

//socialhealthlab
import SoilhealthLabHome from './src/screens/SoilHealthLab/SoilHealthLabHome'
import SoilhealthNotification from './src/screens/SoilHealthLab/SocialHealthLabNotifications';
import UploadReport from './src/screens/SoilHealthLab/UploadReport'
import ViewAllUsers from './src/screens/SoilHealthLab/ViewUsers'
import SoilMessage from './src/screens/SoilHealthLab/UserCard'

import {Context as AuthContext} from './src/context/AuthContext'
import {Provider as AuthProvider} from './src/context/AuthContext'
import { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

const  App = () =>  {

  const {state:{loading, userdata, loggedin,},tryLocalSignin}  = useContext(AuthContext)
  const AuthStack = createStackNavigator();
  const AdminStack = createStackNavigator();
  const GrowerStack = createStackNavigator();
  const AgronomistStack = createStackNavigator();
  // const SponsorStack = createStackNavigator();
  const VendorStack = createStackNavigator();
  const SoilHealthStack = createStackNavigator();
  
  const AgronomistTab = createBottomTabNavigator();
  const AgronomistDrawer = createDrawerNavigator();

  function AgronomistTabs() {
    return (
      <AgronomistTab.Navigator>
        <AgronomistTab.Screen name="Dasboard" component={AgrnomistDashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <AgronomistTab.Screen name="AgrnomistNotifications" component={AgrnomistNotifications}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
      </AgronomistTab.Navigator>
    );
  }

  const AuthScreens = ({navigation}) => {
    return(
      <AuthStack.Navigator initialRouteName="MainPage">
        <AuthStack.Screen name="Signup" options={{headerShown:true}} component={Signup}/>
        <AuthStack.Screen name="MainPage" options={{headerShown:true}} component={MainPage}/>
        <AuthStack.Screen name="login" component={Login} options={{headerShown:false}} />
      </AuthStack.Navigator>
    )
  }


  const AdminTab = createBottomTabNavigator();
  const AdminDrawer = createDrawerNavigator();

  function AdminTabs () {
    return (
      <AdminTab.Navigator>
        <AdminTab.Screen name="AdminHome" component={AdminHome}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <AdminTab.Screen name="packages" component={Notifications}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
        <AdminTab.Screen name="PaymentHistory" component={PaymentHistory}
          options={{
            tabBarLabel: 'Payment tHistory',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
      </AdminTab.Navigator>
    );
  }

  const AdminScreens = ({navigation}) => {
    return(
      <AdminStack.Navigator>
        <AdminStack.Screen name="Home" component={AdminTabs} options={{
            headerLeft: () => <Icon
                name="view-headline"
                size={25}
                onPress={() => navigation.openDrawer()}
              />
      }} />
        <AdminStack.Screen name="ViewUser" component={ViewUser} />
        <AdminStack.Screen name="DeleteUser" component={DeleteUser} />
        <AdminStack.Screen name="UpdateUser" component={UpdateUser} />
        <AdminStack.Screen name="SentPatment" component={SentPatment} />
    </AdminStack.Navigator>
    )
  }



  
  const GrowerTab = createBottomTabNavigator();
  const GrowerDrawer = createDrawerNavigator();

  function GrowerTabs () {
    return (
      <GrowerTab.Navigator>
        <GrowerTab.Screen name="GrowerHome" component={GrowerHome}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
    
        <GrowerTab.Screen name="Pyaments" component={Pyaments}
          options={{
            tabBarLabel: 'Payment History',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
      </GrowerTab.Navigator>
    );
  }
  const GrowerScreens = ({navigation}) => {
    return(
      <GrowerStack.Navigator>
        <GrowerStack.Screen name="growerhome" component={GrowerTabs} options={{
            headerLeft: () => <Icon
                name="view-headline"
                size={25}
                onPress={() => navigation.openDrawer()}
              />
      }}/>
        <GrowerStack.Screen name="Message" component={Message}/>
        <GrowerStack.Screen name="UserCard" component={UserCard} /> 
        <GrowerStack.Screen name="ScanCode" component={ScanCode} />
      </GrowerStack.Navigator>
    )
  }

  const AgronomistScreens = ({navigation}) => {
    return(
      <AgronomistStack.Navigator>
        <AgronomistStack.Screen name="Dasboard" component={AgronomistTabs} options={{
            headerLeft: () => <Icon
                name="view-headline"
                size={25}
                onPress={() => navigation.openDrawer()}
              />
      }}/>
        <AgronomistStack.Screen name="AgronomistHome" component={AgronomistHome} />
        <AgronomistStack.Screen name="AgrnomistDashboard" component={AgrnomistDashboard} />
        <AgronomistStack.Screen name="AgrnomistPackgeDesing" component={AgrnomistPackgeDesing} />
        <AgronomistStack.Screen name="SoilHealthLabReport" component={SoilHealthLabReport} />
      </AgronomistStack.Navigator>
    )
  }

  
  // const SponsorScreens = ({navigation}) => {
  //   return(
  //     <SponsorStack.Navigator>
  //       <SponsorStack.Screen name="sponsorhome" component={SponsorHome} />
  //     </SponsorStack.Navigator>
  //   )
  // }


  const SoilhealthLabTab = createBottomTabNavigator();
  const SoilhealthLabDrawer = createDrawerNavigator();


  function SoilhealthLabTabs () {
    return (
      <SoilhealthLabTab.Navigator>
        <SoilhealthLabTab.Screen name="SoilhealthLabHome" component={SoilhealthLabHome}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <SoilhealthLabTab.Screen name="SoilhealthNotification" component={SoilhealthNotification}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />

        <SoilhealthLabTab.Screen name="Pyaments" component={Pyaments}
          options={{
            tabBarLabel: 'Payments',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
       
      </SoilhealthLabTab.Navigator>
    );
  }

  //Pyaments
  const SoilhealthLabScreens = ({navigation}) =>{
    return(
      <SoilHealthStack.Navigator>
        <SoilHealthStack.Screen name="SoilhealthLabHome" component={SoilhealthLabTabs} options={{
            headerLeft: () => <Icon
                name="view-headline"
                size={25}
                onPress={() => navigation.openDrawer()}
              />
      }}/>
        <SoilHealthStack.Screen name="UploadReport" component={UploadReport} />
        <SoilHealthStack.Screen name="ViewAllUsers" component={ViewAllUsers} />
        <SoilHealthStack.Screen name="SoilMessage" component={SoilMessage} />
      </SoilHealthStack.Navigator>
    )
  }

  
  const VendorTab = createBottomTabNavigator();
  const VendorDrawer = createDrawerNavigator();
  const VendorScreens = ({navigation}) => {
    return(
      <VendorTab.Navigator>
        <VendorTab.Screen name="vendorhome" component={VendorHome} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <VendorTab.Screen name="notification" component={VendorNotification} 
          options={{
            tabBarLabel: 'Payments',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
      </VendorTab.Navigator>
    )
  }

  useEffect(() => {
    tryLocalSignin();
  },[loading])
  
  if(loading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
     <NavigationContainer>
      {userdata === null 
      ?<AuthScreens />
      
      :userdata.role === "admin"
      ?<AdminDrawer.Navigator initialRouteName="Home">
         <AdminDrawer.Screen name="Home"  component={AdminScreens} />
         <AdminDrawer.Screen name="Logout"  component={Logout} />
      </AdminDrawer.Navigator>
      
  //    :userdata.role === "sponsor"
    //  ?<SponsorScreens />

      :userdata.role === "grower"
      ?<GrowerDrawer.Navigator>
          <GrowerDrawer.Screen name="Home" component={GrowerScreens} /> 
          <GrowerDrawer.Screen name="Logout"  component={Logout} />
        </GrowerDrawer.Navigator>
      :userdata.role === "agronomist"
      ? <AgronomistDrawer.Navigator initialRouteName="Home">
          <AgronomistDrawer.Screen name="Home"  component={AgronomistScreens} />
          <AgronomistDrawer.Screen name="Logout"  component={Logout} />
      </AgronomistDrawer.Navigator>
  
      :userdata.role === "vendor"
      ?<VendorDrawer.Navigator>
        <VendorDrawer.Screen name="home" component={VendorScreens} />
        <VendorDrawer.Screen name="Logout"  component={Logout} />
      </VendorDrawer.Navigator>
      : 
      <SoilhealthLabDrawer.Navigator>
        <SoilhealthLabDrawer.Screen name="Home" component={SoilhealthLabScreens} />
        <SoilhealthLabDrawer.Screen name="Logout"  component={Logout} />
      </SoilhealthLabDrawer.Navigator>
      }
     </NavigationContainer>
  );
}

export default () => {
  return(
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

