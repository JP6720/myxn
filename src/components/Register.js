import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default function Register({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
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
    const register = async() => {
        setShowLoading(true);
        try {
            const doRegister = await auth().createUserWithEmailAndPassword(email, password);
            setShowLoading(false);
            if(doRegister.user) {
                navigation.navigate('Home');
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, height: 50 }}>Register Here!</Text>
                </View>
                <View style={styles.subContainer}>
                    <Input
                    onBlur={handleBlur}
                        style={styles.textInput}
                        placeholder='Your Email'
                        leftIcon={
                            <Icon
                            name='mail'
                            size={24}
                            />
                        }
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.subContainer} style={{width: 200}}>
                    <Input
                    onBlur={handleBlurs}
                        style={styles.textInput}
                        placeholder='Your Password'
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
              <Text> {showError && <Text style={{color: 'red'}}>*email or password is empty</Text>}</Text>

                <View style={styles.subContainer}>
                    <Button
                        style={styles.textInput}
                        disabled={!email||!password}
                        title="Register"
                        onPress={() => register()} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{marginBottom: 10}}>Already a user?</Text>
                </View>
                <View style={styles.subContainer}>
                    <Button
                        style={styles.textInput}
                       
                        title="Login"
                        onPress={() => {
                            navigation.navigate('Login');
                        }} />
                </View>
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View>
        </View>
    );
}

Register.navigationOptions = ({ navigation }) => ({
    title: 'Register',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 400,
        padding: 20
    },
    subContainer: {
        marginBottom: 20,
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
})