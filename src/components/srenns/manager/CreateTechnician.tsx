import api from "@/api/axios";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";



export default function CreateTechnician() {
    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleCreateTechnician = async () => {

    if (!firstName || !lastName || !email || !password) {
      Alert.alert(
        "Champs obligatoires",
        "Veuillez remplir tous les champs"
      );
      return;
    }


    try {

      setLoading(true);


      const data = {
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        password
      };


      console.log("Données envoyées :", data);


      await api.post(
        "/users/create-technician",
        data
      );


      Alert.alert(
        "Succès",
        "Technicien créé avec succès"
      );


      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");


    } catch(error:any){

      console.log(
        "Erreur création technicien :",
        error.response?.data || error.message
      );


      Alert.alert(
        "Erreur",
        error.response?.data?.message ||
        "Impossible de créer le technicien"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      <Text style={styles.title}>
        Ajouter un technicien 👷
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />


      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
      />


      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />


      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />



      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateTechnician}
        disabled={loading}
      >

        {
          loading ?
          <ActivityIndicator color="white" />
          :
          <Text style={styles.buttonText}>
            Créer le technicien
          </Text>
        }

      </TouchableOpacity>


    </ScrollView>

  );

}



const styles = StyleSheet.create({

  container:{
    padding:20,
    flexGrow:1,
  },


  title:{
    fontSize:22,
    fontWeight:"700",
    marginBottom:25,
    textAlign:"center"
  },


  input:{
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"#e2e8f0",
    borderRadius:8,
    padding:12,
    marginBottom:15
  },


  button:{
    backgroundColor:"#2563eb",
    padding:15,
    borderRadius:8,
    alignItems:"center",
    marginTop:10
  },


  buttonText:{
    color:"white",
    fontWeight:"700"
  }

});
  






  