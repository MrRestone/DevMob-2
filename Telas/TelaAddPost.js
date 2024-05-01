import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Header from '../Componentes/Header';
import firebase from '../Servicos/firebase'
import { getDatabase, ref, update } from "firebase/database"
import {Picker} from '@react-native-picker/picker'

const TelaAddPost = ({navigation, route}) => {
  const [selectedTag, setSelectedTag] = useState('')
  const availableTags = [{_id: 1, name: 'technology'}, {_id: 2, name: 'famous-quotes'}]
  
  const searchQuotes = async () => {
    console.log('Implementar o uso da API para buscar: '+selectedTag)
  }
  return (
    <View style={styles.container}>
      <Header showNav={true} navigation={navigation} route={route} />
      <View style={styles.contentContainer}>
        <Text>Selecione a tag do seu post</Text>
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
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
});

export default TelaAddPost;
