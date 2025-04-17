import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const WINDOW_WIDTH = Dimensions.get('window').width;

const STORIES = [
  { id: 1, username: 'sarah_dev', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { id: 2, username: 'tech_mike', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  { id: 3, username: 'code_lisa', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
  { id: 4, username: 'john_design', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
  { id: 5, username: 'emma_ux', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
];

const POSTS = [
  {
    id: 1,
    username: 'sarah_dev',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    postImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    caption: 'Just finished my latest coding project! 🚀 #coding #webdev',
    likes: 234,
    comments: 18,
    timeAgo: '2 hours',
  },
  {
    id: 2,
    username: 'tech_mike',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    postImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    caption: 'Another day, another bug fixed 🐛 #debugging #programming',
    likes: 456,
    comments: 32,
    timeAgo: '4 hours',
  },
  {
    id: 3,
    username: 'code_lisa',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    postImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    caption: 'Learning new frameworks is always exciting! 💻 #learning #development',
    likes: 789,
    comments: 45,
    timeAgo: '6 hours',
  },
];

function Story({ username, image }: { username: string; image: string }) {
  return (
    <TouchableOpacity style={styles.storyContainer}>
      <View style={styles.storyRing}>
        <Image
          source={{ uri: `${image}?w=150` }}
          style={styles.storyImage}
        />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {username}
      </Text>
    </TouchableOpacity>
  );
}

function Post({ post }: { post: typeof POSTS[0] }) {
  return (
    <Animated.View 
      entering={FadeInDown.duration(400)} 
      style={styles.postContainer}
    >
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image
            source={{ uri: `${post.userImage}?w=150` }}
            style={styles.postUserImage}
          />
          <Text style={styles.postUsername}>{post.username}</Text>
        </View>
      </View>

      <Image
        source={{ uri: `${post.postImage}?w=600` }}
        style={styles.postImage}
      />

      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Bookmark size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.postFooter}>
        <Text style={styles.likesCount}>{post.likes.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewComments}>
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </Animated.View>
  );
}

export default function TalentHome() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VAUICE</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
      >
        {STORIES.map((story) => (
          <Story key={story.id} {...story} />
        ))}
      </ScrollView>

      {POSTS.map((post) => (
        <Post key={post.id} post={post} />
      ))}
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
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#3C78E3',
  },
  storiesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  storyUsername: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    width: 64,
    color: '#666',
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postUsername: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#000',
  },
  postImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    marginRight: 8,
  },
  postFooter: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likesCount: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    marginRight: 6,
    color: '#000',
  },
  caption: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  viewComments: {
    color: '#666',
    marginTop: 6,
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
});