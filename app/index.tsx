import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const PlaceholderImage = require('@/assets/images/logo.png');

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={PlaceholderImage} style={styles.logo} />

      {/* Texto principal */}
      <Text style={styles.mainText}>Seus gastos sob controle, sua vida mais tranquila.</Text>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="#7f7f7f"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7f7f7f"
        secureTextEntry
      />

      {/* Botão de login */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Link para recuperação de senha */}
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
    width: 100, // Ajuste conforme necessário
    height: 100, // Ajuste conforme necessário
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
