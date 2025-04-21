import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert ,ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { postDataAsync } from "../utilsService/ApiResponseFunc"; 

const SingIn = () => {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [sirketAdi, setSirketAdi] = useState("");
  const [adres, setAdres] = useState("");
  const [eposta, setEposta] = useState(""); 
  const [telefon, setTelefon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const fullMessage = `
        -------------------------------
                Kullanıcı Bilgileri
        -------------------------------
                Ad         : ${ad}
                Soyad      : ${soyad}
                Şirket Adı : ${sirketAdi}
                Adres      : ${adres}
                E-posta    : ${eposta}
                Telefon    : ${telefon}
        -------------------------------
    `;

    const payload = {
      toEmail: "caglarsenol1992@gmail.com",
      baslik: "Yeni Üyelik Başvurusu",
      Message: fullMessage,
    };

    try {
      setIsLoading(true);
      const response = await postDataAsync("Istek/send", payload);
      Alert.alert("Başarılı", "Başvuru iletildi.");
      console.log("Yanıt:", response);
      setAd("");
      setSoyad("");
      setSirketAdi("");
      setEposta("");
      setAdres("");
      setTelefon("");
    } catch (error) {
      console.error("Gönderim hatası:", error.response?.data || error.message);
      Alert.alert("Hata", "Gönderim sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }


  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Loading */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Sending...</Text>
        </View>
      )}

      <Text style={styles.title}>Üyelik Başvurusu</Text>
      <TextInput
        placeholder="Ad"
        style={styles.input}
        value={ad}
        onChangeText={setAd}
      />
      <TextInput
        placeholder="Soyad"
        style={styles.input}
        value={soyad}
        onChangeText={setSoyad}
      />
      <TextInput
        placeholder="Şirket Adı"
        style={styles.input}
        value={sirketAdi}
        onChangeText={setSirketAdi}
      />
      <TextInput
        placeholder="Adres"
        style={styles.input}
        value={adres}
        onChangeText={setAdres}
      />
      <TextInput
        placeholder="Telefon"
        style={styles.input}
        keyboardType="phone-pad"
        value={telefon}
        onChangeText={setTelefon}
      />
      <TextInput
        placeholder="E-Posta"
        style={styles.input}
        value={eposta}
        onChangeText={setEposta}
      />
      <View style={styles.buttonContainer}>
        <Button title="Gönder" onPress={handleSubmit} color="#1E90FF" />
      </View>
    </ScrollView>
  );
};

export default SingIn;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 50,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
