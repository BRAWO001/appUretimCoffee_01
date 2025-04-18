import axios from "axios";

// Base URL tanımı
const BASE_URL = `https://pilotyonetim.xyz/api`;

 

export const getDataAsync = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("GET Hatası:", error);
    throw error;
  }
};

export const uploadImageToServer = async (endpoint, imageUri) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "upload.jpg",
      type: "image/jpeg",
    });

    const token = getToken(); // Eğer API için token gerekiyorsa
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    console.log("📤 **API'ye Gönderilen Resim:**", {
      url: `${BASE_URL}/${endpoint}`,
      headers: headers,
      formData: [...formData.entries()],
    });

    const response = await axios.post(`${BASE_URL}/${endpoint}`, formData, { headers });

    console.log("✅ **Resim Yükleme Başarılı:**", response.data);

    if (!response.data || !response.data.Url) {
      throw new Error("❌ Hata: API'den geçerli bir URL dönmedi.");
    }

    return response.data.Url; // **Sadece resmin URL'sini döndür**
  } catch (error) {
    console.error("❌ **API Hata Yanıtı:**", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    throw new Error("❌ Resim yüklenirken hata oluştu.");
  }
};

// POST Fonksiyonu
export const postDataAsync = async (endpoint, data) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
  
      const response = await axios.post(`${BASE_URL}/${endpoint}`, null, {
        headers,
        params: data, // 🔥 burası önemli: query string ile gönderim
      });
  
      return response.data;
    } catch (error) {
      console.error("POST Hatası:", error.response?.data || error.message);
      throw error;
    }
};


// POST Fonksiyonu (Resim Yükleme)
export const postDataImagesAsync = async (endpoint, formData) => {
  try {
    const token = getToken();
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    console.log("📤 **Gönderilen API İsteği:**", {
      url: `${BASE_URL}/${endpoint}`,
      headers: headers,
      formData: [...formData.entries()],
    });

    const response = await axios.post(`${BASE_URL}/${endpoint}`, formData, { headers });

    console.log("✅ **API Yanıtı Başarılı:**", response.data);

    if (!response.data || !response.data.Url) {
      throw new Error("❌ Hata: API'den geçerli bir URL dönmedi.");
    }

    return response.data;
  } catch (error) {
    console.error("❌ **API Hata Yanıtı:**", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("❌ Yetkilendirme hatası: Geçersiz token veya oturum süresi doldu.");
      } else if (error.response.status === 400) {
        throw new Error(
          `❌ API Hatası: ${error.response.data?.errors || "Geçersiz istek!"}`
        );
      } else {
        throw new Error(`❌ API Hatası: ${error.response.data?.message || "Bilinmeyen hata"}`);
      }
    } else {
      throw new Error("❌ Ağ hatası veya sunucuya ulaşılamıyor.");
    }
  }
};

// DELETE Fonksiyonu
export const deleteDataAsync = async (endpoint, id) => {
  try {
    const token = await getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("DELETE Hatası:", error);
    throw error;
  }
};

// PUT Fonksiyonu
export const putDataAsync = async (endpoint, data) => {
  try {
    const token = await getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("PUT Hatası:", error);
    throw error;
  }
};

 
