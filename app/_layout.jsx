import { Stack } from 'expo-router';
import { BarberProvider } from '../src/contexts/BarberContext';

export default function Layout() {
  return (
    <BarberProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BarberProvider>
  );
}
