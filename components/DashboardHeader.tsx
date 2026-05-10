import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { NotificationDrawer } from "./SideDrawer";

const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";

export const DashboardHeader = () => {
  const [notifVisible, setNotifVisible] = useState(false);
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.searchSection}>
          <Ionicons
            name="search"
            size={18}
            color="#687076"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for storage spaces or addresses..."
            placeholderTextColor="#9BA1A6"
            underlineColorAndroid="transparent"
          />
        </View>

        <TouchableOpacity style={styles.bellButton}>
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
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F9",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  searchIcon: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#151718",
    fontSize: 14,
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
