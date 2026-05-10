import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const mutedText = "#687076";

export default function StorageDetailScreen() {
  const router = useRouter();

  // Fake Gallery Data
  const images = [
    "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400",
  ];

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        {/* 1. Image Gallery Header */}
        <View style={styles.galleryContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.mainImage}
              />
            ))}
          </ScrollView>

          {/* Floating Back & Share Buttons */}
          <View style={styles.floatingNav}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.circleBtn}
            >
              <Ionicons name="chevron-back" size={24} color="#151718" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="share-outline" size={22} color="#151718" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageCounter}>
            <Text style={styles.counterText}>1 / {images.length}</Text>
          </View>
        </View>

        {/* 2. Listing Info Header */}
        <View style={styles.infoSection}>
          <View style={styles.badgeRow}>
            <View style={styles.instantBadge}>
              <Ionicons name="flash" size={12} color="#fff" />
              <Text style={styles.badgeText}>INSTANT BOOK</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFB000" />
              <Text style={styles.ratingText}>4.9 (24 reviews)</Text>
            </View>
          </View>

          <Text style={styles.title}>Secure Climate-Controlled Basement</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={brandBlue} />
            <Text style={styles.addressText}>
              3500 Franklin Pike, Nashville, TN 37204
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 3. Map / Location Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.mapContainer}>
            {/* Fake Map Placeholder - Replace with react-native-maps in production */}
            <Image
              source={{
                uri: "https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+C83803(-86.7816,36.1627)/-86.7816,36.1627,14/600x300@2x?access_token=YOUR_TOKEN",
              }}
              style={styles.mapPlaceholder}
            />
            <View style={styles.mapOverlay}>
              <View style={styles.mapButton}>
                <Ionicons name="map-outline" size={18} color={brandBlue} />
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.locationNote}>
            Exact location provided after booking for security.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* 4. Features/Amenities */}
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

      {/* 5. Sticky Booking Bar */}
      <View style={styles.bottomBar}>
        <View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>$85</Text>
            <Text style={styles.perMonth}>/ month</Text>
          </View>
          <Text style={styles.availability}>Available now</Text>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => router.push("/booking-details")}
        >
          <Text style={styles.bookBtnText}>Reserve Space</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Sub-component for Features
const Feature = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon} size={20} color={brandBlue} />
    <Text style={styles.featureLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 120 },
  galleryContainer: { height: 300, position: "relative" },
  mainImage: { width: width, height: 300, resizeMode: "cover" },
  floatingNav: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageCounter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  counterText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  infoSection: { padding: 20 },
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
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800", marginLeft: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#151718",
    marginLeft: 4,
  },
  title: { fontSize: 24, fontWeight: "800", color: "#151718", marginBottom: 8 },
  locationRow: { flexDirection: "row", alignItems: "center" },
  addressText: { color: mutedText, fontSize: 14, marginLeft: 6 },
  divider: { height: 8, backgroundColor: "#F5F7F9" },
  section: { padding: 20 },
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
  mapPlaceholder: { width: "100%", height: "100%" },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
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
  },
  mapButtonText: { color: brandBlue, fontWeight: "700", marginLeft: 8 },
  locationNote: {
    fontSize: 12,
    color: mutedText,
    marginTop: 10,
    fontStyle: "italic",
  },
  featureGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
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
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ECEDEE",
    paddingBottom: Platform.OS === "ios" ? 35 : 15,
  },
  priceRow: { flexDirection: "row", alignItems: "baseline" },
  price: { fontSize: 24, fontWeight: "800", color: brandOrange },
  perMonth: { fontSize: 14, color: mutedText, marginLeft: 2 },
  availability: { fontSize: 12, color: "#2E7D32", fontWeight: "600" },
  bookBtn: {
    backgroundColor: brandBlue,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bookBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
