import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MessageCircle, Star } from 'lucide-react-native';

const FAVORITES = [
  {
    id: 1,
    name: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'UI/UX'],
    matchPercentage: 95,
    superLiked: true,
  },
  {
    id: 2,
    name: 'Michael Ross',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    role: 'Full Stack Developer',
    skills: ['Node.js', 'AWS', 'Python'],
    matchPercentage: 88,
    superLiked: false,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    role: 'Mobile Developer',
    skills: ['Swift', 'SwiftUI', 'Firebase'],
    matchPercentage: 92,
    superLiked: true,
  },
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {FAVORITES.map((favorite) => (
          <View key={favorite.id} style={styles.card}>
            <Image
              source={{ uri: `${favorite.image}?w=400` }}
              style={styles.avatar}
            />
            <View style={styles.content}>
              <View style={styles.topRow}>
                <View>
                  <Text style={styles.name}>{favorite.name}</Text>
                  <Text style={styles.role}>{favorite.role}</Text>
                </View>
                {favorite.superLiked && (
                  <Star size={24} color="#64B5F6" fill="#64B5F6" />
                )}
              </View>

              <View style={styles.skillsContainer}>
                {favorite.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.bottomRow}>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchText}>
                    {favorite.matchPercentage}% Match
                  </Text>
                </View>
                <TouchableOpacity style={styles.messageButton}>
                  <MessageCircle size={20} color="#FF6B6B" />
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 12,
    color: '#666',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  matchText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  messageText: {
    color: '#FF6B6B',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
});