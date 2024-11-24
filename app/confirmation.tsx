import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
      },
  });

export default function ConfirmationScreen() {
    return (
      <View style={styles.container}>
        <FontAwesome name='check-circle' size={96} color='green' />
        <Text style={styles.text}>Adicionado</Text>
      </View>
    );
  }
  