import React, { useState, useEffect } from 'react';
import { View, Text ,AsyncStorage} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {LoginManager,AccessToken,GraphRequestManager,GraphRequest} from 'react-native-fbsdk'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
export default function Home({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
     
    useEffect(() => {
        
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
     
    if (initializing) return null;
     
    if (!user) {
        return navigation.navigate('Login');
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome {user.email}</Text>
        </View>
    );
}

function customFacebookLogout(){
    console.log('ss')
    AsyncStorage.removeItem('token').then(()=>{
        navigation.navigate('Login')
      })
    var current_access_token = '';
    AccessToken.getCurrentAccessToken().then((data) => {
      current_access_token = data.accessToken.toString();
    }).then(() => {
      let logout =
      new GraphRequest(
        "me/permissions/",
        {
            accessToken: current_access_token,
            httpMethod: 'DELETE'
        },
        (error, result) => {
            if (error) {
                console.log('Error fetching data: ' + error.toString());
            } else {
                LoginManager.logOut();
            }
        });
      new GraphRequestManager().addRequest(logout).start();
      
      
    })
    .catch(error => {
      console.log(error)
    });      
  }

Home.navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: () => <Button  
            buttonStyle={{ padding: 0, marginRight: 20, backgroundColor: 'transparent' }}
            icon={
                <Icon
               
                name='logout'
                type='antdesign'
                color='white'
              />
            } title="Sign Out"
            onPress={() => {auth().signOut()
              
                try {
                 GoogleSignin.revokeAccess();
                  GoogleSignin.signOut().then(()=>{
                    AsyncStorage.removeItem('token').then(()=>{
                      navigation.navigate('Login')
                    })
                  })
                  
                //   this.setState({ userInfo: null });
                
                // Remove the user from your app's state as well
                } catch (error) {
                  console.error(error);
                }
              
            customFacebookLogout()
            navigation.navigate('Login')}} />,
});