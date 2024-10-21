import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  TextInput,
  Text,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, database } from './firebase'; // Firebase storage og Firestore
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

export default function App() {
  const [text, setText] = useState(''); // Til at holde teksten
  const [notes, setNotes] = useState([]);
  const [imagePath, setImagePath] = useState(null); // Til at holde billedets sti

  // Funktion der håndterer tekstinput og tilføjer det til en liste
  function buttonHandler() {
    setNotes([...notes, { key: notes.length, name: text }]);
  }

  // Funktion til at vælge et billede fra biblioteket
  async function LaunchImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImagePath(result.assets[0].uri); // Viser det valgte billede
    }
  }

  // Funktion til at åbne kameraet og vise billedet på DetailPage
  async function launchCamera() {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted === false) {
      alert('camera access not provided');
    } else {
      ImagePicker.launchCameraAsync({
        quality: 1,
      })
        .then((response) => {
          if (!response.canceled) {
            setImagePath(response.assets[0].uri); // Billedet vises på DetailPage
          }
        })
        .catch((error) => alert('Fejl i kamera: ' + error));
    }
  }

  // Funktion til at uploade billedet
  async function uploadImage() {
    const res = await fetch(imagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, 'myimage.jpg');
    uploadBytes(storageRef, blob).then((snapshot) => {
      alert('Billedet er uploadet');
    });
  }

  // Funktion til at downloade og vise billedet
  async function downloadImage() {
    getDownloadURL(ref(storage, 'myimage.jpg')).then((url) => {
      setImagePath(url); // Viser billedet, der er hentet fra Firebase
    });
  }

  // Save-funktion til at gemme billedet og teksten i Firebase
  async function saveData() {
    try {
      const res = await fetch(imagePath); // Henter billedet fra lokal URI
      const blob = await res.blob(); // Konverterer billedet til blob for Firebase Storage
      const storageRef = ref(storage, 'myimage.jpg'); // Reference til Firebase Storage

      const snapshot = await uploadBytes(storageRef, blob); // Uploader billedet
      const downloadURL = await getDownloadURL(snapshot.ref); // Henter download-URL

      // Gemmer tekst og billed-URL i Firestore
      await addDoc(collection(database, 'notes'), {
        text: text, // Gemmer brugerens tekst
        imageUrl: downloadURL, // Gemmer billedets URL
      });

      alert('Billedet og teksten er nu gemt i Firebase!');
    } catch (error) {
      alert('Fejl ved gemning af data: ' + error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>

      {/* TextInput til at fange brugerens tekst */}
      <TextInput
        style={styles.textInput}
        onChangeText={(txt) => setText(txt)}
        placeholder="Indtast tekst her"
      />

      {/* Button til at tilføje tekst til listen */}
      <Button title="Press Me" onPress={buttonHandler}></Button>

      {/* FlatList til at vise brugerens noter */}
      <FlatList
        data={notes}
        renderItem={(note) => (
          <View>
            <Text>{note.item.name}</Text>
          </View>
        )}
      />

      {/* Viser det valgte eller hentede billede */}
      <Image style={{ width: 200, height: 200 }} source={{ uri: imagePath }} />

      {/* Knap til at vælge et billede fra galleriet */}
      <Button title="Pick image" onPress={LaunchImagePicker} />

      {/* Knap til at uploade billedet */}
      <Button title="Upload image" onPress={uploadImage} />

      {/* Knap til at downloade billedet fra Firebase Storage */}
      <Button title="Download image" onPress={downloadImage} />

      {/* Knap til at åbne kameraet */}
      <Button title="Camera" onPress={launchCamera} />

      {/* Save-knap til at gemme billedet og teksten i Firebase */}
      <Button title="Save" onPress={saveData} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  textInput: {
    backgroundColor: 'lightblue',
    minWidth: 200,
    marginVertical: 10,
    padding: 10,
  },
});
