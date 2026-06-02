import { useRouter, Href } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RoutingButtonProps {
  route: Href; 
  label?: string;
}

const brandBlue = '#0b1528';
export const PrimaryRoutingButton = ({ route, label = "Book Now" }: RoutingButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.bookButton} 
      onPress={() => router.push(route)}
    >
      <Text style={styles.bookButtonText}>{label}</Text>
      <Ionicons name="arrow-forward" size={16} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookButton: {
    backgroundColor: brandBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  }
})