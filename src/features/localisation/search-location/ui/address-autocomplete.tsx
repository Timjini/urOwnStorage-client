import React, { useState } from "react";
import {
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface LocationData {
  address: string;
  coordinates: [number, number];
}

interface AddressAutocompleteProps {
  onLocationSelect: (data: LocationData) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface SuggestionItem {
  id: string;
  full_address: string;
  coordinates: [number, number];
}

export default function AddressAutocomplete({
  onLocationSelect,
  placeholder = "Enter an address or city...",
  containerStyle,
}: AddressAutocompleteProps) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  const handleInputChange = async (text: string) => {
    setAddress(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
        text,
      )}&access_token=${process.env.EXPO_PUBLIC_MAPBOX_API_KEY}&limit=5`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Mapbox API error: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.features) {
        const formattedSuggestions: SuggestionItem[] = data.features.map(
          (feature: any) => ({
            id: feature.id || feature.properties.mapbox_id,
            full_address: feature.properties.full_address,
            coordinates: feature.geometry.coordinates,
          }),
        );
        setSuggestions(formattedSuggestions);
      }
    } catch (error) {
      console.error("Failed to fetch address suggestions:", error);
    }
  };

  const handleSelectSuggestion = (item: SuggestionItem) => {
    setAddress(item.full_address);
    setSuggestions([]);

    onLocationSelect({
      address: item.full_address,
      coordinates: item.coordinates,
    });
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9BA1A6"
          onChangeText={handleInputChange}
          value={address}
        />
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item)}
              >
                <Text style={styles.suggestionText}>{item.full_address}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1A1A1A",
  },
  suggestionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 240,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
  },
  suggestionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  suggestionText: {
    fontSize: 15,
    color: "#333333",
  },
});
