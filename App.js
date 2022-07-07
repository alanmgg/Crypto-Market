import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

function App () {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData () {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const data = await res.json();
    setCoins(data);
  }

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )
}

export default App