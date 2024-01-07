<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-[#A76647] p-4 fixed w-full">
      <div class=" mx-auto flex justify-between items-center">
        <router-link to="/" class="text-white text-2xl font-semibold">PERPUSTAKAAN</router-link>
        <div class="space-x-4">
          <!-- <button @click="logout" class="text-white cursor-pointer hover:underline">
            <router-link to="/login">Login</router-link>
          </button> -->
        </div>
      </div>
    </nav>

    <!-- Konten Daftar Buku Perpustakaan -->
    <div class="bg-gray-100 p-6">
      <h1 class="text-3xl font-semibold mb-6">Daftar Buku Perpustakaan</h1>

      <!-- Search Bar -->
      <input v-model="searchQuery" type="text" placeholder="Cari buku..."
        class="p-2 border border-gray-300 rounded-md mb-4" @keydown.enter="submitSearch">

      <!-- Grid Daftar Buku -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(book, index) in filteredBooks" :key="index" class="bg-white rounded-lg shadow-md p-4">
          <img :src="getBookCover(book.id)" alt="Cover Buku" class="w-full h-48 object-cover mb-2">

          <h3 class="text-lg font-semibold text-gray-800">{{ book.Judul_Buku }}</h3>
          <p class="text-gray-600">Penulis: {{ book.Penulis }}</p>
          <p class="text-gray-600">Tahun Terbit: {{ book.Tahun_Terbit }}</p>
          <p class="text-gray-700">{{ book.Synopsis }}</p>
          <p class="text-gray-600">Jumlah Buku: {{ book.Jumlah_Buku || 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const daftarBuku = ref([]);
    const searchQuery = ref("");

    const getBookCover = (id) => {
      try {
        const URL = `http://localhost:3000/books/get-cover/${id}`;

        return URL;
      } catch (error) {
        console.error("Error loading image", error);
      }
    };

    const filteredBooks = computed(() => {
      return daftarBuku.value.filter(book =>
        book.Judul_Buku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        book.Penulis.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const submitSearch = async () => {
      try {
        if (!searchQuery.value || searchQuery.value.trim() === "") {
          const response = await axios.get('http://localhost:3000/books/list');
          daftarBuku.value = response.data;

        } else {
          const response = await axios.get(`http://localhost:3000/books/search/${searchQuery.value}`);
          daftarBuku.value = response.data;
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    onMounted(submitSearch); // Fetch data on component mount

    return { getBookCover, daftarBuku, searchQuery, filteredBooks, submitSearch };
  },
};
</script>

<style scoped>
.navbar {
  /* Gaya non-sticky navbar */
  position: relative;
  z-index: 1;
  transition: background-color 0.3s;
}

.sticky {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #74bdcb;
  /* Warna latar belakang navbar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Efek bayangan */
  z-index: 1000;
}
</style>
