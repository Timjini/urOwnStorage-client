import { Theme } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SkeletonItem = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ backgroundColor: "#E1E9EE" }, style, { opacity }]}
    />
  );
};

export const StorageSpaceSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Image Placeholder */}
      <SkeletonItem style={styles.imagePlaceholder} />

      <View style={styles.content}>
        {/* Title and Rating Row */}
        <View style={styles.headerRow}>
          <SkeletonItem style={styles.titleLine} />
          <SkeletonItem style={styles.ratingBadge} />
        </View>

        {/* Location Row */}
        <SkeletonItem style={styles.locationLine} />

        {/* Details Row */}
        <View style={styles.detailsRow}>
          <SkeletonItem style={styles.detailBox} />
          <SkeletonItem style={styles.detailBox} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <SkeletonItem style={styles.priceLabel} />
            <SkeletonItem style={styles.priceValue} />
          </View>
          <View style={styles.actionGroup}>
            <SkeletonItem style={styles.btnSmall} />
            <SkeletonItem style={styles.btnLarge} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
  },
  imagePlaceholder: { height: 180, width: "100%" },
  content: { padding: 15 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleLine: { height: 20, width: "60%", borderRadius: 4 },
  ratingBadge: { height: 20, width: 40, borderRadius: 4 },
  locationLine: { height: 14, width: "80%", borderRadius: 4, marginBottom: 15 },
  detailsRow: { flexDirection: "row", gap: 15, marginBottom: 15 },
  detailBox: { height: 16, width: 80, borderRadius: 4 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  priceLabel: { height: 10, width: 50, borderRadius: 2, marginBottom: 5 },
  priceValue: { height: 24, width: 80, borderRadius: 4 },
  actionGroup: { flexDirection: "row", gap: 8 },
  btnSmall: { height: 40, width: 60, borderRadius: 10 },
  btnLarge: { height: 40, width: 80, borderRadius: 10 },
});
