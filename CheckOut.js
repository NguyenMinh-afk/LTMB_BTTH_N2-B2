import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CheckOutScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Checkout Header */}
      <View style={styles.checkoutHeader}>
        <Text style={styles.title}>Checkout</Text>
        <Image source={require("./assets/card.png")} style={styles.cardIcon} />
        <View style={styles.priceContainer}>
          <Text style={styles.totalAmount}>₹ 1,527</Text>
          <Text style={styles.subText}>Including GST (18%)</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === "credit" && styles.activePayment]}
          onPress={() => setPaymentMethod("credit")}
        >
            <View style={styles.credit}>
            <Image 
            source={require("./assets/mastercard.png")} 
            style={[styles.smallIcon, { marginRight: 5 }]} 
            />
            <Text style={[styles.paymentText, {color: "#fff"}]}>Credit card</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === "apple" && styles.inactivePayment]}
          onPress={() => setPaymentMethod("apple")}
        >
            <View style={styles.credit}>
            <Image 
            source={require("./assets/apple.png")} 
            style={[styles.smallIcon, { marginRight: 5, height: 30 }]} 
            />
          <Text style={styles.paymentText}>Apple Pay</Text></View>
        </TouchableOpacity>
      </View>

      {/* Card Details */}
      <Text style={styles.label}>Card number</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="5261 4141 0151 8472" keyboardType="numeric" />
        <View style={styles.cardIcons}>
          <Image source={require("./assets/red_orange.png")} style={[styles.smallIcon, {width: 27}]} />
          <Image source={require("./assets/mastercard.png")} style={styles.smallIcon} />
        </View>
      </View>

      <Text style={styles.label}>Cardholder name</Text>
      <TextInput style={styles.inputCVV} placeholder="Christie Doe" />

      {/* Expiry Date & CVV */}
      <View style={styles.row}>
        <View style={styles.expiryContainer}>
          <Text style={styles.label}>Expiry date</Text>
          <View style={styles.expiryInput}>
            <TextInput style={styles.expiryText} placeholder="06" keyboardType="numeric" />
            <Text style={styles.slash}> / </Text>
            <TextInput style={styles.expiryText} placeholder="2024" keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.cvvContainer}>
          <View style={styles.cvvHeader}>
            <Text style={styles.label}>CVV / CVC</Text>
            <Image source={require("./assets/question.png")} style={styles.helpIcon} />
          </View>
          <TextInput style={styles.inputCVV} placeholder="915" keyboardType="numeric" />
        </View>
      </View>

      <Text style={styles.infoText}>
        We will send you an order details to your email after the successful payment
      </Text>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate("SuccessScreen")}>
        <Image source={require("./assets/lock.png")} style={[styles.smallIcon, {marginRight: 5, marginLeft: 50}]} />
        <Text style={styles.payText}>Pay for the order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginTop: 10, marginBottom: 20 },
  backText: { fontSize: 22, color: "#333" },

  checkoutHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  title: { fontSize: 24, fontWeight: "bold" },
  cardIcon: { width: 24, height: 24, marginLeft: 5 },
  priceContainer: { alignItems: "flex-end" },
  totalAmount: { fontSize: 26, fontWeight: "bold", color: "#00C853" },
  subText: { fontSize: 14, color: "#666" },

  paymentMethods: { flexDirection: "row", marginBottom: 20 },
  paymentButton: { flex: 1, padding: 15, borderRadius: 10, alignItems: "center" },
  activePayment: { backgroundColor: "#00C853" },
  inactivePayment: { backgroundColor: "#f0f0f0" },
  paymentText: { fontSize: 16, fontWeight: "bold" },

  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, marginBottom: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  inputCVV: {flex: 1, padding: 10, color: "#666", fontSize: 16, backgroundColor: "#F8F8FB", borderRadius: 10, paddingHorizontal: 10,
    marginTop: 5,
    paddingVertical: 12,},
  input: { flex: 1, padding: 10, color: "#666", fontSize: 16, backgroundColor: "#F8F8FB" },
  cardIcons: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  smallIcon: { width: 30, height: 24, marginLeft: 5 },

  row: { flexDirection: "row", justifyContent: "space-between" },
  expiryContainer: { flex: 1, marginRight: 10 },
  credit: {flexDirection: "row"},
  expiryInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingVertical: 12,
  },
  expiryText: { flex: 1, fontSize: 16, textAlign: "center" },
  slash: { fontSize: 18, fontWeight: "bold", color: "#333" },

  cvvContainer: { flex: 1 },
  cvvHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  helpIcon: { width: 18, height: 18 },

  infoText: { fontSize: 14, color: "#666", marginTop: 20, textAlign: "center" },
  payButton: {
    backgroundColor: "#00C853",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  payText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default CheckOutScreen;
