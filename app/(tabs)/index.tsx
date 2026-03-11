import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';


export default function HomeScreen() {
  const treinoData: Treinos[] = require('@/assets/data/treino.json');
  interface Series {
    tipo: number;
    qtd: string;
    descanso: number; // em segundos
  }

  interface Exercises {
    nome: string;
    series: Series[];
  }

  interface Treinos {
    treino: string;
    exercises: Exercises[];
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#525252' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-mt-logo2.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hoje é dia de?</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Selecione o treino:</ThemedText>

        <FlatList
          data={treinoData}
          // Usamos o nome do treino (ex: "Sup I") como chave única
          keyExtractor={(item) => item.treino}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/treino',
                // Passamos o nome exato do treino como parâmetro para a próxima tela
                params: { treinoId: item.treino }
              }}
              asChild
            >
              <Pressable style={styles.button}>
                <ThemedText style={styles.buttonText}>{item.treino}</ThemedText>
                {/* O .length conta quantos itens existem dentro do array exercises */}
                <ThemedText style={styles.countText}>
                  {item.exercises.length} exercícios
                </ThemedText>
              </Pressable>
            </Link>
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    marginTop: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 85,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between', // Separa o nome da quantidade nos cantos
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 14,
    color: '#666',
  }
});
