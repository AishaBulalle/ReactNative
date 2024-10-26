import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { database } from './firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function App() {
  const API_KEY = 'AIzaSyC………………82WmHHCtoc';
  const url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  const urlSignUp =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  const [enteredEmail, setEnteredEmail] = useState('jon@m.dk');
  const [enteredPassword, setEnteredPassword] = useState('123456');
  const [userId, setUserId] = useState('');
  const [enteredText, setenteredText] = useState('type here');

  async function addDocument() {
    try {
      await addDoc(collection(database, userId), {
        text: enteredText,
      });
    } catch (error) {
      console.log('error addDocument ' + error);
    }
  }

  async function login() {
    // try{
    // const response = await axios.post(url + API_KEY , {
    // email:enteredEmail,
    // password:enteredPassword,
    // returnSecureToken:true
    // })
    // console.log("logget ind " + response.data.localId)
    // setUserId(response.data.localId)
    // }catch(error){
    // alert("ikke logget ind " + error.response.data.error.errors[0].message)
    // }
  }

  async function signup() {
    // try{
    // const response = await axios.post(urlSignUp + API_KEY , {
    // email:enteredEmail,
    // password:enteredPassword,
    // returnSecureToken:true
    // })
    // alert("Oprettet " + response.data.idToken)
    // }catch(error){
    // alert("ikke oprettet " + error.response.data.error.errors[0].message)
    // }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        onChangeText={(newText) => setEnteredEmail(newText)}
        value={enteredEmail}
      />
      <TextInput
        onChangeText={(newText) => setEnteredPassword(newText)}
        value={enteredPassword}
      />
      <Button title="Log in" onPress={login} />

      <TextInput
        onChangeText={(newText) => setEnteredEmail(newText)}
        value={enteredEmail}
      />
      <TextInput
        onChangeText={(newText) => setEnteredPassword(newText)}
        value={enteredPassword}
      />
      <Button title="Signup" onPress={signup} />
      <TextInput
        onChangeText={(newText) => setenteredText(newText)}
        value={enteredText}
      />
      <Button title="Add new Document" onPress={addDocument} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
