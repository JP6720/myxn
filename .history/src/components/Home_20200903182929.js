import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {LoginManager} from 'react-native-fbsdk'

export default function Home({route, navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
     
    useEffect(() => {
        alert(route.params.token)
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
            customFacebookLogout()
            navigation.navigate('Login')}} />,
});