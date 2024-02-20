import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { DatePicker } from '@react-native-community/datetimepicker';

const BASE_URL = 'http://numbersapi.com';

function App() {
  const [fact, setFact] = useState('');
  const [date, setDate] = useState(new Date());

  async function fetchRandomFact() {
    try {
      const resp = await fetch(`${BASE_URL}/random`);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await resp.text();
      setFact(data);
    } catch (err) {
      console.error('Error fetching random fact: ', err);
    }
  };

  function formatDate() {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  }

  async function fetchDateFact() {
    try {
      const formattedDate = formatDate(date);
      const resp = await fetch(`${BASE_URL}/${formattedDate}`);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await resp.text();
      setFact(data);
    } catch (err) {
      console.error('Error fetching fact for data: ', err);
    }
  }

  function handleDateChange(newDate) {
    setDate(newDate);
  }

  return (
    <View style={styles.container}>
      <Text>This is fact: {fact}</Text>
      <Button title="Get Random Fact" onPress={fetchRandomFact}></Button>
      {/* <DatePicker
        value={date}
        onChange={handleDateChange}
      /> */}
      <Button title="Get Fact for Date" onPress={fetchDateFact}></Button>
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
