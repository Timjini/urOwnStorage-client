import React, { useState } from "react";
import {
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function FilterScreen() {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = async (text: string) => {
    setAddress(text);

    // 1. If input is empty or just spaces, clear suggestions and stop
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    // 2. Fetch live data from the Mapbox API
    try {
      const accessToken = process.env.MAPBOX_API_KEY;
      const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(text)}&access_token=${accessToken}&limit=5`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Mapbox API error: ${response.status}`);
      }

      const data = await response.json();

      // 3. Map the features array safely to extract the full addresses
      if (data && data.features) {
        setSuggestions(
          data.features.map((feature: any) => feature.properties.full_address),
        );
      }
    } catch (error) {
      console.error("Failed to fetch address suggestions:", error);
      // Optional: setSuggestions([]) here if you want to clear the list on error
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    console.log("clicked == handleSelectSuggestion", suggestion);
    setAddress(suggestion);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Location</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter an address or city..."
          placeholderTextColor="#9BA1A6"
          onChangeText={handleInputChange}
          value={address}
        />
      </View>

      {/* Floating Suggestions List */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}

      {/* Preview of the selected state */}
      {address ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Selected Address:</Text>
          <Text style={styles.resultText}>{address}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
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
    zIndex: 999, // Ensures drop down stays over elements below it
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
  resultContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#EBF3FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D0E2FF",
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0043CE",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  resultText: {
    fontSize: 15,
    color: "#001D6C",
  },
});
