import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarberContext } from '../src/contexts/BarberContext';

export default function Agenda() {
  const { agenda, excluirAgendamento } = useContext(BarberContext);
  const router = useRouter();

  const confirmarExclusao = (id) => {
    Alert.alert('Excluir Agendamento', 'Deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => excluirAgendamento(id), style: 'destructive' }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>Agenda</Text>

      {agenda.map(item => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.text}>Cliente: {item.cliente}</Text>
          <Text style={styles.text}>Telefone: {item.telefone}</Text>
          <Text style={styles.text}>Data: {item.data}</Text>
          <Text style={styles.text}>Serviço: {item.servico.nome} (R${item.servico.preco})</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmarExclusao(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: '/agendamento', params: { editarId: item.id } })}>
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backText}>Voltar para Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', textAlign: 'center', marginBottom: 20 },
  item: { backgroundColor: '#111', padding: 15, borderRadius: 8, marginBottom: 15, borderColor: '#FFD700', borderWidth: 1 },
  text: { color: '#fff', marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  deleteButton: { backgroundColor: '#FFD700', padding: 8, borderRadius: 5 },
  deleteText: { color: '#000', fontWeight: 'bold' },
  editButton: { backgroundColor: '#FFD700', padding: 8, borderRadius: 5 },
  editText: { color: '#000', fontWeight: 'bold' },
  backButton: { marginTop: 20, backgroundColor: '#FFD700', padding: 12, borderRadius: 8, alignItems: 'center' },
  backText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
