
import { View, StyleSheet } from 'react-native';
import EditProfileForm from '../../components/EditProfileForm';

export default function MentorEditProfile() {
  const initialData = {
    name: 'James Wilson',
    title: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    bio: 'Passionate about helping developers grow and reach their full potential. With over 10 years of experience in software development, I specialize in frontend technologies and building scalable applications.',
  };

  return (
    <View style={styles.container}>
      <EditProfileForm initialData={initialData} isMentor={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
