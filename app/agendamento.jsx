import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarberContext } from '../src/contexts/BarberContext';

export default function Agendamento() {
  const { servicos, agendarCorte } = useContext(BarberContext);
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState(servicos[0]?.id);

  const datasDisponiveis = [
    '26/06 às 10h',
    '26/06 às 15h',
    '27/06 às 14h',
    '27/06 às 16h',
    '28/06 às 09h',
    '28/06 às 17h',
  ];

  const agendar = () => {
    if (!nome || !telefone || !dataSelecionada || !servicoSelecionado) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    const servico = servicos.find(s => s.id === servicoSelecionado);
    agendarCorte(nome, dataSelecionada, servico);
    Alert.alert('Sucesso', 'Agendamento confirmado!');
    setNome('');
    setTelefone('');
    setDataSelecionada('');
    setServicoSelecionado(servicos[0]?.id);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Agende seu Corte</Text>

        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#aaa" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#aaa" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={dataSelecionada} onValueChange={setDataSelecionada} style={styles.picker}>
            <Picker.Item label="Selecione Data e Hora" value="" />
            {datasDisponiveis.map((data, index) => (
              <Picker.Item key={index} label={data} value={data} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker selectedValue={servicoSelecionado} onValueChange={setServicoSelecionado} style={styles.picker}>
            {servicos.map(s => (
              <Picker.Item key={s.id} label={`${s.nome} - R$${s.preco}`} value={s.id} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={agendar}>
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backText}>Voltar para Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  innerContainer: { padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#FFD700', borderRadius: 8, padding: 10, color: '#fff', marginVertical: 10 },
  pickerContainer: { borderWidth: 1, borderColor: '#FFD700', borderRadius: 8, marginVertical: 10 },
  picker: { color: '#fff' },
  button: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 20, alignItems: 'center', backgroundColor: '#FFD700', padding: 12, borderRadius: 8 },
  backText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
