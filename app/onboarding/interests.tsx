
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const SPORTS_INTERESTS = [
  { id: 1, name: 'Football', icon: '⚽' },
  { id: 2, name: 'Basketball', icon: '🏀' },
  { id: 3, name: 'Tennis', icon: '🎾' },
  { id: 4, name: 'Cricket', icon: '🏏' },
  { id: 5, name: 'Swimming', icon: '🏊‍♂️' },
  { id: 6, name: 'Running', icon: '🏃‍♂️' },
  { id: 7, name: 'Boxing', icon: '🥊' },
  { id: 8, name: 'Yoga', icon: '🧘‍♂️' },
  { id: 9, name: 'Golf', icon: '⛳' },
  { id: 10, name: 'Volleyball', icon: '🏐' },
];

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const router = useRouter();

  const toggleInterest = (id: number) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selectedInterests.length > 0) {
      const userRole = await AsyncStorage.getItem('userRole');
      router.replace(userRole === 'mentor' ? '/(mentor)' : '/(talent)');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800' }}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Interests</Text>
        <Text style={styles.subtitle}>Select sports that interest you the most</Text>

        <ScrollView 
          contentContainerStyle={styles.interestsGrid}
          showsVerticalScrollIndicator={false}
        >
          {SPORTS_INTERESTS.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestItem,
                selectedInterests.includes(interest.id) && styles.selectedItem
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={styles.interestIcon}>{interest.icon}</Text>
              <Text style={styles.interestName}>{interest.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedInterests.length === 0 && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={selectedInterests.length === 0}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
    textAlign: 'center',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 20,
  },
  interestItem: {
    width: Math.min(150, (WINDOW_WIDTH - 60) / 2),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedItem: {
    backgroundColor: 'rgba(60, 120, 227, 0.3)',
    borderColor: '#3C78E3',
  },
  interestIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  interestName: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#3C78E3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: 'rgba(60, 120, 227, 0.5)',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});
