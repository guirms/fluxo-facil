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
import AntDesign from "@expo/vector-icons/AntDesign";
import personImage from "@/assets/images/person.png";

const financeData: FinanceData = {
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
        {
          category: "Educação",
          percentage: 90,
          fillColor: "#FD764C",
          spent: 450.0,
        },
        {
          category: "Lazer",
          percentage: 50,
          fillColor: "#FD4C4C",
          spent: 275.0,
        },
        {
          category: "Alimentação",
          percentage: 80,
          fillColor: "#4C88FD",
          spent: 105.5,
        },
      ],
      chartData: [
        { day: "1", expense: 50 },
        { day: "5", expense: 100 },
        { day: "10", expense: 150 },
        { day: "15", expense: 200 },
        { day: "20", expense: 250 },
        { day: "25", expense: 300 },
        { day: "30", expense: 400 },
      ],
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
        {
          category: "Educação",
          percentage: 80,
          fillColor: "#FD764C",
          spent: 400.0,
        },
        {
          category: "Lazer",
          percentage: 60,
          fillColor: "#FD4C4C",
          spent: 300.0,
        },
        {
          category: "Alimentação",
          percentage: 70,
          fillColor: "#4C88FD",
          spent: 700.0,
        },
      ],
      chartData: [
        { day: "1", expense: 60 },
        { day: "5", expense: 120 },
        { day: "10", expense: 180 },
        { day: "15", expense: 240 },
        { day: "20", expense: 300 },
        { day: "25", expense: 360 },
        { day: "30", expense: 420 }
      ],
    },
  ],
};

export default function HomeScreen() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const currentMonth = financeData.months[currentMonthIndex];
  const screenWidth = Dimensions.get("window").width;

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    } else if (
      direction === "next" &&
      currentMonthIndex < financeData.months.length - 1
    ) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={personImage} style={styles.avatar} />
          <Text style={styles.userName}>{financeData.name}</Text>
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

      {/* Reserves and income */}

      <View style={styles.scrollContainer}>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AntDesign name="downcircleo" size={24} color="#E83F5B" />
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
              <AntDesign name="upcircleo" size={24} color="#12A454" />
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

        {/* Planning */}
        <View style={styles.planningSection}>
          <Text style={styles.sectionTitle}>Planejamento</Text>
          {currentMonth.planning.map((item, index) => (
            <View key={index} style={styles.planningItem}>
              <Text style={styles.planningCategory}>{item.category}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${item.percentage}%`,
                      backgroundColor: `${item.fillColor}`,
                    },
                  ]}
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
              labels: currentMonth.chartData.map((data) => data.day),
              datasets: [
                {
                  data: currentMonth.chartData.map((data) => data.expense),
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                },
              ],
            }}
            width={screenWidth - 20}
            height={200}
            yAxisLabel="R$"
            chartConfig={{
              backgroundGradientFrom: "#253031",
              backgroundGradientTo: "#253031",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                strokeWidth: 0,
              },
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
            }}
            style={{ 
              marginRight: 10
              }}
          />
        </View>
      </View>

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
    backgroundColor: "#2E3C3D",
    padding: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  icon: { color: "#fff", fontSize: 20, marginLeft: 15 },
  balanceSection: { alignItems: "center" },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  arrow: { color: "#fff", fontSize: 18, marginHorizontal: 25 },
  month: { color: "#fff", fontSize: 25 },
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
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#253031",
    borderRadius: 10,
    padding: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitleLoss: {
    color: "#E83F5B",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#aaa",
    fontSize: 14,
    marginBottom: 2,
  },
  cardTitleIncome: {
    color: "#12A454",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  totalExpense: {
    color: "#E83F5B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalIncome: {
    color: "#12A454",
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
    color: "#E83F5B",
    fontSize: 14,
    marginRight: 5,
  },
  expenseValue: {
    color: "#E83F5B",
    fontSize: 12,
    marginRight: 10,
  },
  incomeValue: {
    color: "#12A454",
    fontSize: 12,
    marginRight: 10,
  },
  incomeBullet: {
    color: "#12A454",
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
  planningSection: {
    backgroundColor: "#253031",
    borderRadius: 15,
    padding: 10,
  },
  planningItem: { marginBottom: 10 },
  planningCategory: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  progressBar: {
    height: 18,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  planningText: { color: "#aaa", fontSize: 14 },
  chartSection: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#253031",
    borderRadius: 10,
  },
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
