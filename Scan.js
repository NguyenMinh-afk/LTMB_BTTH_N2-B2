import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

const ScanScreen = ({ navigation }) => {
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: height * 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      {/* Full-Screen Product Image */}
      <Image source={require("./assets/nuoc_cam.png")} style={styles.productImage} />

      {/* Scanner Frame */}
      <View style={styles.scannerFrame}>
        {/* Animated Scan Line */}
        <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineAnim }] }]} />
      </View>

      {/* Product Info */}
      <View style={styles.productInfoContainer}>
        <Image source={require("./assets/nuoc_cam.png")} style={styles.productThumbnail} />
        <Text style={styles.productTitle}>Orange Juice</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F1EB", alignItems: "center", justifyContent: "center" },
  backButton: { position: "absolute", top: 50, left: 20, padding: 10, backgroundColor: "#fff", borderRadius: 50, zIndex: 2, elevation: 3 },
  backIcon: { fontSize: 24, fontWeight: "bold", color: "#4A90E2" },
  productImage: { width: width, height: height, resizeMode: "cover", position: "absolute" },
  
  scannerFrame: { 
    position: "absolute", 
    width: width * 0.8, 
    height: height * 0.4, 
    borderWidth: 3, 
    borderColor: "#FFFFFF", 
    borderRadius: 20, 
    top: height * 0.25, 
    justifyContent: "center", 
    alignItems: "center",
    overflow: "hidden",
  },

  scanLine: {
    position: "absolute",
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 2,
  },

  productInfoContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 15, 
    borderRadius: 20, 
    position: "absolute", 
    bottom: 50, 
    width: width * 0.9, 
    elevation: 5,
  },
  
  productThumbnail: { width: 40, height: 40, borderRadius: 10, marginRight: 10 },
  productTitle: { fontSize: 16, fontWeight: "bold", flex: 1 },
  
  addButton: { 
    width: 40, 
    height: 40, 
    backgroundColor: "#4A90E2", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 20, 
    elevation: 3,
  },
  
  addButtonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});

export default ScanScreen;
