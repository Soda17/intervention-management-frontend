import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import api from "@/api/axios";


export default function ReportScreen({
    intervention,
    onSuccess,
    onBack
}: any) {


    const [report, setReport] = useState("");

    const [loading, setLoading] = useState(false);



    const send = async () => {


        if (!report.trim()) {

            Alert.alert(
                "Attention",
                "Veuillez saisir un rapport technique"
            );

            return;
        }



        try {


            setLoading(true);



            await api.post(

                `/interventions/${intervention.id}/close`,

                {
                    interventionCompleted: true,

                    endDate: new Date().toISOString().slice(0,19),
                    report: report.trim()
                }

            );



            Alert.alert(
                "Succès",
                "Intervention clôturée avec succès"
            );



            setReport("");



            if(onSuccess){

                onSuccess();

            }



        } catch(error:any){


            console.log(
                "Erreur clôture :",
                error.response?.data || error.message
            );


            Alert.alert(
                "Erreur",
                "Impossible de clôturer l'intervention"
            );



        } finally {


            setLoading(false);


        }


    };





    if(!intervention){


        return (

            <View style={styles.container}>

                <Text style={styles.empty}>
                    Aucune intervention sélectionnée
                </Text>


            </View>

        );

    }






    return (

        <View style={styles.container}>


            <Text style={styles.title}>
                Rapport technique 📝
            </Text>




            <Text style={styles.intervention}>
                Intervention :
                {" "}
                {intervention.title}
            </Text>





            <TextInput

                style={styles.input}

                placeholder="Décrire le travail effectué..."

                multiline

                numberOfLines={8}

                value={report}

                onChangeText={setReport}

            />





            {
                loading ?


                <ActivityIndicator size="large"/>


                :


                <Button

                    title="Terminer intervention"

                    onPress={send}

                />


            }



            {
                onBack &&

                <View style={{marginTop:15}}>

                    <Button

                        title="Retour"

                        onPress={onBack}

                    />

                </View>

            }




        </View>

    );

}






const styles = StyleSheet.create({


    container:{

        flex:1,

        padding:20,

        backgroundColor:"#fff"

    },



    title:{

        fontSize:22,

        fontWeight:"bold",

        marginBottom:15

    },



    intervention:{

        marginBottom:20,

        color:"#475569"

    },



    input:{

        borderWidth:1,

        borderColor:"#cbd5e1",

        borderRadius:10,

        padding:15,

        height:180,

        textAlignVertical:"top",

        marginBottom:20

    },



    empty:{

        textAlign:"center",

        marginTop:40,

        color:"#64748b"

    }


});