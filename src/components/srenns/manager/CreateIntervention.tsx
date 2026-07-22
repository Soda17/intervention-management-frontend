import api from "@/api/axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { Picker } from "@react-native-picker/picker";


interface Technician {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}


export default function CreateIntervention() {


    const [technicians, setTechnicians] = useState<Technician[]>([]);

    const [selectedTechnicianId, setSelectedTechnicianId] =
        useState<number | null>(null);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientAddress, setClientAddress] = useState("");


    const [loadingTech, setLoadingTech] = useState(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        loadTechnicians();

    }, []);




    const loadTechnicians = async () => {

        try {

            setLoadingTech(true);


            const response = await api.get(
                "/users/technicians"
            );


            setTechnicians(response.data);


        } catch (error) {


            console.log(
                "Erreur récupération techniciens",
                error
            );


            Alert.alert(
                "Erreur",
                "Impossible de charger les techniciens"
            );


        } finally {

            setLoadingTech(false);

        }

    };





    const handleCreate = async () => {


        if (
            !title ||
            !clientName ||
            !selectedTechnicianId
        ) {

            Alert.alert(
                "Champs obligatoires",
                "Veuillez remplir le titre, le client et choisir un technicien"
            );

            return;

        }



        const intervention = {


            title,

            description,

            clientName,

            clientPhone,

            clientAddress,


            technicianId:selectedTechnicianId

        };



        try {


            setLoading(true);


            await api.post(
                "/interventions/create",
                intervention
            );



            Alert.alert(
                "Succès",
                "Intervention créée avec succès"
            );



            setTitle("");
            setDescription("");
            setClientName("");
            setClientPhone("");
            setClientAddress("");
            setSelectedTechnicianId(null);



        } catch(error:any){


            console.log(
                "Erreur création intervention",
                error.response?.data
            );


            Alert.alert(
                "Erreur",
                error.response?.data?.message ||
                "Erreur lors de la création"
            );


        } finally {


            setLoading(false);

        }

    };





    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >


            <Text style={styles.title}>
                Créer une intervention 📋
            </Text>



            <Text style={styles.label}>
                Titre *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ex: Maintenance machine"
                value={title}
                onChangeText={setTitle}
            />



            <Text style={styles.label}>
                Description
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.textArea
                ]}
                multiline
                placeholder="Description de l'intervention"
                value={description}
                onChangeText={setDescription}
            />



            <Text style={styles.label}>
                Client *
            </Text>


            <TextInput
                style={styles.input}
                placeholder="Nom du client"
                value={clientName}
                onChangeText={setClientName}
            />



            <Text style={styles.label}>
                Téléphone
            </Text>


            <TextInput
                style={styles.input}
                placeholder="06xxxxxxxx"
                keyboardType="phone-pad"
                value={clientPhone}
                onChangeText={setClientPhone}
            />



            <Text style={styles.label}>
                Adresse
            </Text>


            <TextInput
                style={styles.input}
                placeholder="Adresse client"
                value={clientAddress}
                onChangeText={setClientAddress}
            />





            <Text style={styles.label}>
                Technicien *
            </Text>



            {
                loadingTech ?

                <ActivityIndicator />

                :

                <View style={styles.pickerContainer}>


                    <Picker

                        selectedValue={selectedTechnicianId}

                        onValueChange={(value)=>{

                            setSelectedTechnicianId(
                                value
                            );

                        }}

                    >


                        <Picker.Item

                            label="-- Choisir un technicien --"

                            value={null}

                        />



                        {
                            technicians.map((tech)=>(


                                <Picker.Item

                                    key={tech.id}

                                    label={
                                        `${tech.firstName} ${tech.lastName}`
                                    }

                                    value={tech.id}

                                />


                            ))
                        }



                    </Picker>


                </View>

            }




            <TouchableOpacity

                style={styles.button}

                onPress={handleCreate}

                disabled={loading}

            >


                {

                    loading ?

                    <ActivityIndicator color="white"/>

                    :

                    <Text style={styles.buttonText}>
                        Créer l'intervention
                    </Text>

                }


            </TouchableOpacity>




        </ScrollView>

    );

}






const styles = StyleSheet.create({


    container:{
        flex:1
    },


    content:{
        padding:20
    },


    title:{
        fontSize:22,
        fontWeight:"700",
        marginBottom:20
    },


    label:{
        fontWeight:"600",
        marginBottom:6,
        marginTop:12
    },


    input:{
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"#e2e8f0",
        borderRadius:8,
        padding:12
    },


    textArea:{
        height:100,
        textAlignVertical:"top"
    },


    pickerContainer:{
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"#e2e8f0",
        borderRadius:8,
        overflow:"hidden"
    },


    button:{
        backgroundColor:"#2563eb",
        padding:15,
        borderRadius:8,
        alignItems:"center",
        marginTop:25
    },


    buttonText:{
        color:"white",
        fontWeight:"700"
    }


});