import { View, Text, StyleSheet } from "react-native"

interface Props{
  price   : number
  period  : string
  currencySymbol: string
}
export const TotalToPay = ({price, period, currencySymbol}: Props) => {
  return (
    <View>
      <Text style={styles.bottomPrice}>{currencySymbol}{price}</Text>
      <Text style={styles.bottomSub}>Total for {period} days</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomPrice: { fontSize: 20, fontWeight: '800', color: '#151718' },
  bottomSub: { fontSize: 12, color: '#687076' },
})