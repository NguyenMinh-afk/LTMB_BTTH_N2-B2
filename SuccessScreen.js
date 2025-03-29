import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Ảnh Robot */}
      <Image source={require("./assets/robot.png")} style={styles.robotImage} />

      {/* Tiêu đề */}
      <Text style={styles.title}>Payment Success, Yayy!</Text>
      <Text style={styles.subtitle}>
        we will send order details and invoice in{"\n"}your contact no. and registered email
      </Text>

      {/* Nút Check Details */}
      <TouchableOpacity>
        <Text style={styles.checkDetails}>Check Details →</Text>
      </TouchableOpacity>

      {/* Nút Download Invoice */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: 20 },

  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontSize: 20, color: "#666" },

  robotImage: { width: 200, height: 200, marginBottom: 20 },

  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 15 },
  subtitle: { fontSize: 14, color: "#777", textAlign: "center", marginBottom: 35 },

  checkDetails: { fontSize: 16, color: "#5A6CF3", fontWeight: "bold", marginBottom: 35 },

  downloadButton: { backgroundColor: "#5A6CF3", padding: 18, borderRadius: 10, width: "90%", alignItems: "center" },
  downloadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SuccessScreen;
