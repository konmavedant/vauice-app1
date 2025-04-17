import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';

export default function DateOfBirthScreen() {
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [showCalendar, setShowCalendar] = useState(false);
  const router = useRouter();

  const handleDateSelect = (day: any) => {
    setDate(new Date(day.timestamp));
    setShowCalendar(false);
  };

  const handleContinue = () => {
    router.push('/onboarding/role');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=800' }}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
        style={styles.overlay}
      />

      <View style={styles.content}>
        <Text style={styles.title}>When's your birthday?</Text>
        <Text style={styles.subtitle}>We'll use this to personalize your experience</Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowCalendar(true)}
        >
          <Calendar size={24} color="#fff" />
          <Text style={styles.dateText}>{format(date, 'MMMM d, yyyy')}</Text>
        </TouchableOpacity>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <RNCalendar
              onDayPress={handleDateSelect}
              markedDates={{
                [format(date, 'yyyy-MM-dd')]: {
                  selected: true,
                  selectedColor: '#3C78E3',
                },
              }}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#3C78E3',
                selectedDayTextColor: '#fff',
                todayTextColor: '#3C78E3',
                dayTextColor: '#fff',
                textDisabledColor: 'rgba(255,255,255,0.3)',
                arrowColor: '#fff',
                monthTextColor: '#fff',
                textMonthFontFamily: 'Inter-Bold',
                textDayFontFamily: 'Inter-Regular',
                textDayHeaderFontFamily: 'Inter-Bold',
              }}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
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
    backgroundColor: '#000',
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
    maxWidth: Platform.OS === 'web' ? 480 : undefined,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  calendarContainer: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
  },
  button: {
    backgroundColor: '#3C78E3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});