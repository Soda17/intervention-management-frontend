import LoginScreen from '@/components/LoginScrenn';
import DashboardManager from '@/components/srenns/manager/DashboardManager';
import DashboardTechnician from '@/components/srenns/technician/DashboardTechnician';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Role } from '@/types';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// Navigation selon le rôle
function RootNavigator() {

  const { userRole, loading } = useAuth();

  console.log("ROLE ACTUEL :", userRole);
  console.log("LOADING :", loading);


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  if (userRole === null) {
    console.log("AFFICHAGE LOGIN");
    return <LoginScreen />;
  }


  if (userRole === Role.MANAGER) {
    
    return <DashboardManager />;
  }


  if (userRole === Role.TECHNICIAN) {
   
    return <DashboardTechnician />;
  }


  return <LoginScreen />;
}



// Export obligatoire
export default function App() {

  return (
    <SafeAreaProvider>

      <AuthProvider>

        <SafeAreaView style={styles.container}>

          <RootNavigator />

        </SafeAreaView>

      </AuthProvider>

    </SafeAreaProvider>
  );

}



const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor:'#f5f7fb'
  },

  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }

});