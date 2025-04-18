import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.65;
const spacer = (width - cardWidth) / 2.3;

const CoffeeCarousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(null);

  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        snapToInterval={cardWidth + 20}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: spacer }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => setSelectedItem(item)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 15,
                position: 'absolute',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: 'white', fontSize: 20 }}>{item.price} $</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      <View style={styles.indicatorContainer}>
        {data.map((_, i) => {
          const inputRange = [
            (i - 1) * cardWidth,
            i * cardWidth,
            (i + 1) * cardWidth,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1.2, 0.6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { transform: [{ scale }] }]}
            />
          );
        })}
      </View>

      {/* Modal */}
      <Modal visible={!!selectedItem} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Image
              source={{ uri: selectedItem?.image }}
              style={{ width: '100%', height: height * 0.3, borderRadius: 15 }}
              resizeMode="cover"
            />
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalText}>
              {selectedItem?.description || 'Bu kahve özel olarak hazırlanmıştır.'}
            </Text>
            <Pressable style={styles.closeButton} onPress={() => setSelectedItem(null)}>
              <Text style={{ color: 'white' }}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CoffeeCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    position: 'relative',
    width: cardWidth,
    height: height * 0.45,
    backgroundColor: 'brown',
    borderRadius: 15,
    justifyContent: 'start',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: 'brown',
    margin: 5,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:10,
  },
  modalBox: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  modalText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'brown',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
