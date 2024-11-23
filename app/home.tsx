import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const userData = {
  name: "João Vitor",
  month: "Julho",
  balance: 2706.5,
  predictedBalance: 1024.0,
  expenses: [
    { name: "Mercado", amount: 53.3 },
    { name: "Janta", amount: 100.0 },
    { name: "Jaqueta", amount: 105.05 },
    { name: "Café na cantina", amount: 75.0 },
  ],
  incomes: [
    { name: "Pais", amount: 2500.0 },
    { name: "Salário", amount: 750.0 },
  ],
  planning: [
    { category: "Educação", percentage: 90, spent: 450.0 },
    { category: "Lazer", percentage: 50, spent: 275.0 },
    { category: "Alimentação", percentage: 80, spent: 105.5 },
  ],
  shop: {
    items: [
      { name: "Item 1", cost: 1000 },
      { name: "Item 2", cost: 1500 },
      { name: "Item 3", cost: 3000 },
    ],
  },
};

export default function HomeScreen() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{userData.name}</Text>
        </View>

        <View style={styles.actions}>
          <Text style={styles.icon}>👁</Text>
          <Text style={styles.icon}>⚙️</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.month}>{userData.month}</Text>
          <Text style={styles.balance}>R$ {userData.balance.toFixed(2)}</Text>
          <Text style={styles.predictedBalance}>
            Saldo previsto: R$ {userData.predictedBalance.toFixed(2)}
          </Text>
        </View>

        {/* Expenses and Incomes */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Despesas</Text>
            <Text style={styles.expenses}>
              R${" "}
              {userData.expenses
                .reduce((acc, item) => acc + item.amount, 0)
                .toFixed(2)}
            </Text>
            {userData.expenses.map((expense, index) => (
              <Text key={index} style={styles.cardItem}>
                {expense.name}: R$ {expense.amount.toFixed(2)}
              </Text>
            ))}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Receitas</Text>
            <Text style={styles.incomes}>
              R${" "}
              {userData.incomes
                .reduce((acc, item) => acc + item.amount, 0)
                .toFixed(2)}
            </Text>
            {userData.incomes.map((income, index) => (
              <Text key={index} style={styles.cardItem}>
                {income.name}: R$ {income.amount.toFixed(2)}
              </Text>
            ))}
          </View>
        </View>

        {/* Planning Section */}
        <View style={styles.planningSection}>
          <Text style={styles.sectionTitle}>Planejamento</Text>
          {userData.planning.map((item, index) => (
            <View key={index} style={styles.planningItem}>
              <Text style={styles.planningCategory}>{item.category}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, { width: `${item.percentage}%` }]}
                />
              </View>
              <Text style={styles.planningText}>
                R$ {item.spent.toFixed(2)} ({item.percentage}%)
              </Text>
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Despesas</Text>
          <LineChart
            data={{
              labels: ["0", "2", "4", "6", "8", "10", "12", "14"],
              datasets: [
                {
                  data: [20, 50, 90, 150, 120, 130, 140],
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                },
              ],
            }}
            width={screenWidth - 20}
            height={200}
            yAxisLabel="R$"
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#25292e",
              backgroundGradientFrom: "#25292e",
              backgroundGradientTo: "#1c1f26",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{ marginVertical: 10, borderRadius: 16 }}
          />
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1f26" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  actions: { flexDirection: "row", alignItems: "center" },
  icon: { color: "#fff", fontSize: 24, marginHorizontal: 5 },
  scrollContainer: { flex: 1, paddingHorizontal: 10 },
  balanceSection: { alignItems: "center", marginBottom: 20 },
  month: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  balance: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  predictedBalance: { color: "#aaa", fontSize: 16 },
  cardsContainer: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    flex: 1,
    backgroundColor: "#25292e",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  expenses: { color: "#f00", fontSize: 18 },
  incomes: { color: "#0f0", fontSize: 18 },
  cardItem: { color: "#ccc", fontSize: 14 },
  planningSection: { marginVertical: 20 },
  planningItem: { marginBottom: 10 },
  planningCategory: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  progressBar: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: { height: "100%", backgroundColor: "#1e90ff" },
  planningText: { color: "#aaa", fontSize: 14 },
  chartSection: { marginVertical: 20 },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1e90ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});
