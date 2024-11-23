import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

const userData = {
  name: "João Vitor",
  months: [
    {
      name: "Julho",
      balance: 2706.5,
      predictedBalance: 1024.0,
      expenses: [
        { name: "Mercado", amount: 543.5 },
        { name: "Transporte", amount: 200.0 },
        { name: "Café", amount: 100.0 },
      ],
      incomes: [
        { name: "Salário", amount: 3000.0 },
        { name: "Freelance", amount: 250.0 },
      ],
      planning: [
        { category: "Educação", percentage: 90, spent: 450.0 },
        { category: "Lazer", percentage: 50, spent: 275.0 },
        { category: "Alimentação", percentage: 80, spent: 105.5 },
      ],
      chartData: [50, 100, 150, 200, 250, 300, 400],
    },
    {
      name: "Agosto",
      balance: 3200.0,
      predictedBalance: 800.0,
      expenses: [
        { name: "Aluguel", amount: 1000.0 },
        { name: "Lazer", amount: 500.0 },
        { name: "Supermercado", amount: 600.0 },
      ],
      incomes: [
        { name: "Salário", amount: 3500.0 },
        { name: "Investimento", amount: 700.0 },
      ],
      planning: [
        { category: "Educação", percentage: 80, spent: 400.0 },
        { category: "Lazer", percentage: 60, spent: 300.0 },
        { category: "Alimentação", percentage: 70, spent: 700.0 },
      ],
      chartData: [60, 120, 180, 240, 300, 360, 420],
    },
  ],
};

export default function HomeScreen() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const currentMonth = userData.months[currentMonthIndex];
  const screenWidth = Dimensions.get("window").width;

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    } else if (
      direction === "next" &&
      currentMonthIndex < userData.months.length - 1
    ) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

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
          <TouchableOpacity>
            <Text style={styles.icon}>👁</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceSection}>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={() => handleMonthChange("prev")}>
              <Text style={styles.arrow}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.month}>{currentMonth.name}</Text>
            <TouchableOpacity onPress={() => handleMonthChange("next")}>
              <Text style={styles.arrow}>{">"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.balanceInfo}>
            <View style={styles.balanceItem}>
              <Text style={styles.balance}>
                R$ {currentMonth.balance.toFixed(2)}
              </Text>
              <Text style={styles.balanceLabel}>Saldo atual</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balance}>
                R$ {currentMonth.predictedBalance.toFixed(2)}
              </Text>
              <Text style={styles.balanceLabel}>Saldo previsto</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AntDesign name="downcircleo" size={24} color="red" />
              <Text style={styles.cardTitleLoss}>Despesas</Text>
            </View>

            <Text style={styles.totalExpense}>
              R${" "}
              {currentMonth.expenses
                .reduce((acc, expense) => acc + expense.amount, 0)
                .toFixed(2)}
            </Text>

            {currentMonth.expenses.slice(0, 5).map((expense, index) => (
              <View key={index} style={styles.cardRow}>
                <Text style={styles.expenseBullet}>•</Text>
                <Text style={styles.expenseValue}>
                  R$ {expense.amount.toFixed(2)}
                </Text>
                <Text style={styles.cardDescription}>{expense.name}</Text>
              </View>
            ))}

            {currentMonth.expenses.length > 5 && (
              <TouchableOpacity>
                <Text style={styles.moreButton}>mais...</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AntDesign name="upcircleo" size={24} color="green" />
              <Text style={styles.cardTitleIncome}>Receitas</Text>
            </View>

            <Text style={styles.totalIncome}>
              R${" "}
              {currentMonth.incomes
                .reduce((acc, income) => acc + income.amount, 0)
                .toFixed(2)}
            </Text>

            {currentMonth.incomes.slice(0, 5).map((income, index) => (
              <View key={index} style={styles.cardRow}>
                <Text style={styles.incomeBullet}>•</Text>
                <Text style={styles.incomeValue}>
                  R$ {income.amount.toFixed(2)}
                </Text>
                <Text style={styles.cardDescription}>{income.name}</Text>
              </View>
            ))}

            {currentMonth.incomes.length > 5 && (
              <TouchableOpacity>
                <Text style={styles.moreButton}>mais...</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Planning Section */}
        <View style={styles.planningSection}>
          <Text style={styles.sectionTitle}>Planejamento</Text>
          {currentMonth.planning.map((item, index) => (
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
                  data: currentMonth.chartData,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                },
              ],
            }}
            width={screenWidth - 20}
            height={200}
            yAxisLabel="R$"
            chartConfig={{
              backgroundColor: "#25292e",
              backgroundGradientFrom: "#25292e",
              backgroundGradientTo: "#1c1f26",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
  header: { backgroundColor: "#1c1f26", padding: 10 },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  actions: { flexDirection: "row", position: "absolute", right: 10, top: 10 },
  icon: { color: "#fff", fontSize: 20, marginLeft: 15 },
  balanceSection: { alignItems: "center" },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  arrow: { color: "#fff", fontSize: 24, marginHorizontal: 15 },
  month: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  balanceInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  balanceItem: { alignItems: "center", flex: 1 },
  balance: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  balanceLabel: { color: "#aaa", fontSize: 14 },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#25292e",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitleLoss: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cardItem: {
    flexDirection: "row", // Coloca o valor e a descrição na mesma linha
    justifyContent: "space-between", // Espaço entre o valor e a descrição
    alignItems: "center", // Alinha verticalmente os itens
    color: "#aaa", // Cor padrão para o texto
    fontSize: 14, // Tamanho da fonte
    marginBottom: 2, // Espaço entre os itens
  },
  cardTitleIncome: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  totalExpense: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalIncome: {
    color: "green",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  expenseBullet: {
    color: "red",
    fontSize: 14,
    marginRight: 5,
  },
  expenseValue: {
    color: "red",
    fontSize: 12,
    marginRight: 10,
  },
  incomeValue: {
    color: "green",
    fontSize: 12,
    marginRight: 10,
  },
  incomeBullet: {
    color: "green",
    fontSize: 14,
    marginRight: 5,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 14,
    flexShrink: 1,
  },
  moreButton: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
    textAlign: "right",
    fontStyle: "italic",
  },
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
