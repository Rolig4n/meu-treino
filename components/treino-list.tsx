import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import CountdownEx from './countdown';

const treinoData: Treinos[] = require('@/assets/data/treino.json');
const TIPO_CONFIG: Record<number, { label: string; color: string }> = {
    1: { label: 'Aquecimento', color: '#4CAF50' }, // 1 - aquecimento Verde 
    2: { label: 'Preparação', color: '#FF9800' }, // 2 - preparação Laranja
    3: { label: 'Limite', color: '#9E9E9E' },      // 3 - limite Cinza
    4: { label: 'Falha', color: '#F44336' },       // 4 - falha Vermelho 
};

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

const Treino = () => {
    // Captura o parâmetro passado pela navegação da Home
    const { treinoId } = useLocalSearchParams();

    // Filtra o JSON buscando apenas o treino correspondente ao ID
    const treinoSelecionado = treinoData.find(t => t.treino === treinoId);

    // Fallback caso acesse a tela sem nenhum treino selecionado
    if (!treinoSelecionado) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>Nenhum treino selecionado.</ThemedText>
            </ThemedView>
        );
    }

    return (
        // container geral
        <ThemedView style={{gap: 8, marginBottom: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            
            {/* Renderiza diretamente o treino selecionado sem o .map() externo */}
            <ThemedView style={styles.treinoContainer}>
                <ThemedText type="subtitle" style={{ fontWeight: '700', fontSize: 20 }}>
                    {treinoSelecionado.treino}
                </ThemedText>

                {/* Exercicio */}
                {treinoSelecionado.exercises.map((ex, index) => (
                    <ThemedView key={index} style={styles.exercicioContainer}>
                        <ThemedText style={{ fontWeight: '600', fontSize: 16, marginBottom: 8, marginTop: 4}}>
                            {ex.nome}
                        </ThemedText>

                        {/* Serie */}
                        {ex.series.map((serie, sIndex) => {
                            const config = TIPO_CONFIG[serie.tipo] || { label: 'N/A', color: '#000' };

                            return (
                                <ThemedView key={sIndex} style={styles.serieContainer}>
                                    <ThemedView style={{
                                        backgroundColor: config.color,
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                                        paddingHorizontal: 6,
                                        paddingVertical: 2,
                                        borderRadius: 4,
                                        minWidth: 85,
                                        alignItems: 'center'
                                    }}>
                                        <ThemedText style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                                            {serie.qtd}
                                        </ThemedText>
                                    </ThemedView>

                                    <CountdownEx qtd={serie.descanso} />
                                </ThemedView>
                            );
                        })}
                    </ThemedView>
                ))}
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    treinoContainer: {
        marginBottom: 24,
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        borderRadius: 12,
        padding: 12,
        minWidth: 300,
        flexGrow: 1,
    },
    exercicioContainer: {
        marginTop: 12,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    },
    serieContainer: {
        gap: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        backgroundColor: 'rgba(128, 128, 128, 0)',
    }
});

export default Treino;