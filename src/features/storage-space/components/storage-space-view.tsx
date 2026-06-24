import CustomBadge from "@/components/ui/badge";
import { getFullImageUrl } from "@/utils/imageHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  // Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StorageSpace } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StorageSpaceMap from "./storage-space-map";

const { width } = Dimensions.get("window");
const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const mutedText = "#687076";

interface StorageSpaceProps {
  space: StorageSpace;
}

const StorageSpaceView = ({ space }: StorageSpaceProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBooking = () => {
    router.push({
      pathname: "/(storage-spaces)/[id]/booking",
      params: { id: space.id },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
      >
        <View style={styles.galleryContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {space.imageUrls?.map((img, index) => (
              <Image
                key={index}
                source={{ uri: getFullImageUrl(img) }}
                style={styles.mainImage}
              />
            ))}
          </ScrollView>
          <View style={styles.imageCounter}>
            <Text style={styles.counterText}>1 / {space.imageUrls.length}</Text>
          </View>

          <View style={[styles.floatingNav, { top: Math.max(insets.top, 16) }]}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#151718" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
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
              {space.address.address1}, {space.address.city}{" "}
              {space.address.postcode}, {space.address.country}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.mapContainer, { margin: 20 }]}>
          <StorageSpaceMap
            markers={[
              {
                latitude: space.address.lat,
                longitude: space.address.lng,
                title: space.title,
              },
            ]}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Space Features</Text>
          <View style={styles.featureGrid}>
            <Feature icon="thermometer-outline" label="Climate Control" />
            <Feature icon="shield-checkmark-outline" label="24/7 Security" />
            <Feature icon="car-outline" label="Easy Loading" />
            <Feature icon="key-outline" label="Private Access" />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
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
  );
};

const Feature = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon} size={20} color={brandBlue} />
    <Text style={styles.featureLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  galleryContainer: {
    height: 300,
    position: "relative",
  },
  mainImage: {
    width: width,
    height: 300,
    resizeMode: "cover",
  },
  floatingNav: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  imageCounter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 5,
  },
  counterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoSection: {
    padding: 20,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  instantBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brandOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#151718",
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#151718",
    marginBottom: 8,
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
  divider: {
    height: 8,
    backgroundColor: "#F5F7F9",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 15,
  },
  mapContainer: {
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  mapPlaceholder: {
    width: "100%",
    height: "100%",
  },

  mapButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  mapButtonText: {
    color: brandBlue,
    fontWeight: "700",
    marginLeft: 8,
  },
  locationNote: {
    fontSize: 12,
    color: mutedText,
    marginTop: 10,
    fontStyle: "italic",
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  featureItem: {
    width: (width - 55) / 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F7F9",
    borderRadius: 12,
  },
  featureLabel: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "500",
    color: "#151718",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ECEDEE",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: brandOrange,
  },
  perMonth: {
    fontSize: 14,
    color: mutedText,
    marginLeft: 2,
  },
  availability: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
  },
  bookBtn: {
    backgroundColor: brandOrange,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bookBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default StorageSpaceView;
