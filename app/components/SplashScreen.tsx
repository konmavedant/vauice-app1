import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function CustomSplashScreen() {
  return (
    <LinearGradient
      colors={['#3C78E3', '#002A68']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={styles.content}
      >
        <Text style={styles.title}>VAUICE</Text>
        <Text style={styles.subtitle}>Connect. Learn. Grow.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
});