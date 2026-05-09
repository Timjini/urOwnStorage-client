import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const mutedText = '#687076';

const FAKE_MESSAGES = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    lastMessage: 'The gate code is 1234. Let me know when you arrive!',
    time: '10:24 AM',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: '2',
    name: 'Mike’s Garage Space',
    lastMessage: 'Is the 10x10 unit still available for next month?',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=mike',
  },
  {
    id: '3',
    name: 'Customer Support',
    lastMessage: 'Your identity verification has been approved.',
    time: 'Monday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=support',
  },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState(FAKE_MESSAGES);

  const renderItem = ({ item }: { item: typeof FAKE_MESSAGES[0] }) => (
    <TouchableOpacity style={styles.messageRow}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.rowHeader}>
          <Text style={[styles.name, item.unread && styles.unreadText]}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ECEDEE" />
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name="chatbubbles-outline" size={50} color={brandBlue} />
      </View>
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptySubtitle}>
        When you contact a host or receive a booking request, your conversations will appear here.
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Explore Spaces</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        {messages.length > 0 && (
          <TouchableOpacity onPress={() => setMessages([])}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={messages.length === 0 && { flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#151718',
  },
  clearText: {
    color: brandOrange,
    fontSize: 14,
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#F5F7F9',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: brandOrange,
    borderWidth: 2,
    borderColor: '#fff',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#151718',
  },
  unreadText: {
    fontWeight: '800',
  },
  time: {
    fontSize: 12,
    color: mutedText,
  },
  lastMessage: {
    fontSize: 14,
    color: mutedText,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#151718',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: mutedText,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: brandBlue,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});