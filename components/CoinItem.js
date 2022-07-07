import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function CoinItem({ coin }) {
  const [coins, setCoins] = useState();

  useEffect(() => {
    setCoins(coin);
  }, [coin]);

  if (coins !== undefined) {
    return (
      <View style={styles.containerItem}>
        <View style={styles.coinName}>
          <Image style={styles.image} source={{ uri: coins.image }} />
          <View style={styles.containerNames}>
            <Text style={styles.text}>{coins.name}</Text>
            <Text style={styles.textSymbol}>{coins.symbol}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.textPrice}>$ {coins.current_price}</Text>
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
    backgroundColor: "#121212",
    paddingTop: 10,
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
    color: "#FFFFFF",
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  textPrice: {
    color: "#FFFFFF",
    textAlign: "right",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B5B9",
  },
  priceDown: {
    color: "#FC4422",
  },
});

export default CoinItem;
