import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CircleUser as UserCircle2, Users } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function RoleSelection() {
  const router = useRouter();

  const handleRoleSelect = (role: 'talent' | 'mentor') => {
    // For web, we'll just navigate without storing
    await storage.setItem('userRole', role);
    router.push('/onboarding/interests');
  };

  return (
    <LinearGradient
      colors={['#3C78E3', '#002A68']}
      style={styles.container}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>How would you like to use VAUICE?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRoleSelect('talent')}
          >
            <UserCircle2 color="white" size={32} />
            <Text style={styles.buttonText}>I'm a Talent</Text>
            <Text style={styles.description}>
              Connect with mentors, share your journey, and get guidance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRoleSelect('mentor')}
          >
            <Users color="white" size={32} />
            <Text style={styles.buttonText}>I'm a Mentor</Text>
            <Text style={styles.description}>
              Share your expertise, guide talents, and make an impact
            </Text>
          </TouchableOpacity>
        </View>
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
    width: Platform.OS === 'web' ? Math.min(width * 0.9, 480) : width * 0.9,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});