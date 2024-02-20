import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

function App() {
  const [fact, setFact] = useState('');

  async function fetchRandomFact() {
    try {
      const resp = await fetch('http://numbersapi.com/random');
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await resp.text();
      setFact(data);
    } catch (err) {
      console.error('Error fetching random fact: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>This is fact: {fact}</Text>
      <Button title="Get Random Fact" onPress={fetchRandomFact}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
