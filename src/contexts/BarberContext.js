import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const BarberContext = createContext();

export const BarberProvider = ({ children }) => {
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Corte', preco: 30 },
    { id: 2, nome: 'Corte + Sobrancelha', preco: 35 },
  ]);

  const [agenda, setAgenda] = useState([]);
  const AGENDA_KEY = '@barber_agenda';

  // Carregar agenda ao iniciar o app
  useEffect(() => {
    const carregarAgenda = async () => {
      try {
        const dados = await AsyncStorage.getItem(AGENDA_KEY);
        if (dados) setAgenda(JSON.parse(dados));
      } catch (error) {
        console.error('Erro ao carregar agenda:', error);
      }
    };
    carregarAgenda();
  }, []);

  // Salvar agenda sempre que ela muda
  useEffect(() => {
    const salvarAgenda = async () => {
      try {
        await AsyncStorage.setItem(AGENDA_KEY, JSON.stringify(agenda));
      } catch (error) {
        console.error('Erro ao salvar agenda:', error);
      }
    };
    salvarAgenda();
  }, [agenda]);

  const agendarCorte = (nome, data, servico) => {
    setAgenda([...agenda, { id: Date.now(), cliente: nome, data, servico }]);
  };

  const excluirAgendamento = (id) => {
    const novaLista = agenda.filter(item => item.id !== id);
    setAgenda(novaLista);
  };

// const editarAgendamento = (id, novoCliente, novaData, novoServico) => {
//   const listaAtualizada = agenda.map(item => {
//     if (item.id === id) {
//       return { ...item, cliente: novoCliente, data: novaData, servico: novoServico };
//     }
//     return item;
//   });
//   setAgenda(listaAtualizada);
// };


  return (
    <BarberContext.Provider value={{
      servicos,
      agenda,
      agendarCorte,
      excluirAgendamento,
     // editarAgendamento
    }}>
      {children}
    </BarberContext.Provider>
  );
};
