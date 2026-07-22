
import React from "react";

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";


export default function InterventionDetailsManager({

    intervention,
    onBack

}: any) {



    if (!intervention) {

        return (

            <View style={styles.empty}>

                <Text>
                    Sélectionnez une intervention
                </Text>

            </View>

        );

    }





    const getStatusLabel = (status:string)=>{

        switch(status){

            case "TODO":
                return "À faire";


            case "IN_PROGRESS":
                return "En cours";


            case "DONE":
                return "Terminée";


            default:
                return status;

        }

    };






    const getStatusStyle = (status:string)=>{

        switch(status){


            case "DONE":

                return {

                    backgroundColor:"#dcfce7",
                    color:"#15803d"

                };



            case "IN_PROGRESS":

                return {

                    backgroundColor:"#fed7aa",
                    color:"#ea580c"

                };



            case "TODO":

                return {

                    backgroundColor:"#dbeafe",
                    color:"#2563eb"

                };



            default:

                return {

                    backgroundColor:"#e5e7eb",
                    color:"#374151"

                };

        }

    };





    const formatDate = (date:string)=>{

        if(!date){

            return "Non renseigné";

        }


        const d = new Date(date);


        return d.toLocaleString("fr-FR",{

            day:"2-digit",
            month:"2-digit",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit"

        });

    };






    const status = getStatusStyle(
        intervention.status
    );






    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom:20
            }}
        >





            {/* RETOUR */}

            <TouchableOpacity

                style={styles.backButton}

                onPress={onBack}

            >

                <Text style={styles.backText}>

                    ← Retour à la liste

                </Text>

            </TouchableOpacity>







            {/* TITRE */}

            <Text style={styles.title}>

                {intervention.title}

            </Text>







            {/* STATUT */}

            <View

                style={[

                    styles.badge,

                    {
                        backgroundColor:
                        status.backgroundColor
                    }

                ]}

            >

                <Text

                    style={{

                        color:status.color,

                        fontWeight:"700"

                    }}

                >

                    {getStatusLabel(
                        intervention.status
                    )}

                </Text>


            </View>









            {/* CLIENT */}

            <View style={styles.card}>


                <Text style={styles.section}>

                    Informations client

                </Text>




                <Text style={styles.text}>

                    👤 Nom :

                    {" "}

                    {intervention.clientName}

                </Text>





                <Text style={styles.text}>

                    📞 Téléphone :

                    {" "}

                    {
                    intervention.clientPhone
                    ||
                    "Non renseigné"
                    }

                </Text>





                <Text style={styles.text}>

                    📍 Adresse :

                    {" "}

                    {intervention.clientAddress}

                </Text>



            </View>









            {/* TECHNICIEN */}

            <View style={styles.card}>


                <Text style={styles.section}>

                    Technicien affecté

                </Text>




                <Text style={styles.text}>

                    👨‍🔧

                    {" "}

                    {

                    intervention.technician

                    ?

                    `${intervention.technician.firstName} ${intervention.technician.lastName}`

                    :

                    "Non affecté"

                    }

                </Text>


            </View>









            {/* DESCRIPTION */}

            <View style={styles.card}>


                <Text style={styles.section}>

                    Description intervention

                </Text>




                <Text style={styles.text}>

                    {

                    intervention.description

                    ||

                    "Aucune description"

                    }


                </Text>


            </View>









            {/* DATES */}

            <View style={styles.card}>


                <Text style={styles.section}>

                    Informations techniques

                </Text>





                <Text style={styles.text}>

                    📅 Début :

                    {" "}

                    {
                    formatDate(
                        intervention.startDate
                    )
                    }

                </Text>





                <Text style={styles.text}>

                    📅 Fin :

                    {" "}

                    {
                    formatDate(
                        intervention.endDate
                    )
                    }

                </Text>



            </View>









            {/* RAPPORT */}

            <View style={styles.card}>


                <Text style={styles.section}>

                    📝 Rapport technicien

                </Text>




                <Text style={styles.text}>

                    {

                    intervention.report

                    ||

                    "Aucun rapport envoyé"

                    }


                </Text>



            </View>









          {/* PIECES JOINTES */}

<View style={styles.card}>


    <Text style={styles.section}>

        📷 Photos / Pièces jointes

    </Text>



    {
        intervention.attachments
        &&
        intervention.attachments.length > 0


        ?

        intervention.attachments.map(
            (file:any)=>(


            <View

                key={file.id}

                style={styles.attachment}

            >



                {
                    file.fileType?.startsWith("image")

                    ?


                    <Image

                        source={{
                            uri:file.fileUrl
                        }}

                        style={styles.image}

                        resizeMode="cover"

                    />


                    :


                    <Text style={styles.text}>

                        📎 {file.originalFileName}

                    </Text>


                }





                <Text style={styles.text}>

                    Nom fichier :
                    {" "}
                    {file.originalFileName}

                </Text>



                <Text style={styles.text}>

                    Date :
                    {" "}
                    {
                    formatDate(
                        file.uploadedAt
                    )
                    }

                </Text>



            </View>


        ))



        :



        <Text style={styles.text}>

            Aucune pièce jointe

        </Text>


    }


</View>





        </ScrollView>

    );

}









const styles = StyleSheet.create({


    container:{

        flex:1,

        padding:15,

        backgroundColor:"#f8fafc"

    },



    empty:{

        flex:1,

        justifyContent:"center",

        alignItems:"center"

    },



    backButton:{

        backgroundColor:"#e2e8f0",

        padding:10,

        borderRadius:8,

        alignSelf:"flex-start",

        marginBottom:15

    },



    backText:{

        color:"#2563eb",

        fontWeight:"700"

    },



    title:{

        fontSize:22,

        fontWeight:"800",

        marginBottom:10

    },



    badge:{

        alignSelf:"flex-start",

        paddingHorizontal:15,

        paddingVertical:6,

        borderRadius:20,

        marginBottom:15

    },



    card:{

        backgroundColor:"white",

        padding:15,

        borderRadius:12,

        marginBottom:12,

        elevation:3

    },



    section:{

        fontSize:16,

        fontWeight:"700",

        marginBottom:10

    },



    text:{

        marginBottom:7,

        color:"#475569"

    },



    attachment:{

        marginBottom:15

    },



    image:{

        width:"100%",

        height:200,

        borderRadius:10,

        marginBottom:8

    }


});