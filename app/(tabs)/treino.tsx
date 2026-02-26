import { Image } from 'expo-image';
import { Dimensions, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Treino from '@/components/treino-list';

export default function HomeScreen() {
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
        <ThemedText type="title">Treino!</ThemedText>
        <HelloWave emote="💪"/>
      </ThemedView>
      <Treino/>
    </ParallaxScrollView>
  );
}

const screenHeight = Dimensions.get('window').height;

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
    height: screenHeight * 0.4,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
