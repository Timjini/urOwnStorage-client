import CustomBadge from "@/components/ui/badge";
import { getFullImageUrl } from "@/utils/imageHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StorageSpace } from "../types";
import StorageSpaceMap from "./storage-space-map";

const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const mutedText = "#687076";

interface StorageSpaceProps {
  space: StorageSpace;
}

const StorageSpaceView = ({ space }: StorageSpaceProps) => {
  const router = useRouter();

  const handleBooking = () => {
    router.push({
      pathname: "/(storage-spaces)/[id]/booking",
      params: { id: space.id },
    });
  };

  const images = space.imageUrls || [];

  return (
    <View style={styles.webContainer}>
      <ScrollView
        style={styles.webLeftScroll}
        contentContainerStyle={styles.webLeftContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <View style={styles.badgeRow}>
            {!!space?.instantBooking && (
              <CustomBadge
                icon="flash"
                text="INSTANT BOOK"
                badgeStyle={styles.instantBadge}
                textStyle={styles.badgeText}
                iconColor="#fff"
              />
            )}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFB000" />
              <Text style={styles.ratingText}>4.9 (24 reviews)</Text>
            </View>
          </View>
          <Text style={styles.title}>{space.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={brandBlue} />
            <Text style={styles.addressText}>
              {space.address.address1}, {space.address.city},{" "}
              {space.address.postcode}, {space.address.country}
            </Text>
          </View>
        </View>

        <View style={styles.webMapWrapper}>
          <StorageSpaceMap
            markers={[
              {
                id: space.id,
                latitude: space.address.lat,
                longitude: space.address.lng,
                title: space.title,
              },
            ]}
          />
        </View>

        <View style={styles.webDivider} />

        <View style={styles.sectionNoPadding}>
          <Text style={styles.sectionTitle}>Space Features</Text>
          <View style={styles.webFeatureGrid}>
            <WebFeature icon="thermometer-outline" label="Climate Control" />
            <WebFeature icon="shield-checkmark-outline" label="24/7 Security" />
            <WebFeature icon="car-outline" label="Easy Loading" />
            <WebFeature icon="key-outline" label="Private Access" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.webRightPanel}>
        <View style={styles.sidebarContainer}>
          <View style={styles.imageContainerFrame}>
            {images.length > 0 ? (
              <Image
                source={{ uri: getFullImageUrl(images[0]) }}
                style={styles.webShowcaseImage}
              />
            ) : (
              <View style={styles.fallbackPlaceholder}>
                <Ionicons name="image-outline" size={48} color="#9CA3AF" />
                <Text style={{ color: "#9CA3AF", marginTop: 8 }}>
                  No Images Available
                </Text>
              </View>
            )}
          </View>

          <View style={styles.webCheckoutCard}>
            <View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{space.formattedPrice}</Text>
                <Text style={styles.perMonth}>/ {space.billingInterval}</Text>
              </View>
              <Text style={styles.availability}>Available now</Text>
            </View>

            <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
              <Text style={styles.bookBtnText}>Reserve Space</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const WebFeature = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.webFeatureItem}>
    <Ionicons name={icon} size={22} color={brandBlue} />
    <Text style={styles.featureLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  webLeftScroll: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
  },
  webLeftContent: {
    padding: 40,
  },
  headerBlock: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#151718",
    marginVertical: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    color: mutedText,
    fontSize: 14,
    marginLeft: 6,
  },
  webMapWrapper: {
    height: 380,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  webRightPanel: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 40,
  },
  sidebarContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageContainerFrame: {
    flex: 1,
    width: "100%",
    minHeight: 350,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 24,
  },
  webShowcaseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  fallbackPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  webCheckoutCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionNoPadding: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 16,
  },
  webFeatureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  webFeatureItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  featureLabel: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#151718",
  },
  webDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 32,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  instantBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brandOrange,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#151718",
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 28,
    fontWeight: "800",
    color: brandOrange,
  },
  perMonth: {
    fontSize: 15,
    color: mutedText,
    marginLeft: 4,
  },
  availability: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
    marginTop: 4,
  },
  bookBtn: {
    backgroundColor: brandOrange,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default StorageSpaceView;
