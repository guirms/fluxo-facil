import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../infra/firebase";
import logoImage from "@/assets/images/logo.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert("Login Bem-sucedido", `Bem-vindo, ${user.email}!`);
      router.push("/home");
    } catch (error) {
      Alert.alert("Erro de Login", "Usuário ou senha incorretos.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.logoDescription}>
        Seus gastos sob controle, sua vida mais tranquila.
      </Text>

      <View style={styles.loginContainer}>
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
          Esqueceu sua senha?{" "}
          <Text
            style={styles.clickableText}
            onPress={() =>
              Alert.alert("Recuperação de senha", "Funcionalidade em breve!")
            }
          >
            Clique aqui
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171A21",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 10,
  },
  logoDescription: {
    color: "#fff",
    fontSize: 21,
    marginBottom: 60,
    width: "70%",
    textAlign: "center",
  },
  loginContainer: {
    justifyContent: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  clickableText: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});
