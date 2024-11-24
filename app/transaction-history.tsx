import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AddTransaction from "./add-transaction";
import HomeService from "@/services/home-service";
import { router, useLocalSearchParams } from "expo-router";

export default function TransactionsScreen() {
  const item = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(item.activeTab);
  const [modalVisible, setModalVisible] = useState(false);

  const currentMonth =
    HomeService.financeData.months[HomeService.currentMonthIndex];

  const goToHomeScreen = (): void => {
    router.push("/home");
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  if (!currentMonth) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum dado disponível.</Text>
      </View>
    );
  }

  const transactions =
    activeTab === "expenses" ? currentMonth.expenses : currentMonth.incomes;

  const groupedTransactions = transactions.reduce<
    Record<number, typeof transactions>
  >((groups, transaction) => {
    const date = new Date(transaction.date);
    const day = date.getDate();

    if (!groups[day]) {
      groups[day] = [];
    }

    groups[day].push(transaction);
    return groups;
  }, {});

  const sectionData = Object.keys(groupedTransactions)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => b - a)
    .map((day) => ({
      title: `Dia ${day}`,
      data: groupedTransactions[day],
    }));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goToHomeScreen()}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentMonth.name}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <FontAwesome6 name="plus" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "expenses" && styles.activeTab]}
          onPress={() => setActiveTab("expenses")}
        >
          <AntDesign name="downcircleo" size={24} color="#E83F5B" />
          <Text style={styles.tabText}>Despesas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "incomes" && styles.activeTab]}
          onPress={() => setActiveTab("incomes")}
        >
          <AntDesign name="upcircleo" size={24} color="#12A454" />
          <Text style={styles.tabText}>Receitas</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text style={styles.transactionDescription}>{item.name}</Text>
            <Text
              style={[
                styles.transactionAmount,
                activeTab === "expenses" ? styles.expense : styles.income,
              ]}
            >
              {formatCurrency(item.amount)}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />

      {/* Modal de Adicionar Transação */}
      <AddTransaction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1f26",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: '#27415699',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#1e90ff",
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: "column",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2e35",
  },
  transactionCategory: {
    color: "#fff",
    fontSize: 18,
  },
  transactionDescription: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    marginTop: 8,
    alignSelf: "flex-end",
  },
  expense: {
    color: "red",
  },
  income: {
    color: "green",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
  },
});
