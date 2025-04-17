import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, UserPlus } from 'lucide-react-native';

const ACTIVITIES = [
  {
    id: 1,
    type: 'like',
    username: 'sarah_dev',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'liked your post',
    timeAgo: '2m',
    postImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  },
  {
    id: 2,
    type: 'comment',
    username: 'tech_mike',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    content: 'commented: "Great work! Keep it up!"',
    timeAgo: '1h',
    postImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    id: 3,
    type: 'follow',
    username: 'code_lisa',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    content: 'started following you',
    timeAgo: '3h',
  },
];

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'like':
      return <Heart size={24} color="#ed4956" fill="#ed4956" />;
    case 'comment':
      return <MessageCircle size={24} color="#5851db" />;
    case 'follow':
      return <UserPlus size={24} color="#0095f6" />;
    default:
      return null;
  }
};

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {ACTIVITIES.map((activity) => (
          <TouchableOpacity key={activity.id} style={styles.activityRow}>
            <Image
              source={{ uri: `${activity.image}?w=150` }}
              style={styles.avatar}
            />
            <View style={styles.activityContent}>
              <View style={styles.activityTextContainer}>
                <Text style={styles.username}>{activity.username}</Text>
                <Text style={styles.activityText}> {activity.content}</Text>
                <Text style={styles.timeAgo}> • {activity.timeAgo}</Text>
              </View>
            </View>
            {activity.type === 'follow' ? (
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            ) : (
              activity.postImage && (
                <Image
                  source={{ uri: `${activity.postImage}?w=150` }}
                  style={styles.postThumbnail}
                />
              )
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  activityRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  activityText: {
    fontSize: 14,
  },
  timeAgo: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  postThumbnail: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  followButton: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followButtonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
});