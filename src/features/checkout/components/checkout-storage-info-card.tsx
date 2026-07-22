import { StorageSpace } from "@/entities/storage-space/model";
import { formatAddress } from "@/utils/addressHelper";
import { getFullImageUrl } from "@/utils/imageHelpers";
import { Image, StyleSheet, Text, View } from "react-native";

interface CardProps {
  space: StorageSpace;
}
export const BookingStorageInfoCard = ({ space }: CardProps) => {
  const formatedAddress = formatAddress(space.address);
  return (
    <View style={styles.listingPreview}>
      <Image
        source={{ uri: getFullImageUrl(space.imageUrls?.[0]) }}
        style={styles.previewImage}
      />
      <View style={styles.previewText}>
        <Text style={styles.listingTitle}>{space.title}</Text>
        <Text style={styles.listingLocation}>{formatedAddress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listingPreview: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  previewImage: { width: 60, height: 60, borderRadius: 8 },
  previewText: { marginLeft: 12, flex: 1 },
  listingTitle: { fontSize: 16, fontWeight: "700", color: "#151718" },
  listingLocation: { fontSize: 13, color: "#687076", marginTop: 2 },
});
