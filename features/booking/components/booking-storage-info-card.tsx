import { StorageSpace } from "@/features/storage-space/types"
import { getFullImageUrl } from "@/utils/imageHelpers"
import { View, Image, Text, StyleSheet } from "react-native"

interface CardProps {
  space:  StorageSpace
}
export const BookingStorageInfoCard = ({space}: CardProps) => {
  <View style={styles.listingPreview}>
    <Image 
      source={{ uri: getFullImageUrl(space.imageUrls?.[0]) }}
      style={styles.previewImage} 
    />
    <View style={styles.previewText}>
      <Text style={styles.listingTitle}>Climate Controlled Basement</Text>
      <Text style={styles.listingLocation}>3500 Franklin Pike, Nashville</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  listingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
    marginBottom: 25,
  },
  previewImage: { width: 60, height: 60, borderRadius: 8 },
  previewText: { marginLeft: 12, flex: 1 },
  listingTitle: { fontSize: 16, fontWeight: '700', color: '#151718' },
  listingLocation: { fontSize: 13, color: '#687076', marginTop: 2 }
})