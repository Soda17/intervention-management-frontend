import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useAuth } from "@/context/AuthContext";

import AttachmentScreen from "./AttachementScreen";
import InterventionDetails from "./InterventionDetails";
import InterventionList from "./InterventionList";
import ReportScreen from "./ReportScreen";


type Tab =
  | "LIST"
  | "DETAILS"
  | "REPORT"
  | "ATTACHMENT";



export default function DashboardTechnician() {


  const { user, logout } = useAuth();


  const [activeTab, setActiveTab] = useState<Tab>("LIST");


  const [selectedIntervention, setSelectedIntervention] =
    useState<any>(null);




  const handleLogout = async () => {

    try {

      await logout();

    } catch (error) {

      console.log(
        "Erreur déconnexion :",
        error
      );

    }

  };







  const renderContent = () => {


    switch (activeTab) {



      case "LIST":

        return (

          <InterventionList

            onSelect={(item: any) => {

              setSelectedIntervention(item);

              setActiveTab("DETAILS");

            }}

          />

        );







     case "DETAILS":

    return selectedIntervention ? (

      <InterventionDetails

        intervention={selectedIntervention}


        onBack={() => {

          setSelectedIntervention(null);

          setActiveTab("LIST");

        }}


        onReport={() => {

          setActiveTab("REPORT");

        }}


        onAttachment={() => {

          setActiveTab("ATTACHMENT");

        }}

      />

  
        ) : (

          <Text style={styles.empty}>

            Sélectionnez une intervention

          </Text>

        );









      case "REPORT":

        return selectedIntervention ? (

          <ReportScreen

            intervention={selectedIntervention}


            onSuccess={() => {

              setSelectedIntervention(null);

              setActiveTab("LIST");

            }}


            onBack={() => {

              setActiveTab("DETAILS");

            }}

          />

        ) : (

          <Text style={styles.empty}>

            Aucune intervention sélectionnée

          </Text>

        );









      case "ATTACHMENT":

        return selectedIntervention ? (

          <AttachmentScreen

            intervention={selectedIntervention}

          />

        ) : (

          <Text style={styles.empty}>

            Aucune intervention sélectionnée

          </Text>

        );





      default:

        return null;


    }


  };







  return (

    <View style={styles.container}>



      {/* HEADER */}

      <View style={styles.header}>


        <View>

          <Text style={styles.title}>
            GMAO Technicien 🔧
          </Text>


          <Text style={styles.subtitle}>

            {user?.firstName}
            {" "}
            {user?.lastName}

          </Text>


        </View>





        <TouchableOpacity

          style={styles.logout}

          onPress={handleLogout}

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









      {/* MENU BAS */}

      <View style={styles.menu}>


        <TabButton

          title="Interventions"

          active={activeTab === "LIST"}

          onPress={() => {

            setActiveTab("LIST");

          }}

        />





        <TabButton

          title="Rapport"

          active={activeTab === "REPORT"}

          onPress={() => {

            setActiveTab("REPORT");

          }}

        />





        <TabButton

          title="Photos"

          active={activeTab === "ATTACHMENT"}

          onPress={() => {

            setActiveTab("ATTACHMENT");

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


}: {

  title: string;

  active: boolean;

  onPress: () => void;

}) {


  return (

    <TouchableOpacity

      style={[
        styles.button,
        active && styles.activeButton
      ]}

      onPress={onPress}

    >


      <Text

        style={[
          styles.buttonText,
          active && styles.activeText
        ]}

      >

        {title}

      </Text>


    </TouchableOpacity>


  );

}










const styles = StyleSheet.create({


  container: {

    flex: 1,

    backgroundColor: "#f8fafc"

  },



  header: {

    padding: 15,

    backgroundColor: "white",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderBottomWidth: 1,

    borderColor: "#e2e8f0"

  },



  title: {

    fontSize: 20,

    fontWeight: "700"

  },



  subtitle: {

    color: "#64748b",

    marginTop: 5

  },



  logout: {

    backgroundColor: "#fee2e2",

    padding: 10,

    borderRadius: 8

  },



  logoutText: {

    color: "#dc2626",

    fontWeight: "700"

  },



  content: {

    flex: 1

  },



  menu: {

    height: 65,

    flexDirection: "row",

    backgroundColor: "white",

    borderTopWidth: 1,

    borderColor: "#e2e8f0"

  },



  button: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center"

  },



  activeButton: {

    borderTopWidth: 3,

    borderColor: "#2563eb"

  },



  buttonText: {

    color: "#64748b",

    fontSize: 12

  },



  activeText: {

    color: "#2563eb",

    fontWeight: "700"

  },



  empty: {

    textAlign: "center",

    marginTop: 40,

    color: "#64748b"

  }


});