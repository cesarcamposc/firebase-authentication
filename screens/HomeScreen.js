import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase_config';
import { signOut, onAuthStateChanged } from 'firebase/auth';


const HomeScreen = () => {

    const navigation = useNavigation();
     
    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            navigation.replace('Login');
        })
        .catch((error) => {
            Alert.alert('Error signing out', error.message);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigation.replace('Login');
            }
        });

        return () => unsubscribe();
    }, []);

    

  return (
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
          <View style={styles.container}>
              <Text style={styles.text}>El email es: {auth.currentUser?.email}</Text>

              <Pressable style={styles.button} onPress={handleLogout}>
                  <Text style={styles.buttonText}>Logout</Text>
              </Pressable>
          </View>
      </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#89eea6ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})