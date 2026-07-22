import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";

interface UniversalPickerProps {
  label: string;
  date: Date;
  onChangeDate?: (date: Date) => void;
}

export default function UniversalPicker({
  label,
  date,
  onChangeDate,
}: UniversalPickerProps) {
  const displayDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const [tempDate, setTempDate] = useState(new Date());
  const [show, setShow] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.datePickerBox}
        onPress={() => {
          setTempDate(date || new Date());
          setShow(true);
        }}
      >
        <Text style={styles.dateLabel}>{label}</Text>
        <View style={styles.dateValueRow}>
          <Text style={styles.dateValue}>
            {displayDate(date || new Date())}
          </Text>
        </View>
      </TouchableOpacity>

      {show &&
        (Platform.OS === "ios" ? (
          <Modal transparent animationType="slide" visible={show}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {/* Header Action Bar */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (typeof onChangeDate === "function") {
                        onChangeDate(tempDate);
                      } else {
                        console.warn(
                          "UniversalPicker: The 'onChangeDate' prop is missing or not a function.",
                        );
                      }
                      setShow(false);
                    }}
                  >
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  locale="en-US"
                  onValueChange={(event, selectedDate) => {
                    if (selectedDate) setTempDate(selectedDate);
                  }}
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            locale="en-US"
            onValueChange={(event, selectedDate) => {
              setShow(false);
              if (selectedDate) {
                if (typeof onChangeDate === "function") {
                  onChangeDate(selectedDate);
                } else {
                  console.warn(
                    "UniversalPicker: The 'onChangeDate' prop is missing or not a function.",
                  );
                }
              }
            }}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ECEDEE",
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "relative",
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: brandOrange,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  dateValueRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateValue: { fontSize: 14, fontWeight: "600", color: "#151718" },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ECEDEE",
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cancelText: { color: "#687076", fontSize: 16, fontWeight: "500" },
  doneText: { color: brandBlue, fontSize: 16, fontWeight: "700" },
});
