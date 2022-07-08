import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar, Appearance } from "react-native";
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
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={theme === 'light' ? styles.title : styles.title_dark}>Crypto Market</Text>
        <TextInput
          style={theme === 'light' ? styles.searchInput : styles.searchInput_dark}
          placeholder="Search a coin..."
          placeholderTextColor="#858585"
          onChangeText={(text) => setSearch(text)}
        />
        {theme === 'light' ? <Icon 
          name="moon" 
          size={30}
          color="#5121AD"
          onPress={() => changeTheme()}
        /> :
        <Icon 
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
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6FAFC",
    alignItems: "center",
    flex: 1,
  },
  container_dark: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#5121AD",
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  title_dark: {
    color: "#96D0FF",
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
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
    width: "40%",
    textAlign: "center",
  },
  searchInput_dark: {
    color: "#96D0FF",
    borderBottomColor: "#96D0FF",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});

export default App;
