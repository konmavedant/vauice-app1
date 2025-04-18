import { View, Text, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Heart, X, Star } from 'lucide-react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const CARD_HEIGHT = Platform.select({
  web: Math.min(WINDOW_HEIGHT - 60, 700), // Limit height on web
  default: WINDOW_HEIGHT - 60,
});
const SWIPE_THRESHOLD = WINDOW_WIDTH * 0.3;

const TALENT_PROFILES = [
  {
    id: 1,
    name: 'Sarah Chen',
    age: 24,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Frontend Developer | React Native Enthusiast',
    skills: ['React', 'TypeScript', 'UI/UX'],
    experience: '2 years',
    location: 'San Francisco, CA',
    education: 'B.S. Computer Science',
  },
  {
    id: 2,
    name: 'Michael Ross',
    age: 28,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Full Stack Developer | Cloud Architecture',
    skills: ['Node.js', 'AWS', 'Python'],
    experience: '4 years',
    location: 'New York, NY',
    education: 'M.S. Software Engineering',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    age: 26,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    bio: 'Mobile Developer | iOS Specialist',
    skills: ['Swift', 'SwiftUI', 'Firebase'],
    experience: '3 years',
    location: 'Seattle, WA',
    education: 'B.S. Computer Engineering',
  },
  {
    id: 4,
    name: 'David Kim',
    age: 25,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Backend Engineer | Database Expert',
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    experience: '2.5 years',
    location: 'Austin, TX',
    education: 'B.S. Information Systems',
  },
  {
    id: 5,
    name: 'Julia Martinez',
    age: 27,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    bio: 'DevOps Engineer | Cloud Native',
    skills: ['Kubernetes', 'Docker', 'CI/CD'],
    experience: '3.5 years',
    location: 'Boston, MA',
    education: 'M.S. Cloud Computing',
  },
  {
    id: 6,
    name: 'Alex Thompson',
    age: 29,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    bio: 'AI/ML Engineer | Deep Learning',
    skills: ['TensorFlow', 'PyTorch', 'Computer Vision'],
    experience: '4 years',
    location: 'San Jose, CA',
    education: 'Ph.D. Machine Learning',
  },
];

function SwipeIndicator({ direction, visible }: { direction: 'left' | 'right' | 'up', visible: boolean }) {
  if (!visible) return null;

  const size = Math.min(90, WINDOW_WIDTH * 0.2); // Responsive size

  return (
    <View style={[
      styles.swipeIndicator,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      direction === 'left' && { backgroundColor: '#FF3B30', left: WINDOW_WIDTH * 0.1 },
      direction === 'right' && { backgroundColor: '#34C759', right: WINDOW_WIDTH * 0.1 },
      direction === 'up' && { backgroundColor: '#007AFF', top: WINDOW_HEIGHT * 0.1 },
    ]}>
      {direction === 'left' && <X color="white" size={size * 0.35} />}
      {direction === 'right' && <Heart color="white" size={size * 0.35} fill="white" />}
      {direction === 'up' && <Star color="white" size={size * 0.35} fill="white" />}
    </View>
  );
}

function TalentCard({ profile, style, isFirst }: { profile: typeof TALENT_PROFILES[0], style?: any, isFirst: boolean }) {
  const fontSize = Math.min(28, WINDOW_WIDTH * 0.07); // Responsive font size

  return (
    <Animated.View style={[styles.card, style]}>
      <Image
        source={{ uri: `${profile.image}?w=800` }}
        style={styles.cardImage}
      />
      <View style={styles.overlay}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.headerInfo}>
              <Text style={[styles.name, { fontSize }]}>{profile.name}, {profile.age}</Text>
              <Text style={[styles.experience, { fontSize: fontSize * 0.64 }]}>
                {profile.experience} experience
              </Text>
              <Text style={[styles.location, { fontSize: fontSize * 0.57 }]}>
                {profile.location}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.bio, { fontSize: fontSize * 0.64 }]}>{profile.bio}</Text>
          <Text style={[styles.education, { fontSize: fontSize * 0.57 }]}>{profile.education}</Text>
          
          <View style={styles.skillsContainer}>
            {profile.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={[styles.skillText, { fontSize: fontSize * 0.5 }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {isFirst && (
        <>
          <SwipeIndicator direction="left" visible={false} />
          <SwipeIndicator direction="right" visible={false} />
          <SwipeIndicator direction="up" visible={false} />
        </>
      )}
    </Animated.View>
  );
}

export default function MentorHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardRotate = useSharedValue(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);

  const nextCard = () => {
    setCurrentIndex((current) => 
      current === TALENT_PROFILES.length - 1 ? 0 : current + 1
    );
    translateX.value = 0;
    translateY.value = 0;
    cardRotate.value = 0;
    setSwipeDirection(null);
  };

  const panGesture = Gesture.Pan()
    .minDistance(10)
    .activeOffsetX([-10, 10])
    .activeOffsetY([-10, 10])
    .onBegin(() => {
      'worklet';
      cardRotate.value = 0;
    })
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      cardRotate.value = event.translationX / (WINDOW_WIDTH * 0.7);

      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        if (event.translationX > SWIPE_THRESHOLD) {
          runOnJS(setSwipeDirection)('right');
        } else if (event.translationX < -SWIPE_THRESHOLD) {
          runOnJS(setSwipeDirection)('left');
        } else {
          runOnJS(setSwipeDirection)(null);
        }
      } else if (event.translationY < -SWIPE_THRESHOLD) {
        runOnJS(setSwipeDirection)('up');
      } else {
        runOnJS(setSwipeDirection)(null);
      }
    })
    .onEnd((event) => {
      'worklet';
      const velocity = event.velocityX;
      const swipedRight = event.translationX > SWIPE_THRESHOLD || velocity > 800;
      const swipedLeft = event.translationX < -SWIPE_THRESHOLD || velocity < -800;
      const swipedUp = event.translationY < -SWIPE_THRESHOLD;

      if (swipedRight) {
        translateX.value = withSpring(WINDOW_WIDTH * 1.5, {
          velocity: velocity,
          damping: 15,
          stiffness: 100,
        }, () => {
          runOnJS(nextCard)();
        });
      } else if (swipedLeft) {
        translateX.value = withSpring(-WINDOW_WIDTH * 1.5, {
          velocity: velocity,
          damping: 15,
          stiffness: 100,
        }, () => {
          runOnJS(nextCard)();
        });
      } else if (swipedUp) {
        translateY.value = withSpring(-WINDOW_HEIGHT, {
          damping: 15,
          stiffness: 100,
        }, () => {
          runOnJS(nextCard)();
        });
      } else {
        translateX.value = withSpring(0, {
          velocity: velocity,
          damping: 15,
          stiffness: 400,
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 400,
        });
        cardRotate.value = withTiming(0);
        runOnJS(setSwipeDirection)(null);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${cardRotate.value * 15}deg` },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, WINDOW_WIDTH],
      [0.85, 1],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, WINDOW_WIDTH],
      [0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VAUICE</Text>
      </View>

      <View style={styles.cardsContainer}>
        {currentIndex < TALENT_PROFILES.length - 1 && (
          <TalentCard
            profile={TALENT_PROFILES[currentIndex + 1]}
            style={nextCardStyle}
            isFirst={false}
          />
        )}
        
        <GestureDetector gesture={panGesture}>
          <TalentCard
            profile={TALENT_PROFILES[currentIndex]}
            style={rStyle}
            isFirst={true}
          />
        </GestureDetector>

        {swipeDirection && (
          <SwipeIndicator 
            direction={swipeDirection} 
            visible={true}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: Platform.select({ web: 60, default: 60 }),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: Math.min(20, WINDOW_WIDTH * 0.05),
    color: '#3C78E3',
  },
  cardsContainer: {
    flex: 1,
  },
  card: {
    width: WINDOW_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 42, 104, 0.9)',
    paddingTop: WINDOW_HEIGHT * 0.05,
    height: '45%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cardContent: {
    padding: Math.min(24, WINDOW_WIDTH * 0.06),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 4,
  },
  experience: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  location: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  bio: {
    color: 'white',
    marginBottom: 8,
  },
  education: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#3C78E3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  swipeIndicator: {
    position: 'absolute',
    top: WINDOW_HEIGHT * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});