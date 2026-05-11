import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface BadgeProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  badgeStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}

const CustomBadge = ({
  icon,
  text,
  badgeStyle,
  textStyle,
  iconColor = "#fff",
}: BadgeProps) => {
  return (
    <View style={[badgeStyle]}>
      <Ionicons name={icon} size={12} color={iconColor} />
      <Text style={[textStyle]}>{text}</Text>
    </View>
  );
};

export default CustomBadge;
