import React, { useState } from "react";

import {
    Alert,
    Button,
    Image,
    Text,
    View,
    StyleSheet
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import api from "@/api/axios";



export default function AttachmentScreen({
    intervention
}: any) {


    const [image, setImage] = useState<any>(null);



    const pickImage = async () => {


        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();



        if (!permission.granted) {

            Alert.alert(
                "Permission refusée",
                "Autorisez l'accès aux photos"
            );

            return;
        }



        const result =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,

                quality:0.7

            });



        if (!result.canceled) {

            setImage(result.assets[0]);

        }

    };





    const uploadImage = async () => {


        if (!image) {

            Alert.alert(
                "Attention",
                "Veuillez choisir une photo"
            );

            return;

        }



        try {


            const formData = new FormData();



            formData.append(
                "files",
                {

                    uri: image.uri,

                    name:
                    image.fileName
                    ??
                    "photo.jpg",

                    type:
                    image.mimeType
                    ??
                    "image/jpeg"


                } as any
            );



            formData.append(
                "attachmentType",
                "PHOTO"
            );




            const response = await api.post(

                `/interventions/${intervention.id}/attachments`,

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            console.log(
                response.data
            );



            Alert.alert(
                "Succès",
                "Photo envoyée avec succès"
            );



            setImage(null);



        }catch(error:any){


            console.log(
                "Erreur upload :",
                error.response?.data
                ||
                error.message
            );


            Alert.alert(
                "Erreur",
                "Impossible d'envoyer la photo"
            );


        }


    };




    return (

        <View style={styles.container}>


            <Text style={styles.title}>
                Pièces jointes
            </Text>



            <Text>
                Intervention :
                {" "}
                {intervention?.title}
            </Text>



            {
                image &&

                <Image

                    source={{
                        uri:image.uri
                    }}

                    style={styles.image}

                />

            }



            <Button

                title="Choisir une photo"

                onPress={pickImage}

            />



            <View style={{height:20}} />



            <Button

                title="Envoyer"

                onPress={uploadImage}

            />



        </View>

    );

}




const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:20
    },


    title:{
        fontSize:22,
        fontWeight:"bold",
        marginBottom:15
    },


    image:{
        width:250,
        height:250,
        marginVertical:20
    }


});