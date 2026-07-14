import { Theme } from "@/constants/theme";
import { formatAddress } from "@/utils/addressHelper";
import { getFullImageUrl } from "@/utils/imageHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StorageSpace } from "../types";

type CardProps = {
  space: StorageSpace;
};

export const StorageSpaceCard = ({ space }: CardProps) => {
  const router = useRouter();

  const formatedAddress = formatAddress(space.address);

  const handleViewDetails = () => {
    router.push({
      pathname: "/(storage-spaces)/[id]",
      params: { id: space.id },
    });
  };

  const handleBooking = () => {
    router.push({
      pathname: "/(storage-spaces)/[id]/booking",
      params: { id: space.id },
    });
  };

  // console.log("space", space);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={handleViewDetails}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getFullImageUrl(space.imageUrls?.[0]) }}
          style={styles.image}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{space.spaceType}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {space.title}
          </Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={Theme.colors.textMuted}
          />
          <Text style={styles.locationText}>{formatedAddress}</Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons
              name="cube-outline"
              size={16}
              color={Theme.colors.secondary}
            />
            <Text style={styles.detailText}>
              {space.height}x{space.width}x{space.length} {space.sizeUnit}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons
              name="shield-checkmark-outline"
              size={16}
              color={Theme.colors.secondary}
            />
            <Text style={styles.detailText}>Insured</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>{space.billingInterval}</Text>
            <Text style={styles.priceValue}>
              {space.formattedPrice}
              <Text style={styles.priceUnit}>/{space.billingInterval}</Text>
            </Text>
          </View>

          <View style={styles.actionGroup}>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={handleViewDetails}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewButton} onPress={handleBooking}>
              <Text style={styles.viewButtonText}>Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: { height: 180, position: "relative" },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: Theme.colors.background,
    fontSize: 12,
    fontWeight: "600",
  },
  content: { padding: 15 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: { fontSize: 17, fontWeight: "700", color: Theme.colors.text, flex: 1 },
  rating: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontSize: 13, fontWeight: "600", color: Theme.colors.text },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  locationText: { fontSize: 13, color: Theme.colors.textMuted },
  detailsRow: { flexDirection: "row", gap: 15, marginBottom: 15 },
  detailItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailText: { fontSize: 13, color: Theme.colors.text, fontWeight: "500" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.surface,
  },
  priceLabel: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  priceValue: { fontSize: 20, fontWeight: "800", color: Theme.colors.primary },
  priceUnit: { fontSize: 12, fontWeight: "500", color: Theme.colors.textMuted },

  actionGroup: { flexDirection: "row", gap: 8, alignItems: "center" },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  viewButtonText: {
    color: Theme.colors.secondary,
    fontWeight: "700",
    fontSize: 14,
  },
});
