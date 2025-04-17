import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

const MESSAGES = [
  {
    id: 1,
    name: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Thanks for the mentoring session!',
    timeAgo: '2m',
    unread: true,
  },
  {
    id: 2,
    name: 'Michael Ross',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastMessage: 'Looking forward to our next meeting',
    timeAgo: '1h',
    unread: false,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    lastMessage: 'The code review was very helpful',
    timeAgo: '3h',
    unread: true,
  },
  {
    id: 4,
    name: 'David Kim',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    lastMessage: 'Can we schedule a call tomorrow?',
    timeAgo: '5h',
    unread: false,
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
                <Text style={styles.name}>{message.name}</Text>
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
  name: {
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
    backgroundColor: '#FF6B6B',
    marginLeft: 8,
  },
});