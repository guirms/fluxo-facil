import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBtauHnyAIhoDnD8wSpEdvVqTxYjSYIQaU",
  authDomain: "fluxofacil-8ce9f.firebaseapp.com",
  projectId: "fluxofacil-8ce9f",
  storageBucket: "fluxofacil-8ce9f.appspot.com",
  messagingSenderId: "104607617721",
  appId: "1:104607617721:web:ada9a7c5656d80dc888168"
};


// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Certifique-se de que a imagem está localizada no caminho correto
const PlaceholderImage = require('@/assets/images/logo.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Login Bem-sucedido', `Bem-vindo, ${user.email}!`);
      router.push('/about'); // Redireciona para a próxima tela
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro de Login', 'Usuário ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem do Logo */}
      <Image source={PlaceholderImage} style={styles.logo} />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7f7f7f"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#7f7f7f"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.forgotText}>
        Esqueceu sua senha?{' '}
        <Text style={styles.clickableText} onPress={() => Alert.alert('Recuperação de senha', 'Funcionalidade em breve!')}>
          Clique aqui
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
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