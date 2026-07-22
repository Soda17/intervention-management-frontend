import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


import CreateIntervention from './CreateIntervention';
import CreateTechnician from './CreateTechnician';
import InterventionDetails from './InterventionDetails';
import InterventionList from './InterventionList';




type Tab =
    | "CREATE_INTERVENTION"
    | "TRACK"
    | "CREATE_TECH";




export default function DashboardManager() {


    const { user, logout } = useAuth();


    const [activeTab, setActiveTab] =
        useState<Tab>("CREATE_INTERVENTION");


    const [selectedIntervention, setSelectedIntervention] =
        useState<any>(null);





    const renderContent = () => {


        switch(activeTab){


            case "CREATE_INTERVENTION":

                return (

                    <CreateIntervention />

                );





            case "TRACK":


                if(selectedIntervention){


                    return (

                        <InterventionDetails


                            intervention={
                                selectedIntervention
                            }


                            onBack={() => {

                                setSelectedIntervention(null);

                            }}


                        />

                    );


                }




                return (

                    <InterventionList


                        onSelect={(item)=>{

                            setSelectedIntervention(item);

                        }}


                    />

                );







            case "CREATE_TECH":


                return (

                    <CreateTechnician />

                );





            default:

                return null;

        }


    };






    const changeTab = (tab:Tab) => {


        setActiveTab(tab);



        if(tab !== "TRACK"){

            setSelectedIntervention(null);

        }


    };








    return (


        <View style={styles.container}>


            {/* HEADER */}

            <View style={styles.header}>


                <View>


                    <Text style={styles.title}>

                        GMAO Manager 🏢

                    </Text>



                    <Text style={styles.subtitle}>

                        {user?.firstName} {user?.lastName}

                    </Text>


                </View>





                <TouchableOpacity

                    style={styles.logout}

                    onPress={logout}

                >

                    <Text style={styles.logoutText}>

                        Déconnexion

                    </Text>


                </TouchableOpacity>



            </View>







            {/* CONTENU */}

            <View style={styles.content}>


                {renderContent()}


            </View>







            {/* MENU */}

            <View style={styles.menu}>


                <TabButton

                    title="Octroyer tâche"

                    active={
                        activeTab === "CREATE_INTERVENTION"
                    }

                    onPress={()=>{

                        changeTab(
                            "CREATE_INTERVENTION"
                        );

                    }}

                />





                <TabButton

                    title="Suivi parc"

                    active={
                        activeTab === "TRACK"
                    }

                    onPress={()=>{

                        changeTab(
                            "TRACK"
                        );

                    }}

                />





                <TabButton

                    title="Ajouter Tech"

                    active={
                        activeTab === "CREATE_TECH"
                    }

                    onPress={()=>{

                        changeTab(
                            "CREATE_TECH"
                        );

                    }}

                />



            </View>



        </View>


    );


}









function TabButton({

    title,
    active,
    onPress


}:{

    title:string;

    active:boolean;

    onPress:()=>void;


}){


    return (


        <TouchableOpacity


            style={[

                styles.tab,

                active && styles.activeTab

            ]}


            onPress={onPress}


        >



            <Text


                style={[

                    styles.tabText,

                    active && styles.activeText

                ]}


            >

                {title}


            </Text>



        </TouchableOpacity>


    );


}









const styles = StyleSheet.create({


    container:{

        flex:1,

        backgroundColor:"#f8fafc"

    },



    header:{

        flexDirection:"row",

        justifyContent:"space-between",

        alignItems:"center",

        padding:15,

        backgroundColor:"white",

        borderBottomWidth:1,

        borderColor:"#e2e8f0"

    },



    title:{

        fontSize:20,

        fontWeight:"700"

    },



    subtitle:{

        color:"#64748b",

        marginTop:4

    },



    logout:{

        backgroundColor:"#fee2e2",

        padding:10,

        borderRadius:8

    },



    logoutText:{

        color:"#dc2626",

        fontWeight:"600"

    },



    content:{

        flex:1

    },



    menu:{

        flexDirection:"row",

        backgroundColor:"white",

        height:65,

        borderTopWidth:1,

        borderColor:"#e2e8f0"

    },



    tab:{

        flex:1,

        justifyContent:"center",

        alignItems:"center"

    },



    activeTab:{

        borderTopWidth:3,

        borderColor:"#2563eb"

    },



    tabText:{

        color:"#64748b",

        fontSize:12

    },



    activeText:{

        color:"#2563eb",

        fontWeight:"700"

    }


});