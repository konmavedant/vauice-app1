import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Image as ImageIcon, X } from 'lucide-react-native';
import { useState } from 'react';

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = () => {
    // For demo purposes, we'll use a static image
    setSelectedImage('https://images.unsplash.com/photo-1461749280684-dccba630e2f6');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <X size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
            />
            <TouchableOpacity
              style={styles.removeImage}
              onPress={() => setSelectedImage(null)}
            >
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImageSelect}
          >
            <ImageIcon size={48} color="#8e8e8e" />
            <Text style={styles.uploadText}>Upload a photo or video</Text>
          </TouchableOpacity>
        )}

        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          multiline
          value={caption}
          onChangeText={setCaption}
        />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  shareButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0095f6',
  },
  shareText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  uploadButton: {
    aspectRatio: 1,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dbdbdb',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8e8e8e',
  },
  imagePreviewContainer: {
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImage: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  captionInput: {
    marginTop: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});