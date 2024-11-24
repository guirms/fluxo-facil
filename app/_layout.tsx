import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: 'Index' }} />
      <Stack.Screen name='login' options={{ title: 'Login' }} />
      <Stack.Screen name='home' options={{ title: 'Home' }} />
      <Stack.Screen name='confirmation' options={{ title: 'Confirmation' }} />
      <Stack.Screen name='transaction-history' options={{ title: 'TransactionHistory' }} />
    </Stack>
  );
}
