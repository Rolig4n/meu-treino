import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
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

const Treino = () => (
    // container geral
    <ThemedView style={{gap: 8,
        marginBottom: 8, borderColor: 'pink', borderWidth: 1}}>
        {/* Treino */}
        {treinoData.map((treino) => (
            <ThemedView key={treino.treino} style={{ marginBottom: 24, borderColor: 'purple', borderWidth: 1 }}>
                <ThemedText type="subtitle" style={{ fontWeight: '700', fontSize: 20 }}>
                    {treino.treino}
                </ThemedText>

                {/* Exercicio */}
                {treino.exercises.map((ex, index) => (
                    <ThemedView key={index} style={{ marginTop: 12, paddingLeft: 8, borderColor: 'cyan', borderWidth: 1 }}>
                        <ThemedText style={{ fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
                            {ex.nome}
                        </ThemedText>

                        {/* Serie */}
                        {ex.series.map((serie, sIndex) => {
                            const config = TIPO_CONFIG[serie.tipo] || { label: 'N/A', color: '#000' };
                            
                            return (
                                <ThemedView key={sIndex} style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginBottom: 4,
                                    gap: 8,
                                    borderColor: 'yellow', borderWidth: 1
                                }}>
                                    <ThemedView style={{
                                        backgroundColor: config.color,
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

                                    <CountdownEx qtd={serie.descanso}/>
                                </ThemedView>
                            );
                        })}
                    </ThemedView>
                ))}
            </ThemedView>
        ))}
    </ThemedView>
);

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    }
});

export default Treino;