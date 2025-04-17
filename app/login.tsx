import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      router.push('/onboarding/name');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fontSize = Math.min(16, WINDOW_WIDTH * 0.04);
  const containerWidth = Platform.select({
    web: Math.min(480, WINDOW_WIDTH * 0.9),
    default: WINDOW_WIDTH,
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80' }}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
        style={styles.overlay}
      />

      <View style={[styles.content, { maxWidth: containerWidth }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: fontSize * 2.25 }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { fontSize: fontSize * 1.125 }]}>
            Sign in to continue your journey
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail color="#fff" size={fontSize * 1.25} />
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { fontSize }]}
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text style={[styles.fieldError, { fontSize: fontSize * 0.75 }]}>
              {errors.email.message}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <Lock color="#fff" size={fontSize * 1.25} />
            <Controller
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { fontSize }]}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
          </View>
          {errors.password && (
            <Text style={[styles.fieldError, { fontSize: fontSize * 0.75 }]}>
              {errors.password.message}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { fontSize }]}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/forgot-password')}
          >
            <Text style={[styles.forgotPasswordText, { fontSize: fontSize * 0.875 }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={[styles.dividerText, { fontSize }]}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push('/register')}
          >
            <Text style={[styles.registerButtonText, { fontSize }]}>
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: Math.min(20, WINDOW_WIDTH * 0.05),
  },
  header: {
    marginBottom: WINDOW_HEIGHT * 0.05,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: Math.min(20, WINDOW_WIDTH * 0.05),
    backdropFilter: 'blur(10px)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  button: {
    backgroundColor: '#3C78E3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(60,120,227,0.5)',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  fieldError: {
    color: '#ff6b6b',
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#fff',
    fontFamily: 'Inter-Regular',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#fff',
    fontFamily: 'Inter-Regular',
  },
  registerButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  registerButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
});