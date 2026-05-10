import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';

export const NotificationDrawer = ({ visible, onClose }: any) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);


  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View 
          style={[
            styles.overlay, 
            { opacity: slideAnim.interpolate({ inputRange: [0, width], outputRange: [0.5, 0] }) }
          ]} 
        />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#151718" />
          </TouchableOpacity>
        </View>

        <View style={styles.notifItem}>
          <View style={[styles.dot, { backgroundColor: brandOrange }]} />
          <View>
            <Text style={styles.notifTitle}>Booking Confirmed</Text>
            <Text style={styles.notifBody}>Your storage at Franklin Pike is ready.</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.85,
    backgroundColor: '#fff',
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEDEE',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: brandBlue,
  },
  notifItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  notifTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#151718',
  },
  notifBody: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  }
});