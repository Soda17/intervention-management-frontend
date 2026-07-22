import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

interface InterventionListProps {
    onSelect: (item: any) => void;
}

export default function InterventionList({
    onSelect
}: InterventionListProps) {

    const { user } = useAuth();

    const [interventions, setInterventions] = useState<any[]>([]);


    useEffect(() => {
        loadInterventions();
    }, []);


    const loadInterventions = async () => {

        try {

            const response = await api.get(
                `/interventions/technician/${user?.id}`
            );

            setInterventions(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // Traduction des statuts
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


    // Style des badges selon le statut
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


    return (

        <FlatList

            data={interventions}

            keyExtractor={(item) => item.id.toString()}


            renderItem={({ item }) => {

                const badge = getStatusStyle(item.status);


                return (

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => onSelect(item)}
                    >


                        <Text style={styles.title}>
                            {item.title}
                        </Text>


                        <Text>
                            Client : {item.clientName}
                        </Text>


                        <Text>
                            Adresse : {item.clientAddress}
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

    );

}



const styles = StyleSheet.create({

    card: {
        backgroundColor: "white",
        margin: 10,
        padding: 15,
        borderRadius: 12,
        elevation: 3
    },


    title: {
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