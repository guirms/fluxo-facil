import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AddTransaction from "./add-transaction";
import HomeService from "@/services/home-service";
import { router, useLocalSearchParams } from "expo-router";

export default function TransactionsScreen() {
  const item = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(item.activeTab || "expenses");
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionsData, setTransactionsData] = useState(
    HomeService.financeData.months[HomeService.currentMonthIndex]
  );

  const refreshData = () => {
    setTransactionsData(
      HomeService.financeData.months[HomeService.currentMonthIndex]
    );
  };

  useEffect(() => {
    if (!modalVisible) {
      refreshData();
    }
  }, [modalVisible]);

  const handleAddTransaction = (newTransaction: any) => {
    refreshData();
  };

  const handleDeleteTransaction = (transaction: any) => {
    const transactionType = activeTab === "expenses" ? "expenses" : "incomes";

    // Remove a transação do tipo correto
    const updatedTransactions = transactionsData[transactionType].filter(
      (t) =>
        t.description !== transaction.description || t.date !== transaction.date
    );

    // Atualiza os dados do estado local
    setTransactionsData({
      ...transactionsData,
      [transactionType]: updatedTransactions,
    });

    // Atualiza os dados no HomeService
    const monthIndex = HomeService.financeData.months.findIndex(
      (month) => month.name === transactionsData.name
    );
    HomeService.financeData.months[monthIndex][transactionType] =
      updatedTransactions;

    Alert.alert("Sucesso", "Transação deletada com sucesso!");
  };

  const goToHomeScreen = (): void => {
    router.push("/home");
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  if (!transactionsData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum dado disponível.</Text>
      </View>
    );
  }

  const transactions =
    activeTab === "expenses"
      ? transactionsData.expenses || []
      : transactionsData.incomes || [];

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
        <Text style={styles.headerTitle}>{transactionsData.name}</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
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
        keyExtractor={(item, index) => `${item.description}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text style={styles.transactionDescription}>
              {item.description}
            </Text>
            <Text
              style={[
                styles.transactionAmount,
                activeTab === "expenses" ? styles.expense : styles.income,
              ]}
            >
              {formatCurrency(item.amount)}
            </Text>
            {/* Botão de deletar */}
            <TouchableOpacity
              onPress={() => handleDeleteTransaction(item)}
              style={styles.deleteButton}
            >
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
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
        onTransactionSaved={(newTransaction: any) => handleAddTransaction(newTransaction)}
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
    backgroundColor: "#27415699",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
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
  deleteButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
