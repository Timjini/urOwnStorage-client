import { NOTIFICATIONS } from "@/services/mock-data";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const mutedText = "#687076";

export default function NotificationsScreen() {
  const [data, setData] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setData(data.map((item) => ({ ...item, read: true })));
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.notiCard, !item.read && styles.unreadCard]}
    >
      <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
        <Ionicons name={item.icon} size={22} color={item.color} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={[styles.notiTitle, !item.read && styles.boldText]}>
            {item.title}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.messageText} numberOfLines={2}>
          {item.message}
        </Text>
      </View>

      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Activity</Text>
          <Text style={styles.headerSub}>Stay updated on your rentals</Text>
        </View>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-off-outline"
              size={60}
              color="#ECEDEE"
            />
            <Text style={styles.emptyText}>All caught up!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#151718",
  },
  headerSub: {
    fontSize: 14,
    color: mutedText,
    marginTop: 2,
  },
  markReadText: {
    color: brandBlue,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  listPadding: {
    paddingVertical: 10,
  },
  notiCard: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: "#F9FBFF",
    borderLeftWidth: 4,
    borderLeftColor: brandOrange,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notiTitle: {
    fontSize: 15,
    color: "#151718",
    fontWeight: "500",
  },
  boldText: {
    fontWeight: "700",
  },
  timeText: {
    fontSize: 12,
    color: mutedText,
  },
  messageText: {
    fontSize: 13,
    color: mutedText,
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: brandOrange,
    marginLeft: 10,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: mutedText,
    fontWeight: "500",
  },
});
