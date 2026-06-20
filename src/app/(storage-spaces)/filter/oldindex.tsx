// // app/filters.tsx
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AddressSearchInput } from "./AddressSearchInput";

// const ALLOWED_INTERVALS = ["day", "week", "month", "year"];
// const SPACE_TYPES = [
//   "Garage",
//   "Room",
//   "Driveway",
//   "Workshop",
//   "Warehouse",
//   "Office",
//   "Building",
//   "Basement",
//   "Empty Lot",
//   "Backyard",
//   "Other Space",
// ];
// const FEATURE_OPTIONS = [
//   "Climate Control",
//   "24/7 Access",
//   "CCTV",
//   "Alarm System",
//   "Private Entrance",
//   "Smoke Alarm",
// ];

// const brandBlue = "#0a7ea4";

// export default function FiltersScreen() {
//   const router = useRouter();

//   // State variables to hold selections
//   const [addressData, setAddressData] = useState<SelectedAddressData | null>(
//     null,
//   );

//   const handleAddressSelect = (data: SelectedAddressData) => {
//     setAddressData(data);
//     // You now have immediate access to:
//     // data.address -> "Bornholmer Straße, Berlin..."
//     // data.lng     -> 13.402742
//     // data.lat     -> 52.554285
//     console.log("Selected Location Details:", data);
//   };
//   const [selectedInterval, setSelectedInterval] = useState("");
//   const [selectedSpaceType, setSelectedSpaceType] = useState("");
//   const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

//   const toggleFeature = (feature: string) => {
//     if (selectedFeatures.includes(feature)) {
//       setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
//     } else {
//       setSelectedFeatures([...selectedFeatures, feature]);
//     }
//   };

//   const handleApply = () => {
//     console.log({
//       selectedInterval,
//       selectedSpaceType,
//       selectedFeatures,
//     });
//     router.back();
//   };

//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       {/* Header Bar */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.closeButton}
//         >
//           <Ionicons name="close" size={24} color="#151718" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Filter Options</Text>
//         <TouchableOpacity
//           onPress={() => {
//             setAddress("");
//             setSelectedInterval("");
//             setSelectedSpaceType("");
//             setSelectedFeatures([]);
//           }}
//         >
//           <Text style={styles.resetText}>Reset All</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Address Search */}
//         <Text style={styles.sectionTitle}>Location Address</Text>
//         <AddressSearchInput onAddressSelect={handleAddressSelect} />

//         {/* Space Types */}
//         <Text style={styles.sectionTitle}>Space Type</Text>
//         <View style={styles.chipContainer}>
//           {SPACE_TYPES.map((type) => {
//             const isSelected = selectedSpaceType === type;
//             return (
//               <TouchableOpacity
//                 key={type}
//                 style={[styles.chip, isSelected && styles.chipSelected]}
//                 onPress={() => setSelectedSpaceType(isSelected ? "" : type)}
//               >
//                 <Text
//                   style={[
//                     styles.chipText,
//                     isSelected && styles.chipTextSelected,
//                   ]}
//                 >
//                   {type}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* Features Selection */}
//         <Text style={styles.sectionTitle}>Key Features</Text>
//         <View style={styles.chipContainer}>
//           {FEATURE_OPTIONS.map((feature) => {
//             const isSelected = selectedFeatures.includes(feature);
//             return (
//               <TouchableOpacity
//                 key={feature}
//                 style={[styles.chip, isSelected && styles.chipSelected]}
//                 onPress={() => toggleFeature(feature)}
//               >
//                 <Text
//                   style={[
//                     styles.chipText,
//                     isSelected && styles.chipTextSelected,
//                   ]}
//                 >
//                   {feature}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* Allowed Intervals */}
//         <Text style={styles.sectionTitle}>Rental Frequency / Interval</Text>
//         <View style={styles.chipContainer}>
//           {ALLOWED_INTERVALS.map((interval) => {
//             const isSelected = selectedInterval === interval;
//             return (
//               <TouchableOpacity
//                 key={interval}
//                 style={[styles.chip, isSelected && styles.chipSelected]}
//                 onPress={() => setSelectedInterval(isSelected ? "" : interval)}
//               >
//                 <Text
//                   style={[
//                     styles.chipText,
//                     isSelected && styles.chipTextSelected,
//                     { textTransform: "capitalize" },
//                   ]}
//                 >
//                   per {interval}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ScrollView>

//       {/* Sticky Action Footer */}
//       <View style={styles.footerContainer}>
//         <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
//           <Text style={styles.applyButtonText}>Apply Filters</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ECEDEE",
//   },
//   closeButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#151718",
//   },
//   resetText: {
//     color: "#687076",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#151718",
//     marginTop: 20,
//     marginBottom: 12,
//   },
//   searchSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F5F7F9",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 44,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     color: "#151718",
//     fontSize: 15,
//   },
//   chipContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   chip: {
//     backgroundColor: "#F5F7F9",
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "transparent",
//   },
//   chipSelected: {
//     backgroundColor: "#E6F4EA",
//     borderColor: brandBlue,
//   },
//   chipText: {
//     fontSize: 13,
//     color: "#484E54",
//   },
//   chipTextSelected: {
//     color: brandBlue,
//     fontWeight: "600",
//   },
//   footerContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#ECEDEE",
//   },
//   applyButton: {
//     backgroundColor: brandBlue,
//     borderRadius: 10,
//     height: 48,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   applyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
