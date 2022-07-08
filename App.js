import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TextInput, StatusBar, Appearance, RefreshControl, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import CoinItem from "./components/CoinItem";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadData();

    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme);
  }, []);

  async function loadData() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  }

  function changeTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
  }

  return (
    <View style={theme === 'light' ? styles.container : styles.container_dark}>
      {theme === 'light' ? <StatusBar backgroundColor="#5121AD" /> : <StatusBar backgroundColor="#141414" />}
      <View style={styles.header}>
        {theme === 'light' ?
        <Image
          style={styles.logo}
          source={require("./assets/crypto-isotipo.png")}
        /> :
        <Image
          style={styles.logo}
          source={require("./assets/crypto-isotipo-dark.png")}
        />}
        <TextInput
          style={theme === 'light' ? styles.searchInput : styles.searchInput_dark}
          placeholder="Search a coin..."
          placeholderTextColor="#858585"
          onChangeText={(text) => setSearch(text)}
        />
        {theme === 'light' ? 
        <Icon 
          style={styles.icon}
          name="moon" 
          size={30}
          color="#5121AD"
          onPress={() => changeTheme()}
        /> :
        <Icon 
          style={styles.icon}
          name="sun" 
          size={30}
          color="#96D0FF"
          onPress={() => changeTheme()}
        />}
      </View>

      <FlatList
        style={styles.list}
        data={coins.filter((coin) => coin.name.includes(search) || coin.symbol.includes(search.toLowerCase()))}
        renderItem={({ item }) => {
          return <CoinItem coin={item} themeHook={theme} />;
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          theme === 'light' ?
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await loadData();
              setRefreshing(false);
            }}
            colors={["#5121AD"]}
            progressBackgroundColor={"#E6FAFC"}
          /> :
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await loadData();
              setRefreshing(false);
            }}
            colors={["#96D0FF"]}
            progressBackgroundColor={"#141414"}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6FAFC",
    alignItems: "center",
    flex: 1,
    marginBottom: 0
  },
  container_dark: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    marginTop: 15,
    width: 155,
    height: 19,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  searchInput: {
    color: "#5121AD",
    borderBottomColor: "#5121AD",
    borderBottomWidth: 1,
    width: "30%",
    textAlign: "center",
  },
  searchInput_dark: {
    color: "#96D0FF",
    borderBottomColor: "#96D0FF",
    borderBottomWidth: 1,
    width: "30%",
    textAlign: "center",
  },
  icon: {
    marginTop: 5,
  },
});

export default App;
