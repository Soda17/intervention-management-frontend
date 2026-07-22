import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Fonction de validation et de soumission basique
  const handleLogin = async () => {
    // Nettoyage de l'email pour enlever les espaces accidentels du clavier mobile
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      Alert.alert('Champs requis', 'Veuillez remplir votre email et votre mot de passe.');
      return;
    }

    setLoading(true);
    try {
      // Appel direct à notre fonction du AuthContext
      await login({ email: cleanEmail, password: password });
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      const msg = error.response?.data?.message || 'Identifiants incorrects ou serveur inaccessible.';
      Alert.alert('Échec de la connexion', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>GMAO Mobile ⚙️</Text>
        <Text style={styles.subtitle}>Espace de Connexion d'Entreprise</Text>

        <Text style={styles.label}>Adresse Email</Text>
        <TextInput
          style={styles.input}
          placeholder="exemple@gmao.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Se connecter au système</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f5f7fb' 
  },
  card: { 
    backgroundColor: '#ffffff', 
    padding: 24, 
    borderRadius: 16, 
    width: '100%', 
    maxWidth: 400, 
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#0f172a', 
    textAlign: 'center',
    marginBottom: 4 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#64748b', 
    textAlign: 'center', 
    marginBottom: 32 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#334155', 
    marginBottom: 6 
  },
  input: { 
    backgroundColor: '#f8fafc', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 8, 
    fontSize: 15, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#cbd5e1', 
    color: '#1e293b' 
  },
  button: { 
    backgroundColor: '#2563eb', 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonDisabled: { 
    backgroundColor: '#93c5fd' 
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});
