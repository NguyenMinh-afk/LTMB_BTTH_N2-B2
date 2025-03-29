import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  
  const [cartItems, setCartItems] = useState([
    { id: "1", name: "Orange Juice", brand: "Lauren's", price: 149, quantity: 2, image: require("./assets/nuoc_cam.png") },
    { id: "2", name: "Skimmed Milk", brand: "Baskin's", price: 129, quantity: 2, image: require("./assets/chai_sua.png") },
    { id: "3", name: "Aloe Vera Lotion", brand: "Marley's", price: 1249, quantity: 2, image: require("./assets/chai_mau_nau.png") },
  ]);

  const updateQuantity = (id, type) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, "decrease")} style={styles.quantityButton}>
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, "increase")} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Your Cart 👍</Text>

      {/* Cart List */}
      <FlatList data={cartItems} keyExtractor={(item) => item.id} renderItem={renderItem} />

      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>₹ {getTotal()}</Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("CheckOut")}>
        <Text style={styles.checkoutText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  // Back Button
  backButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  backText: {
    fontSize: 22,
    color: "#333",
  },

  // Title
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },

  // Cart Item Container
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 25,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  brand: {
    fontSize: 12,
    color: "#888",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#E67E22",
    fontWeight: "bold",
  },

  // Quantity Controls
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#FF9F43",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  quantityText: {
    fontSize: 12,
    color: "#fff",
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Total Price
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E74C3C",
  },

  // Checkout Button
  checkoutButton: {
    backgroundColor: "#E67E22",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  checkoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CartScreen;
