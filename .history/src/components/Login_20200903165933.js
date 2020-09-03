import React, { useState, useEffect } from 'react';
import { TextInput,KeyboardAvoidingView,ScrollView,StyleSheet, ActivityIndicator, View, Text, Alert, AsyncStorage } from 'react-native';
import { Button, Input, Icon, SocialIcon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import { LoginButton, AccessToken, ShareDialog, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  
export default function Login({ navigation }) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [gettingLoginStatus, setLoginStatus] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const handlechange  =()=>{
        setShowError(false)
    }
    const handleBlur = () => {
        if (email=='') {
          setShowError(true);

        } else {
          setShowError(false);
        }
      };
      const handleBlurs = () => {
        if (password=='') {
          setShowError(true);

        } else {
          setShowError(false);
        }
      };
    const login = async() => {
        
        setShowLoading(true);
          
        try { 
   
          
            const doLogin = await auth().signInWithEmailAndPassword(email, password);
            setShowLoading(false);
          
            if(doLogin.user) {
                navigation.navigate('Home');
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          alert('User is already signed in');
          //Get the User details as user is already signed in
          this._getCurrentUserInfo();
        } else {
          //alert("Please Login");
          console.log('Please Login');
        }
        setLoginStatus(false);
      };

    useEffect(() => {
        // Your code here
        GoogleSignin.configure({
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId:"112479742610-75euappc0fvbsk4l34tnccbtaioal8ef.apps.googleusercontent.com"
        })
        _isSignedIn()

        
      }, []);

     async function _isSignedIn(){
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          alert('User is already signed in');
          //Get the User details as user is already signed in
          this._getCurrentUserInfo();
        } else {
          //alert("Please Login");
          console.log('Please Login');
        }
        setLoginStatus(false);
        
      };
    
      async function _getCurrentUserInfo(){
        try {
          const userInfo = await GoogleSignin.signInSilently();
          console.log('User Info --> ', userInfo);
         setUserInfo(userInfo)
         navigation.navigate('Home',{userInfo:userInfo});
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            alert('User has not signed in yet');
            console.log('User has not signed in yet');
          } else {
            alert("Something went wrong. Unable to get user's info");
            console.log("Something went wrong. Unable to get user's info");
          }
        }
      };
    
      async function _signIn(){
        //Prompts a modal to let the user sign in into your application.
        try {
          await GoogleSignin.hasPlayServices({
            //Check if device has Google Play Services installed.
            //Always resolves to true on iOS.
            showPlayServicesUpdateDialog: true,
          });
          const userInfo = await GoogleSignin.signIn();
          setUserInfo(userInfo)
          console.log(userInfo);
          navigation.navigate('Home',{userInfo:userInfo});
        } catch (error) {
          console.log('Message', error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services Not Available or Outdated');
          } else {
            console.log('Some Other Error Happened');
          }
        }
      };
    
      async function _signOut(){
        //Remove user session from the device.
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        //   this.setState({ userInfo: null });
        setUserInfo(null)
        // Remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };
 
    return (
       <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
       
        <View style={styles.container} >
        
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ marginBottom: 10,fontSize: 20, height: 50  }}>WELCOME</Text>
                </View>
                <View  style={  {marginBottom: 10, height: 50, borderColor: 'black', borderWidth: 1, borderRadius: 10 }}>
                    <Input
                    onBlur={handleBlur}
                        style={styles.textInput}
                        placeholder='Email'
                        leftIcon={
                            <Icon
                            name='email'
                            size={24}
                            />
                        }
                        value={email}
                        onChangeText={handlechange}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={{ marginBottom: 10,height: 50, borderColor: 'black', borderWidth: 1, borderRadius: 10 }}>
                    <Input
                                        onBlur={handleBlurs}

                        style={styles.textInput}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            />
                        }
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                {showError && <Text style={{color: 'red'}}>*email or password is empty</Text>}

                <View style={styles.subContainer}style={{ paddingHorizontal: 15}}>
                    <Button
                        style={styles.textInput}
                        disabled={!email || !password}
                        title="Login"
                        onPress={() => login()} />
                </View>
                
                <Text style={{paddingHorizontal: 20, fontWeight: "bold", color: "gray"}}> ────────  OR   ────────</Text>
                <View style={{paddingHorizontal: 20}}>  
                <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
                />
 {/* <SocialIcon
 raised={false}
 style={{ borderRadius:0, borderWidth: 0.5, height: 45}}
  title='Sign In With Facebook'
  button
  type='facebook'
/> */}
<LoginButton

              onLoginFinished={
                (error, result) => {
                  console.log(error,result)
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        setLoginStatus(true);
                        console.log(data.accessToken.toString());
                        navigation.navigate('Home',{userInfo:userInfo});
                        AsyncStorage.setItem('token',data.accessToken.toString());
                      }
                    )
                  }
                }}
              onLogoutFinished={() => {
                console.log("logout.");
                setLoginStatus(false);
              }}/>
<SocialIcon
style={{ borderRadius:0,
    borderWidth: 0.5, height: 45}}
title='Sign In With Twitter'
button
  type='twitter'
/>

         </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{marginTop: 15,  color: "#6646ee"}}>Forgot Password?</Text>
                </View>
                <View style={styles.subContainer} style={{paddingHorizontal: 15, marginBottom: 10}}>
                    <Text></Text>
                    <Button
                        style={styles.textInput}
                      
                        title="Reset Password"
                        onPress={() => {
                            navigation.navigate('Reset');
                        }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{marginTop: 10, color: "#6646ee"}}>New user? join here</Text>
                </View>
                <View style={styles.subContainer} style={{paddingHorizontal: 15}}>
                    <Text></Text>
                    <Button
                        style={styles.textInput}
                   
                        title="Register"
                        onPress={() => {
                            navigation.navigate('Register');
                        }} />
                </View>
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View>
           
        </View>
       </KeyboardAvoidingView>

    );
}

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 450,
        padding: 20
    },
    subContainer: {
        marginBottom: 1,
        padding: 5,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        margin: 5,
        width: 200
    },
    transparentButton: {
        marginTop: 30,
        borderColor: '#3B5699',
        borderWidth: 2
    },
    buttonBlueText: {
        fontSize: 20,
        color: '#3B5699'
    },
    buttonBigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inline: {
        flexDirection: 'row'
    },
})