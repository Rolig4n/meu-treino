import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FlatList, StyleSheet } from 'react-native';

const treinoData = require('@/assets/data/treino.json');

console.log(treinoData);

const Treino = () => (
    <FlatList
        data={treinoData}
        renderItem={({ item }: { item: any }) =>

            <ThemedView style={styles.stepContainer}>
                <ThemedText>{item.treino}</ThemedText>
                <ThemedText>{item.exercices}</ThemedText>
            </ThemedView>
        }
        keyExtractor={(_, index) => index.toString()}
    />
);

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    }
});

export default Treino;