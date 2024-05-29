import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { CameraView } from 'expo-camera';
import Header from '../Componentes/Header';

function TelaCamera({navigation, route}) {

    const [hasPermission, setHasPermission] = useState(null)
    const [camera, setCamera] = useState(null);
    const [Image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const{ status } = await CameraView.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted')
        }) ();
    },[]);

    const takePicture = async () => {
        if(camera){
            const data = await camera.tekePictureAsync(null)
            setImage(data)
        }
    }
    if(!hasPermission){
        return(
            <View style={styles.container}>
                <Text>Permissão da câmera negado!</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Header showNav={false}/>
                </View>
                    {Image ? (
                      <View style={styles.container}>  
                        <Image source={{ uri: Image.uri}} Style={styles.image}/>
                        <Button
                            color='gray'
                            title="Tirar nova foto"
                            onPress={() => {
                             setImage(null)
                            }}
                        />    
                        <Button 
                        title="user essa foto"
                        onPress={() => {
                            navigation.navigate('addPost', {uid: route.params.uid, image: image.uri})
                            }}
                       /> 
                       </View>
                    ) : (
                    <View style={styles.container}>
                        <CameraView
                            ref={(ref) => setCamera(ref)}
                            style={styles.camera}
                            type={type}
                        >  
                            <View style={styles.BotoesCamera}>
                                <Pressble onPress={() => {switchCamera()}}>
                                    <Image source={require('../assets/changeCamera.png')} resizeMode="contain" />
                                </Pressble>  
                                <Pressble onPress= {() =>{takePicture()}}>
                                    <Image source={require('../assets/camera.png')} resizeMode ="contain"/>
                                </Pressble>
                            </View>
                        </CameraView>
                    </View>
                    )}
                </View>
            )}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    }
})

export default TelaCamera 