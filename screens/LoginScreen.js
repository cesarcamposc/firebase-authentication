import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase_config';
import { signInWithEmailAndPassword , createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert('User logged in:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('Error logging in:', errorCode, errorMessage);
        });
    }
    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert('User registered:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('Error registering:', errorCode, errorMessage);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home');
            } else {
                navigation.replace('Login');
            }
        });

        return () => unsubscribe();
    }, []);

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Login/Register</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text)=> setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}/>
           
                <TextInput 
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text)=> setPassword(text)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}/>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                style={styles.button}
                onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable
                style={styles.button}
                onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </View> 
        </View>        
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})