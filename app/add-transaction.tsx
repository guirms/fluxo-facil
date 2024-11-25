import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { ECategory } from '@/data-types/enums';
import financeDataResponse from '@/mock/mockData';
import { EMonth } from '@/data-types/enums';
import HomeService from '@/services/home-service';

export default function AddTransaction({
  modalVisible,
  setModalVisible,
  onTransactionSaved,
}: any) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ECategory | null>(null);
  const [type, setType] = useState<'expenses' | 'incomes' | null>(null);
  const [value, setValue] = useState('0.00');

  useEffect(() => {
    if (!modalVisible) {
      setDescription('');
      setCategory(null);
      setType(null);
      setValue('0.00');
    }
  }, [modalVisible]);

  const formatValue = (rawValue: string) => {
    const cleanValue = rawValue.replace(/\D/g, '');
    const integerPart = cleanValue.slice(0, -2) || '0';
    const decimalPart = cleanValue.slice(-2).padStart(2, '0');
    return `${parseInt(integerPart, 10)}.${decimalPart}`;
  };

  const MAX_DIGITS = 15;

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setValue('0.00');
    } else if (key === '<') {
      const cleanValue = value.replace('.', '').slice(0, -1);
      setValue(formatValue(cleanValue));
    } else if (!isNaN(Number(key))) {
      const cleanValue = value.replace('.', '');
      if (cleanValue.length < MAX_DIGITS) {
        const newValue = cleanValue + key;
        setValue(formatValue(newValue));
      } else {
        Alert.alert('Aviso', 'Número muito grande!');
      }
    }
  };

  const handleSave = () => {
    const amount = parseFloat(value);
  
    if (!description || (type === 'expenses' && !category) || !amount || !type) {
      Alert.alert('Aviso', 'Preencha todos os campos obrigatórios!');
      return;
    }
  
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Aviso', 'Valor inválido!');
      return;
    }
  
    const today = new Date();
    const date = today.toISOString().split('T')[0] + 'T00:00:00.000Z';
  
    const newTransaction = {
      description,
      date, // Data atual formatada
      category: type === 'incomes' ? undefined : category as ECategory,
      amount,
    };
  
    // Atualiza os dados globalmente
    const monthIndex = financeDataResponse.months.findIndex(
      (month) => month.value === Object.values(EMonth)[today.getMonth()]
    );
  
    financeDataResponse.months[monthIndex][type].push(newTransaction);
    HomeService.financeData = HomeService.getFinanceDataDto(financeDataResponse);
  
    // Notifica a tela principal
    if (onTransactionSaved) {
      onTransactionSaved(newTransaction);
    }
  
    // Fecha o modal
    setModalVisible(false);
  };
  

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nova Transação</Text>

          {/* Tipo */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setType(type === 'expenses' ? 'incomes' : 'expenses')}
          >
            <Text style={styles.inputText}>
              {type === 'expenses'
                ? 'Despesas'
                : type === 'incomes'
                ? 'Receitas'
                : 'Selecione o tipo'}
            </Text>
          </TouchableOpacity>

          {/* Categoria */}
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setCategory(
                category === ECategory.education
                  ? ECategory.leisure
                  : category === ECategory.leisure
                  ? ECategory.food
                  : ECategory.education
              )
            }
          >
            <Text style={styles.inputText}>
              {category || 'Selecione a categoria'}
            </Text>
          </TouchableOpacity>

          {/* Descrição */}
          <TextInput
            style={styles.input}
            placeholder="Digite a descrição"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
          />

          {/* Valor */}
          <Text style={styles.valueText}>R$ {value}</Text>

          {/* Teclado Customizado */}
          <View style={styles.keyboard}>
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '<', 'C'].map(
              (key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.keyButton}
                  onPress={() => handleKeyPress(key)}
                >
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Botão de Salvar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    backgroundColor: '#1c1f26',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#333',
    borderRadius: 7,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#fff', // Texto branco no input
    fontSize: 16,
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  valueText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  keyButton: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
