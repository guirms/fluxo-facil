import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AntDesign from '@expo/vector-icons/AntDesign';
import personImage from '@/assets/images/person.png';
import financeDataResponse from '@/mock/mockData';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import HomeService from '@/services/home-service';
import AddTransaction from "./add-transaction";

HomeService.financeData = HomeService.getFinanceDataDto(financeDataResponse);

export default function HomeScreen() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const currentMonth = HomeService.financeData.months[currentMonthIndex];
  const screenWidth = Dimensions.get('window').width;

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    } else if (
      direction === 'next' &&
      currentMonthIndex < HomeService.financeData.months.length - 1
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
          <Text style={styles.userName}>{HomeService.financeData.name}</Text>
        </View>

        <View style={styles.balanceSection}>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={() => handleMonthChange('prev')}>
              <Text style={styles.arrow}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.month}>{currentMonth.name}</Text>
            <TouchableOpacity onPress={() => handleMonthChange('next')}>
              <Text style={styles.arrow}>{'>'}</Text>
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

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AntDesign name='downcircleo' size={24} color='#E83F5B' />
              <Text style={styles.cardTitleLoss}>Despesas</Text>
            </View>

            <Text style={styles.totalExpense}>
              R${' '}
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
              <AntDesign name='upcircleo' size={24} color='#12A454' />
              <Text style={styles.cardTitleIncome}>Receitas</Text>
            </View>

            <Text style={styles.totalIncome}>
              R${' '}
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
                R$ {item.spent.toFixed(2)} ({item.percentage.toFixed(2)}%)
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
            width={screenWidth - 30}
            height={200}
            yAxisLabel='R$ '
            chartConfig={{
              backgroundGradientFrom: '#253031',
              backgroundGradientTo: '#253031',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                strokeWidth: 0,
              },
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
            }}
          />
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.floatingButton}>
        <FontAwesome6 name='plus' size={24} color='white' />
      </TouchableOpacity>

    {/* Modal de Adicionar Transação */}
    <AddTransaction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1f26' },
  header: {
    backgroundColor: '#2E3C3D',
    padding: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  icon: { color: '#fff', fontSize: 20, marginLeft: 15 },
  balanceSection: { alignItems: 'center' },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: { color: '#fff', fontSize: 18, marginHorizontal: 25 },
  month: { color: '#fff', fontSize: 25 },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  balanceItem: { alignItems: 'center', flex: 1 },
  balance: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  balanceLabel: { color: '#aaa', fontSize: 14 },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#253031',
    borderRadius: 10,
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitleLoss: {
    color: '#E83F5B',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#aaa',
    fontSize: 14,
    marginBottom: 2,
  },
  cardTitleIncome: {
    color: '#12A454',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  totalExpense: {
    color: '#E83F5B',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalIncome: {
    color: '#12A454',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  expenseBullet: {
    color: '#E83F5B',
    fontSize: 14,
    marginRight: 5,
  },
  expenseValue: {
    color: '#E83F5B',
    fontSize: 12,
    marginRight: 10,
  },
  incomeValue: {
    color: '#12A454',
    fontSize: 12,
    marginRight: 10,
  },
  incomeBullet: {
    color: '#12A454',
    fontSize: 14,
    marginRight: 5,
  },
  cardDescription: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1,
  },
  moreButton: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  planningSection: {
    backgroundColor: '#253031',
    borderRadius: 15,
    padding: 10,
  },
  planningItem: { marginBottom: 10 },
  planningCategory: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  progressBar: {
    height: 18,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  planningText: { color: '#aaa', fontSize: 14 },
  chartSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#253031',
    borderRadius: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#27415699',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
