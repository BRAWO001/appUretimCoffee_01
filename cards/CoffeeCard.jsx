import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CoffeeCard = ({ item }) => {
  if (!item) return null; // Güvenlik kontrolü

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      
    </View>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 150,
    margin: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android gölge
    shadowColor: '#000', // iOS gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'brown',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
