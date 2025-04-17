import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Globe, Users, Lock } from 'lucide-react-native';
import { useState } from 'react';

type Privacy = 'public' | 'friends' | 'private';

interface PrivacySelectorProps {
  privacy: Privacy;
  onPrivacyChange: (privacy: Privacy) => void;
}

const PRIVACY_OPTIONS: { value: Privacy; label: string; icon: any }[] = [
  { value: 'public', label: 'Public', icon: Globe },
  { value: 'friends', label: 'Friends', icon: Users },
  { value: 'private', label: 'Private', icon: Lock },
];

export default function PrivacySelector({ privacy, onPrivacyChange }: PrivacySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = PRIVACY_OPTIONS.find(option => option.value === privacy);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.selector} 
        onPress={() => setIsOpen(!isOpen)}
      >
        {selectedOption && (
          <>
            <selectedOption.icon size={20} color="#666" />
            <Text style={styles.selectorText}>{selectedOption.label}</Text>
          </>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {PRIVACY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                privacy === option.value && styles.selectedOption,
              ]}
              onPress={() => {
                onPrivacyChange(option.value);
                setIsOpen(false);
              }}
            >
              <option.icon 
                size={20} 
                color={privacy === option.value ? '#FF6B6B' : '#666'} 
              />
              <Text style={[
                styles.optionText,
                privacy === option.value && styles.selectedOptionText,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  selectorText: {
    fontSize: 16,
    color: '#666',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderRadius: 6,
  },
  selectedOption: {
    backgroundColor: '#fff2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  selectedOptionText: {
    color: '#FF6B6B',
  },
});