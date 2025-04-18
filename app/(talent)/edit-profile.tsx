
import { View, StyleSheet } from 'react-native';
import EditProfileForm from '../components/EditProfileForm';

export default function TalentEditProfile() {
  const initialData = {
    name: 'John Doe',
    title: 'Frontend Developer',
    bio: 'Frontend Developer | UI/UX Enthusiast\nBuilding beautiful web experiences ✨',
  };

  return (
    <View style={styles.container}>
      <EditProfileForm initialData={initialData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
