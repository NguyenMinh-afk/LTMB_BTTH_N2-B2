import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ScanScreen from "./Scan";
import CartScreen from "./CartScreen";
import CheckOutScreen from "./CheckOut";
import SuccessScreen from "./SuccessScreen";

const insights = [
  { id: "1", title: "Scan new", subtitle: "Scanned 483", icon: require("./assets/anh_scan.png"), color: "#D6CCFF" },
  { id: "2", title: "Counterfeits", subtitle: "Counterfeited 32", icon: require("./assets/canh_bao.png"), color: "#FFE3D6" },
  { id: "3", title: "Success", subtitle: "Checkouts 8", icon: require("./assets/tick.png"), color: "#D6F8E3" },
  { id: "4", title: "Directory", subtitle: "History 26", icon: require("./assets/anh_direct.png"), color: "#D6EBFF" },
];

const exploreItems = [
  { id: "1", image: require("./assets/chai_sua.png") },
  { id: "2", image: require("./assets/chai_mau_nau.png") },
  { id: "3", image: require("./assets/nguoi_cam_chai.png") },
];

const HomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello 👋</Text>
        <Text style={styles.username}>Nguyễn Đức Minh</Text>
      </View>
      <Image source={require("./assets/NDM.png")} style={styles.profilePic} />
    </View>
    <Text style={styles.sectionTitle}>Your Insights</Text>
    <View style={styles.insightsContainer}>
      {insights.map((item) => (
        <View key={item.id} style={[styles.insightCard, { backgroundColor: item.color }]}>
          <Image source={item.icon} style={styles.insightIcon} />
          <Text style={styles.insightTitle}>{item.title}</Text>
          <Text style={styles.insightSubtitle}>{item.subtitle}</Text>
        </View>
      ))}
    </View>
    <View style={styles.exploreHeader}>
      <Text style={styles.sectionTitle}>Explore More</Text>
      <Text style={styles.exploreMoreText}>→</Text>
    </View>
    <FlatList horizontal data={exploreItems} renderItem={({ item }) => (
      <Image source={item.image} style={styles.exploreImage} />
    )} keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} />
  </View>
);

const Stack = createStackNavigator();
const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="CheckOut" component={CheckOutScreen} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const App = () => {
  const unreadNotifications = 3;
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;
          if (route.name === "Home") iconSource = require("./assets/home.png");
          else if (route.name === "Notification") iconSource = require("./assets/thong_bao.png");
          else if (route.name === "Scan") iconSource = require("./assets/scan.png");
          else if (route.name === "History") iconSource = require("./assets/time.png");
          else if (route.name === "CartStack") iconSource = require("./assets/gio_hang.png");

          return (
            <View>
              <Image source={iconSource} style={{ width: 24, height: 24, tintColor: color }} />
              {route.name === "Notification" && unreadNotifications > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadNotifications}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notification" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="History" component={HomeScreen} />
        <Tab.Screen name="CartStack" component={CartStack} options={{ title: "Cart" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 18, fontWeight: "bold" },
  username: { fontSize: 16, color: "#555" },
  profilePic: { width: 50, height: 50, borderRadius: 25 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 20 },
  exploreHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  exploreMoreText: { fontSize: 20, fontWeight: "bold" },
  insightsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20 },
  insightCard: { width: "47%", padding: 27, paddingBottom: 35, borderRadius: 12, alignItems: "center", marginBottom: 15 },
  insightIcon: { width: 30, height: 30, marginBottom: 10 },
  insightTitle: { fontSize: 16, fontWeight: "bold" },
  insightSubtitle: { fontSize: 12, color: "#666" },
  exploreImage: { width: 127, height: 125, marginRight: 15, borderRadius: 12 },
  tabBar: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#fff", elevation: 10 },
  badge: { position: "absolute", right: -6, top: -2, backgroundColor: "red", borderRadius: 10, width: 20, height: 20, justifyContent: "center", alignItems: "center" },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
});

export default App;