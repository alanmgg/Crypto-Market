import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function CoinItem({ coin, themeHook }) {
  const [coins, setCoins] = useState();
  const [theme, setTheme] = useState();

  useEffect(() => {
    setCoins(coin);
  }, [coin]);

  useEffect(() => {
    setTheme(themeHook);
  }, [themeHook]);

  if (coins !== undefined) {
    return (
      <View style={theme === 'light' ? styles.containerItem : styles.containerItem_dark}>
        <View style={styles.coinName}>
          <Image style={styles.image} source={{ uri: coins.image }} />
          <View style={styles.containerNames}>
            <Text style={theme === 'light' ? styles.text : styles.text_dark}>{coins.name}</Text>
            <Text style={theme === 'light' ? styles.textSymbol : styles.textSymbol_dark}>{coins.symbol}</Text>
          </View>
        </View>

        <View>
          <Text style={theme === 'light' ? styles.textPrice : styles.textPrice_dark}>USD {coins.current_price}</Text>
          <Text
            style={[
              styles.pricePercentage,
              coins.price_change_percentage_24h > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {coins.price_change_percentage_24h}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.containerItem}></View>
    );
  }
}

const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerItem_dark: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    color: "#000000"
  },
  text_dark: {
    color: "#FFFFFF"
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  textSymbol_dark: {
    color: "#E6FAFC",
    textTransform: "uppercase",
  },
  textPrice: {
    color: "#000000",
    textAlign: "right",
  },
  textPrice_dark: {
    color: "#FFFFFF",
    textAlign: "right",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#009C10",
  },
  priceDown: {
    color: "#FC4422",
  },
});

export default CoinItem;
