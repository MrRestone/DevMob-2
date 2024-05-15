import React, {useState, usEffect} from 'react';
import { StyleSheet, Text, View, button, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
function TelaCamere({natigation, route}) {
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
        if(camere){
            const data = await camera.tekePictureAsync(null)
            setImage(data)
        }
    }
    return (
        <View style={styleSheet.container}>
            {hasPermission ? (
                <View style={styles.cameraContainer}>
                    {image ? (
                      <View style={styles.container}>  
                        <Image source={{ uri: image.uri}} Style={styles.image}/>
                        <Button
                            color='gray'
                            title="Tirar nova foto"
                            onPress={() => {
                             setImage(null)
                            }}
                        />    
                        <Button 
                        color='grey'
                        title="user essa foto"
                        onPress={() => {
                            navigation.navigate('addPost', {uid: route.params.uid, image: image.uri})
                            }}
                       /> 
                       </View>
                    ) : (
                        <Camera
                            ref={(ref) => setCamera(ref)}
                            style={styles.camera}
                            type={type}
                            ratio='1:1'
                        />    
                    )}
                    </View>
            ) : (
                <Text>Permissão da câmera negada!</Text>
            )}
            {!image &&(
                <View>
                    <Button
                        color='grey'
                        title="trcar Câmera"
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.type.front
                                : Camera.Constants.Type.back
                        );
                        }}
                    /> 
                    <Button title="Tirar Foto" onPress={() => takePicture()}/>   
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