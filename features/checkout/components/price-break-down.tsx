import { StorageSpace } from "@/features/storage-space/types";
import { StyleSheet, Text, View } from "react-native";
import { checkoutService } from "../services";

interface CardProps {
  space:  StorageSpace
}

const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";
export const PriceBreakDown = ({space}: CardProps) => {

  const totalPrice = checkoutService.getPriceWithFee(space.amount);

  return (
    <View style={styles.summaryBox}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>{space.formattedPrice} x 1 {space.billingInterval}</Text>
        <Text style={styles.summaryText}>{space.formattedPrice}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Service Fee</Text>
        <Text style={styles.summaryText}>$5.00</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>{space.currencySymbol}{totalPrice}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  summaryBox: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: lightBorder,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryText: { color: "#687076", fontSize: 14 },
  totalRow: { marginTop: 8, paddingTop: 8 },
  totalText: { fontSize: 16, fontWeight: "700", color: "#151718" },
  totalPrice: { fontSize: 18, fontWeight: "800", color: brandOrange },
})