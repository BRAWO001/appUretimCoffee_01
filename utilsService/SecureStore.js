import * as SecureStore from "expo-secure-store";

class SecureStorage {
  static async save(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, jsonValue);
      console.log(`'${key}' başarıyla kaydedildi.`);
    } catch (error) {
      console.error(`'${key}' kaydedilirken hata oluştu:`, error);
    }
  }

  static async get(key) {
    try {
      const jsonValue = await SecureStore.getItemAsync(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`'${key}' alınırken hata oluştu:`, error);
      return null;
    }
  }

  static async remove(key) {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`'${key}' başarıyla silindi.`);
    } catch (error) {
      console.error(`'${key}' silinirken hata oluştu:`, error);
    }
  }
}

export default SecureStorage;
