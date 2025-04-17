import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Image as ImageIcon, X } from 'lucide-react-native';

interface MediaPickerProps {
  selectedMedia: string[];
  onMediaSelect: (media: string[]) => void;
  onRemoveMedia: (index: number) => void;
}

export default function MediaPicker({ selectedMedia, onMediaSelect, onRemoveMedia }: MediaPickerProps) {
  const handleMediaSelect = () => {
    // For demo, we'll add a sample image
    onMediaSelect([...selectedMedia, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6']);
  };

  return (
    <View style={styles.container}>
      {selectedMedia.length > 0 ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.mediaPreview}
        >
          {selectedMedia.map((media, index) => (
            <View key={index} style={styles.mediaItem}>
              <Image source={{ uri: media }} style={styles.mediaImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveMedia(index)}
              >
                <X size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={handleMediaSelect}
          >
            <ImageIcon size={24} color="#666" />
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleMediaSelect}
        >
          <ImageIcon size={32} color="#666" />
          <Text style={styles.uploadText}>Add Photos/Videos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
  },
  mediaPreview: {
    flexDirection: 'row',
  },
  mediaItem: {
    position: 'relative',
    marginRight: 8,
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  addMoreButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});