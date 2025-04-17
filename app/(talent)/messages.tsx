import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

const MESSAGES = [
  {
    id: 1,
    username: 'sarah_dev',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Thanks for the feedback on my portfolio!',
    timeAgo: '2m',
    unread: true,
  },
  {
    id: 2,
    username: 'tech_mike',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    lastMessage: 'When are you free for a mentoring session?',
    timeAgo: '1h',
    unread: false,
  },
  {
    id: 3,
    username: 'code_lisa',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great progress on your project!',
    timeAgo: '3h',
    unread: true,
  },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#8e8e8e" />
        <Text style={styles.searchPlaceholder}>Search messages</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {MESSAGES.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageRow}>
            <Image
              source={{ uri: `${message.image}?w=150` }}
              style={styles.avatar}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.username}>{message.username}</Text>
                <Text style={styles.timeAgo}>{message.timeAgo}</Text>
              </View>
              <View style={styles.messagePreview}>
                <Text
                  style={[
                    styles.lastMessage,
                    message.unread && styles.unreadMessage,
                  ]}
                  numberOfLines={1}
                >
                  {message.lastMessage}
                </Text>
                {message.unread && <View style={styles.unreadDot} />}
              </View>
            </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    margin: 10,
    padding: 8,
    borderRadius: 10,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#8e8e8e',
  },
  messageRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  timeAgo: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    color: '#8e8e8e',
    fontSize: 14,
  },
  unreadMessage: {
    color: '#262626',
    fontFamily: 'Inter-Bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0095f6',
    marginLeft: 8,
  },
});