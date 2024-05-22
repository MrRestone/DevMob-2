import React, {useState, usEffect} from 'react';
import { StyleSheet, Text, View, button, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import Header from '../Componentes/Header';

function TelaCamere({navigation, route}) {

    const [hasPermission, setHasPermission] = useState(null)
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.constants.type.back)

    useEffect(() => {
        (async () => {
            const{ status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted')
        }) ();
    },[route.params]);

    const takePicture = async () => {
        if(camera){
            const data = await camera.tekePictureAsync(null)
            setImage(data)
        }
    }
    const switcCamera = () => {
        setType(type === Camera.constants.Type.back ?
                                Camera.constants.Type.front : Camera.Constants.type.back
        )
    }
    if(!hasPermission){
        return(
            <View style={styles.container}>
                <Text>Permissão da câmera negado!</Text>
            </View>
        )
    }
    return (
        <View style={stylet.container}>
            <View style={styles.header}>
                    <Header showNav={false}/>
                </View>
                    {image ? (
                      <View style={styles.container2}>  
                        <Image source={{ uri: image.uri}} Style={styles.image}/>
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
                    <View style={styles.container2}>
                        <Camera
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
                        </Camera>
                    </View>
                    )}
                </View>
            )
} 
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

export default TelaCamere 