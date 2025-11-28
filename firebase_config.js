// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXbvXKC_ClxiRasCLikRx5zJd59kWADtE",
  authDomain: "react-native-expo-agos.firebaseapp.com",
  projectId: "react-native-expo-agos",
  storageBucket: "react-native-expo-agos.firebasestorage.app",
  messagingSenderId: "303240707648",
  appId: "1:303240707648:web:da9ef47e5d7e0c8ef8e9a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});  

export { app, auth }; 