import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Grid2x2 as Grid, Bookmark, Settings } from 'lucide-react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const PROFILE_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    likes: 234,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    likes: 456,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    likes: 789,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    likes: 123,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    likes: 456,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    likes: 789,
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.username}>john_doe</Text>
        <TouchableOpacity>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' }}
          style={styles.profileImage}
        />
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>985</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bioText}>Frontend Developer | UI/UX Enthusiast</Text>
        <Text style={styles.bioText}>Building beautiful web experiences ✨</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Grid size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Bookmark size={24} color="#8e8e8e" />
        </TouchableOpacity>
      </View>

      <View style={styles.postsGrid}>
        {PROFILE_POSTS.map((post) => (
          <TouchableOpacity key={post.id} style={styles.gridItem}>
            <Image
              source={{ uri: `${post.image}?w=300` }}
              style={styles.gridImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  statLabel: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  bio: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  editButton: {
    marginHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    padding: 1,
  },
  gridImage: {
    flex: 1,
  },
});