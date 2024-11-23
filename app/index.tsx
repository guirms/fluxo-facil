import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import PlaceholderImage from '@/assets/images/logo.png';

const firebaseConfig = {
  apiKey: "AIzaSyBtauHnyAIhoDnD8wSpEdvVqTxYjSYIQaU",
  authDomain: "fluxofacil-8ce9f.firebaseapp.com",
  projectId: "fluxofacil-8ce9f",
  storageBucket: "fluxofacil-8ce9f.appspot.com",
  messagingSenderId: "104607617721",
  appId: "1:104607617721:web:ada9a7c5656d80dc888168"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function IndexScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      Alert.alert('Login Bem-sucedido', `Bem-vindo, ${user.email}!`);
      router.push('/about');
    } catch (error) {
      const errorMessage = (error as Error).message;

      console.error('Erro ao fazer login:', errorMessage);
      Alert.alert('Erro de Login', 'Usuário ou senha incorretos!');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={PlaceholderImage} style={styles.logo} />

      <Text style={styles.mainText}>Seus gastos sob controle, sua vida mais tranquila.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7f7f7f"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#7f7f7f"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.forgotText}>
        Esqueceu seu usuário ou senha?{' '}
        <Text style={styles.clickableText}>Clique aqui!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  mainText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  clickableText: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});
