import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    paddingBottom: Platform.OS === 'web' ? 80 : 0,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  imageContainer: {
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

const slides = [
  {
    backgroundColor: '#FF6B6B',
    image: (
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80' }}
        style={styles.image}
      />
    ),
    title: 'Connect with Mentors',
    subtitle: 'Find experienced professionals who can guide you on your journey.',
  },
  {
    backgroundColor: '#4ECDC4',
    image: (
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' }}
        style={styles.image}
      />
    ),
    title: 'Learn & Grow',
    subtitle: 'Access resources and gain insights from industry experts.',
  },
  {
    backgroundColor: '#3C78E3',
    image: (
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' }}
        style={styles.image}
      />
    ),
    title: 'Build Your Network',
    subtitle: 'Connect with like-minded individuals and expand your professional circle.',
  },
];

export default function OnboardingScreen(): JSX.Element {
  const router = useRouter();

  const handleDone = async () => {
    await SecureStore.setItemAsync('onboarded', 'true');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        pages={slides}
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={styles.containerStyle}
        imageContainerStyles={styles.imageContainer}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        bottomBarHighlight={false}
        showSkip={true}
        skipLabel="Skip"
        nextLabel="Next"
        skipToLabel="Done"
        bottomBarHeight={80}
      />
    </View>
  );
}