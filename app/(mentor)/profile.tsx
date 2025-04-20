import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Award, Users, Clock } from 'lucide-react-native';

const STATS = [
  { icon: Users, label: 'Mentees', value: '24' },
  { icon: Clock, label: 'Hours', value: '156' },
  { icon: Award, label: 'Rating', value: '4.9' },
];

const EXPERTISE = [
  'Frontend Development',
  'React Native',
  'UI/UX Design',
  'System Architecture',
  'Team Leadership',
];

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>James Wilson</Text>
        <Text style={styles.title}>Senior Software Engineer</Text>
        <Text style={styles.company}>Tech Innovations Inc.</Text>
      </View>

      <View style={styles.statsContainer}>
        {STATS.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <stat.icon size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bio}>
          Passionate about helping developers grow and reach their full potential. 
          With over 10 years of experience in software development, I specialize in 
          frontend technologies and building scalable applications.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Areas of Expertise</Text>
        <View style={styles.expertiseContainer}>
          {EXPERTISE.map((item, index) => (
            <View key={index} style={styles.expertiseBadge}>
              <Text style={styles.expertiseText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => router.push('/components/EditProfileForm?isMentor=true')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expertiseBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  expertiseText: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});