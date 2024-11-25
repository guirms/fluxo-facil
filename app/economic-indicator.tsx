import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

type Indicator = {
  name: string;
  value: string;
  variation: string;
};

type IndicatorsState = {
  usd: Indicator;
  eur: Indicator;
} | null;

export default function EconomicIndicatorsScreen() {
  const [indicators, setIndicators] = useState<IndicatorsState>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Para navegação

  useEffect(() => {
    const fetchEconomicData = async () => {
      try {
        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL"
        );
        const data = await response.json();

        setIndicators({
          usd: {
            name: "Dólar (USD)",
            value: parseFloat(data.USDBRL.bid).toFixed(2),
            variation: parseFloat(data.USDBRL.pctChange).toFixed(2),
          },
          eur: {
            name: "Euro (EUR)",
            value: parseFloat(data.EURBRL.bid).toFixed(2),
            variation: parseFloat(data.EURBRL.pctChange).toFixed(2),
          },
        });
      } catch (error) {
        console.error("Erro ao buscar dados econômicos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicData();
  }, []);

  const goToHomeScreen = () => {
    router.push("/home"); // Redireciona para a tela inicial
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToHomeScreen}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Indicadores Econômicos</Text>
      </View>

      {/* Conteúdo principal */}
      <ScrollView style={styles.content}>
        {indicators &&
          Object.entries(indicators).map(([key, indicator]) => (
            <View key={key} style={styles.indicatorCard}>
              <Text style={styles.indicatorTitle}>{indicator.name}</Text>
              <Text style={styles.indicatorValue}>R$ {indicator.value}</Text>
              <Text
                style={[
                  styles.indicatorVariation,
                  parseFloat(indicator.variation) >= 0
                    ? styles.positiveVariation
                    : styles.negativeVariation,
                ]}
              >
                {indicator.variation}%{" "}
                {parseFloat(indicator.variation) >= 0 ? "↑" : "↓"}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1f26",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#2E3C3D",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1f26",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  indicatorCard: {
    backgroundColor: "#253031",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  indicatorTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  indicatorValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  indicatorVariation: {
    fontSize: 16,
    marginTop: 5,
  },
  positiveVariation: {
    color: "#12A454",
  },
  negativeVariation: {
    color: "#E83F5B",
  },
});
