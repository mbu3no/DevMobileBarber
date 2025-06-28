import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theteu Barber</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/agendamento')}>
        <Text style={styles.buttonText}>Agendar Corte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/agenda')}>
        <Text style={styles.buttonText}>Ver Agenda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFD700', marginBottom: 40 },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});
