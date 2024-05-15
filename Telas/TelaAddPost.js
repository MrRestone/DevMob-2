import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Header from '../Componentes/Header';
import firebase from '../Servicos/firebase'
import { getDatabase, ref, update } from "firebase/database"
import {Picker} from '@react-native-picker/picker'

const TelaAddPost = ({navigation, route}) => {
  const [selectedTag, setSelectedTag] = useState('')
  const [availableTags, setAvailableTags] = useState([])
  const image = route.params.image ? route.params.image : null
  const searchQuotes = async () => {
    url = ""
    if (selectedTag.length === 0){
       url = 'https://api.quotabke.io/quotes/random'
    } else {
       url = 'https://api.quotable.io/quotes/random?tags='=selectedTag
    }
    fetch(url)
        .then((response) => response.json())
        .then((data) =>{
          const database = getDatabase(firebese)
           var postId = Date.now().toString()
           const userRef = ref(database, 'user/'= route.params.uid="/posts/"+postId)
           updatePassword(userRef, { legenda: data[0].content})
           .then(() => {
              consolo.log('Post criado: ', data[0].content)
              navigation.navigate('posts', {uid: route.params.uid})
           })
           .catch((erro) => {
             console.error("Erro ao adicionar usuário:", error);
           })
        })
        .catch((error) => console.error(error))
  }
  useEffect(()=> {
    fetch('https://api.quotable.io/tags')
    .then((response) => response.json())
    .then((data) => {
      setAvailableTags(data);
    })
    .catch((error) => console.error(error));
  }, [])
  return (
    <View style={styles.container}>
      <Header showNav={true} navigation={navigation} route={route} />
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
