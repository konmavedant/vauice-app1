import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface LocationPickerProps {
  location: string | null;
  onLocationSelect: (location: string | null) => void;
}

export default function LocationPicker({ location, onLocationSelect }: LocationPickerProps) {
  const handleLocationSelect = () => {
    // For demo, we'll toggle between null and a sample location
    onLocationSelect(location ? null : 'San Francisco, CA');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLocationSelect}>
      <MapPin size={20} color={location ? '#FF6B6B' : '#666'} />
      <Text style={[styles.text, location && styles.activeText]}>
        {location || 'Add Location'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  activeText: {
    color: '#FF6B6B',
  },
});