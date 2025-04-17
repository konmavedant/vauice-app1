import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Platform, View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = Platform.select({
  web: AsyncStorage,
  default: {
    getItem: async (key: string) => {
      const { getItemAsync } = await import('expo-secure-store');
      return getItemAsync(key);
    },
    setItem: async (key: string, value: string) => {
      const { setItemAsync } = await import('expo-secure-store');
      return setItemAsync(key, value);
    },
  },
});

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await storage.getItem('userToken');
      if (token) {
        const userRole = await storage.getItem('userRole');
        const userName = await storage.getItem('userName');
        const userDob = await storage.getItem('userDob');

        if (!userName) {
          router.replace('/onboarding/name');
        } else if (!userDob) {
          router.replace('/onboarding/dob');
        } else if (!userRole) {
          router.replace('/onboarding/role');
        } else {
          router.replace(userRole === 'mentor' ? '/(mentor)' : '/(talent)');
        }
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3C78E3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});