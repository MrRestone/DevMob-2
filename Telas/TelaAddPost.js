import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Header from '../Componentes/Header';
import firebase from '../Servicos/firebase'
import { getDatabase, ref, update } from "firebase/database"
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import {Picker} from '@react-native-picker/picker'
import * as Location from 'expo-location'

const TelaAddPost = ({navigation, route}) => {
  const [selectedTag, setSelectedTag] = useState('')
  const [availableTags, setAvailableTags] = useState([])
  const [postFailed, setPostFailed] = useState(false)
  const [location , setLocation] = useState(null)

  const image = route.params.image ? route.params.image : null

  const searchQuotes = async () => {
    url = ""
    if (selectedTag.length === 0){
       url = 'https://api.quotable.io/quotes/random'
    } else {
       url = 'https://api.quotable.io/quotes/random?tags='+selectedTag
    }
    fetch(url)
        .then((response) => response.json())
        .then(async(data) =>{
          if(data.length > 0){
            const database = getDatabase(firebase)
            const storage = getStorage(firebase)
            const postId = Date.now().toString()
            var imageUrl = ''
            if(image){
              const imageRef = storageRef(storage,'imagen/' + postId + '.jpg')
              const imageData = await fetch(image).then((response) => response.blob())
              const uploadTansk = await uploadBytes(imageRef, imageData)
              imageUrl = await getDownloadURL(imageRef)
            }
             const userRef = ref(database, 'user/'+ route.params.uid+"/posts/"+postId)
             update(userRef, { legenda: data[0].content, foto:imageUrl, geolocalizacao: location})
             .then(() => {
                consolo.log('Post criado: ', data[0].content)
                setPostFailed(false)
                navigation.navigate('posts', {uid: route.params.uid})
             })
             .catch((error) => {
               console.error("Erro ao adicionar usuário:", error);
               setPostFailed(true)
             })
          } else{
            console.log("Sem citação nessa tag")
            setPostFailed(true)
          }
        })
        .catch((error) =>{ 
          setPostFailed(true)
          console.error(error)})
  }
  const searchtags = () =>{
    fetch('https://api.quotable.io/tags')
    .then((response) => response.json())
    .then((data) => {
      setAvailableTags(data);
    })
    .catch((error) => console.error(error));
  }
  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      return(<View><Text style={styles.postFailed}>Permissão de Localização negada!</Text></View>)
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude})
  }
  useEffect(()=> {
    searchtags()
  }, [])

  return (
    <View style={styles.container}>
      <Header showNav={true} navigation={navigation} route={route} />
      {postFailed ?<Text style={styles.postFailed}>Falha ao enviar o Post</Text> : null}
      {image ? <Image source={{ uri: image}} style={styles.image} /> : null}
      <View style={styles.contentContainer}>
        <Button
          onPress={() => {navigation.navigate('camera', {uid: route.params.uid})}}
          title="Tirar Foto"
        /> 
        <Picker
          selectedValue={selectedTag}
          onValueChange={(itemValue, itemIndex) => setSelectedTag(itemValue)}
          itemStyle={styles.tagItem}
        >
          <Picker.Item label="Selecione um tipo de legenda" value="" />
          {availableTags.map((tag) => (
            <Picker.Item key={tag._id} label={tag.name} value={tag.name} />
          ))}
        </Picker>
        <Button
          onPress={searchQuotes}
          title="Gerar post"
          color="grey"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  tagItem: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12
  },
  image: {
    flex:1,
    resizeMode: 'contain'
  }
});

export default TelaAddPost;
