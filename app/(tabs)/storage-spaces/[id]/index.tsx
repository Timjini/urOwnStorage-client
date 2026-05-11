import StorageSpaceView from '@/features/storage-space/components/storage-space-view';
import { useStorageSpaces } from '@/features/storage-space/hooks/useStorageSpace';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function StorageSpaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {data: space, isPending } = useStorageSpaces(id);

  if (!space)
  {
    <View>Something went wrong !</View>
  }
  return (
      <View style={styles.container}>
        <StorageSpaceView space={space} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});