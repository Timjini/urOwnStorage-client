import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotificationDrawer } from "./SideDrawer";
import { useRouter } from "expo-router";

const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";

export const DashboardHeader = () => {
  const [notifVisible, setNotifVisible] = useState(false);
  const router = useRouter();

  return (
    <>
      <View style={styles.headerContainer}>
        {/* Changed from a View to a TouchableOpacity button */}
        <TouchableOpacity
          style={styles.filterSection}
          onPress={() => router.push("/(storage-spaces)/filter")} // Routes to your filter screen
          activeOpacity={0.7}
        >
          <Ionicons
            name="options-outline" // Swapped search icon for a filter/options icon
            size={18}
            color="#687076"
            style={styles.filterIcon}
          />
          <Text style={styles.filterPlaceholder}>
            Filter by address, space type...
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bellButton}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={26} color={brandBlue} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <NotificationDrawer
        visible={notifVisible}
        onClose={() => setNotifVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: lightBorder,
  },
  filterSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F9",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 15,
    height: 40, // Keeps the uniform layout height of the old input box
  },
  filterIcon: {
    padding: 5,
  },
  filterPlaceholder: {
    flex: 1,
    color: "#9BA1A6", // Matches the original placeholder text color
    fontSize: 14,
    paddingLeft: 4,
  },
  bellButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 2,
    backgroundColor: "#C83803",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
