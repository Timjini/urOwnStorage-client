import { View, Text, StyleSheet } from "react-native"
import { bookingService } from "../services"

interface Props{
  price   : number
  period  : string
  currencySymbol: string
}
export const TotalToPay = ({price, period, currencySymbol}: Props) => {
  const totalPrice = bookingService.getPriceWithFee(price);
  return (
    <View>
      <Text style={styles.bottomPrice}>{currencySymbol}{totalPrice}</Text>
      <Text style={styles.bottomSub}>Total /{period}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomPrice: { fontSize: 20, fontWeight: '800', color: '#151718' },
  bottomSub: { fontSize: 12, color: '#687076' },
})