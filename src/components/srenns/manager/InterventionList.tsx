import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import api from "@/api/axios";


interface Props {
  onSelect: (item: any) => void;
}


export default function InterventionList({
  onSelect
}: Props) {


  const [interventions, setInterventions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    loadInterventions();
  }, []);



  const loadInterventions = async () => {

    try {

      const response = await api.get("/interventions");

      setInterventions(response.data);


    } catch (error) {

      console.log(error);


    } finally {

      setLoading(false);

    }

  };





  const getStatusLabel = (status: string) => {

    switch (status) {

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





  const getStatusStyle = (status: string) => {

    switch (status) {


      case "DONE":

        return {

          backgroundColor: "#dcfce7",
          color: "#15803d"

        };



      case "IN_PROGRESS":

        return {

          backgroundColor: "#fed7aa",
          color: "#ea580c"

        };



      case "TODO":

        return {

          backgroundColor: "#dbeafe",
          color: "#2563eb"

        };



      default:

        return {

          backgroundColor: "#e5e7eb",
          color: "#374151"

        };

    }

  };






  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator size="large" />

      </View>

    );

  }






  return (


    <View style={styles.container}>


      <Text style={styles.title}>
        Suivi des interventions
      </Text>





      <FlatList


        data={interventions}


        keyExtractor={(item) => item.id.toString()}




        renderItem={({ item }) => {


          const badge = getStatusStyle(item.status);



          return (


            <TouchableOpacity


              style={styles.card}


              activeOpacity={0.7}


              onPress={() => onSelect(item)}


            >



              <Text style={styles.itemTitle}>
                {item.title}
              </Text>




              <Text>
                Client : {item.clientName}
              </Text>




              <Text>
                Adresse : {item.clientAddress}
              </Text>




              <Text>

                Technicien :

                {" "}

                {

                  item.technician

                    ?

                    `${item.technician.firstName} ${item.technician.lastName}`

                    :

                    "Non affecté"

                }

              </Text>





              <View

                style={[

                  styles.badge,

                  {

                    backgroundColor: badge.backgroundColor

                  }

                ]}

              >



                <Text

                  style={{

                    color: badge.color,

                    fontWeight: "700"

                  }}

                >

                  {getStatusLabel(item.status)}

                </Text>



              </View>



            </TouchableOpacity>



          );


        }}



      />



    </View>


  );


}







const styles = StyleSheet.create({


  container: {

    flex: 1,

    padding: 15

  },



  center: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center"

  },



  title: {

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 15

  },



  card: {

    backgroundColor: "white",

    padding: 15,

    marginBottom: 12,

    borderRadius: 12,

    elevation: 3

  },



  itemTitle: {

    fontSize: 17,

    fontWeight: "700",

    marginBottom: 8

  },



  badge: {

    alignSelf: "flex-start",

    marginTop: 12,

    paddingHorizontal: 12,

    paddingVertical: 5,

    borderRadius: 20

  }


});