<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside v-show="isSidebarVisible"
      class="bg-[#A76647] w-1/6 text-white text-center font-bold text-3xl  border-r-2 border-gray-700">
      <!-- Title Bar (PERPUSTAKAAN) -->
      <div
        class="bg-gray-800 pl-4 pr-4 pb-4 pt-6 text-white flex justify-center items-center text-center font-bold text-2xl mb-5 w-full">
        <h3 class="mb-4">PERPUSTAKAAN DIGITAL</h3>
      </div>
      <!-- bulat -->
      <!-- <div class="bg-gray-800 text-white text-center font-bold text-3xl mb-8 p-3 w-full rounded-tl-2xl rounded-tr-2xl rounded-b-2xl">
      <h3 class="mb-2 text-left">PERPUSTAKAAN</h3>
    </div> -->
      <!-- Profile Section -->
      <div class="mb-4 text-left flex items-center m-3 p-4 gap-3 bg-[#A0522A] rounded-xl">
        <img src="../assets/admin.PNG" alt="Admin Profile" class="h-20 w-20 rounded-full">
        <div>
          <div class="text-white font-bold pl-1 text-2xl mb-1">Admin</div>
          <!-- <div class="flex items-center"> -->
          <!-- <div class="h-4 w-4 bg-green-500 rounded-full mr-2"></div> -->
          <!-- <div class="text-sm text-gray-300">Aktif</div>  -->
          <!-- Adjusted font size to text-sm (small) -->
          <!-- </div> -->
          <!-- Admin Badge -->
          <div class="p-1 bg-blue-500   text-center  text-white text-xs rounded-full px-2 ml-0">
            <p>Administrator</p>
          </div>
        </div>
      </div>
      <!-- Navigation Links -->
      <ul class="p-4 space-y-2 ">
        <RouterLink to="/dashboard" class="flex p-1 ml-0 mb-3 rounded items-center gap-1 hover:bg-teal-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-11 h-11">
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <div class="text-left p-3 text-lg font-semibold rounded-md">Dashboard</div>
        </RouterLink>
        <div class="border-t-2 border-gray-600"></div>

        <RouterLink to="/admin" class="p-1 flex ml-1 mb-3 items-center hover:bg-teal-700 gap-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" height="60" width="30" viewBox="0 0 448 512" fill="white">
            <path
              d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
          </svg>
          <div class="text-left p-3 text-lg font-semibold rounded-md">Daftar Buku</div>
        </RouterLink>
        <div class="border-t-2 border-gray-600"></div>

        <RouterLink to="/peminjaman" class="flex p-1 ml-1 mb-3 rounded items-center gap-1  hover:bg-teal-700 ">
          <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 576 512" fill="white">
            <path
              d="M559.7 392.2c17.8-13.1 21.6-38.1 8.5-55.9s-38.1-21.6-55.9-8.5L392.6 416H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288 272 193.7c-29.1 0-57.3 9.9-80 28L68.8 384H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H192 352.5c29 0 57.3-9.3 80.7-26.5l126.6-93.3zm-366.1-8.3a.5 .5 0 1 1 -.9 .2 .5 .5 0 1 1 .9-.2z" />
          </svg>
          <div class="text-left p-3 text-lg font-semibold rounded-md ">Informasi Peminjaman Buku</div>
        </RouterLink>
        <div class="border-t-2 border-gray-600"></div>
        <RouterLink to="/pengembalian" class="flex p-1 ml-1 mb-3 rounded items-center gap-1  hover:bg-teal-700">
          <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 576 512" fill="white">
            <path
              d="M7.8 207.7c-13.1-17.8-9.3-42.8 8.5-55.9L142.9 58.5C166.2 41.3 194.5 32 223.5 32H384 544c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H507.2l-44.9 36c-22.7 18.2-50.9 28-80 28H304 288 224c-17.7 0-32-14.3-32-32s14.3-32 32-32h64 16c8.8 0 16-7.2 16-16s-7.2-16-16-16H183.4L63.7 216.2c-17.8 13.1-42.8 9.3-55.9-8.5zM382.4 160l0 0 .9 0c-.3 0-.6 0-.9 0zM568.2 304.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 453.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 352l0 0-.9 0c.3 0 .6 0 .9 0z" />
          </svg>
          <div class="text-left p-3 text-lg font-semibold rounded-md">Informasi Pengembalian Buku</div>
        </RouterLink>
        <div class="border-t-2 border-gray-600"></div>
        <RouterLink to="/Member" class="flex p-1 rounded ml-1 mb-3 items-center gap-1  bg-teal-700">
          <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 640 512" fill="white">
            <path
              d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>
          <div class="text-left p-3 text-lg font-bold rounded-md underline">Member</div>
        </RouterLink>
        <div class="border-t-2 border-gray-600"></div>
      </ul>
      <div @click="confirmLogout"
        class="flex items-center p-3 pl-5 text-lg ml-1 gap-2 font-semibold gap-1 rounded-md hover:bg-teal-700">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512" fill="white">
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
        </svg>
        <span>Log out</span>
      </div>
    </aside>


    <!-- Content -->
    <div class="flex-1 p-4 overflow-hidden">
      <!-- Navigation Bar -->
      <nav class="bg-[#A0522A] text-white p-4" :class="{ 'w-full': !isSidebarVisible }">
        <!-- Hamburger Icon inside the Navigation Bar -->
        <div class="cursor-pointer mr-4" @click="toggleSidebar">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </div>
      </nav>
      <!-- Konten Admin Perpustakaan -->
      <div class="flex-1 p-4 overflow-hidden">
        <!-- Konten Admin Perpustakaan -->
        <h1 class="text-3xl font-semibold mb-6">Selamat Datang, Admin Perpustakaan</h1>
        <!-- Additional content -->
      </div>


      <!-- Daftar Buku -->
      <div class="bg-white rounded p-4 mb-6 shadow-md">
        <h2 class="text-2xl font-semibold mb-4 pl-2">Daftar Member</h2>
        <!-- Search Bar-->
        <div class="flex mb-4 pl-2 pr-2">
          <input v-model="searchInput" type="text" placeholder="Cari peminjaman..."
            class="shadow border rounded w-1/3 py-2 px-3 mr-2" />

          <button @click="addPopUp = true"
            class="bg-green-500 text-white p-2 rounded flex items-center ml-auto gap-1 hover:bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512" fill="white">
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Add Member
          </button>

        </div>


        <!-- Table -->

        <table class="min-w-full table-auto border-collapse border">
          <thead>
            <tr class="border-b bg-gray-200">
              <th class="px-4 py-2 text-left text-center">NIK</th>
              <th class="px-4 py-2 text-left text-center">Nama Member</th>
              <th class="px-4 py-2 text-left text-center">Alamat</th>
              <th class="px-4 py-2 text-left text-center">Email</th>
              <th class="px-4 py-2 text-left text-center">Tanggal Registrasi</th>
              <th class="px-4 py-2 text-left text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pagedMemberList && pagedMemberList.length > 0" v-for="(member, index) in pagedMemberList"
              :key="index">


              <td class="border px-4 py-2 text-center">{{ member.nik }}</td>
              <td class="border px-4 py-2 text-center">{{ member.nama_member }}</td>
              <td class="border px-4 py-2 text-center">{{ member.alamat }}</td>
              <td class="border px-4 py-2 text-center">{{ member.email }}</td>
              <td class="border px-4 py-2 text-center">{{ formatDate(member.Tanggal_Registrasi) }}</td>



              <!-- <td class="border px-4 py-2"><img :src="peminjaman.imagePath" /></td> -->
              <!-- <img v-if="peminjaman.image" :src="`http://localhost:3000/${peminjaman.image}`" alt="Cover Image" class="w-16 h-16 object-cover rounded">
              </td> -->
              <td class="border px-4 py-2 justify-center items-center flex">
                <button @click="getEditMember(index, member.nik)"
                  class="bg-blue-500 text-white px-2 py-2 rounded-md mr-2 hover:bg-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" fill="white" viewBox="0 0 512 512">
                    <path
                      d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                  <!-- Sesuaikan ukuran ikon edit di sini -->
                </button>
                <button @click="deleteMember(member.nik)"
                  class="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" fill="white" viewBox="0 0 448 512">
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                  <!-- Sesuaikan ukuran ikon delete di sini -->
                </button>
              </td>
            </tr>
            <tr v-else>
              <td class="text-center font-bold text-lg p-3" colspan="10">Data tidak ditemukan</td>
            </tr>
          </tbody>
        </table>







        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex items-center justify-end mt-4">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Previous</button>
          <span class="text-gray-700">{{ currentPage }} / {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Next</button>
        </div>
      </div>

      <!-- Button Add Buku
      <button @click="addPopUp = true"
        class="flex items-center bg-green-500 text-white px-2 py-1 rounded-md mt-28 absolute top-10 right-8">
        <img src="../assets/Tambah.PNG" alt="Search Icon" class="h-4 w-4 mr-2">
        Add Member
      </button> -->

      <!-- Edit Buku Popup -->
      <div v-if="editPopUp" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-6 rounded-md w-11/12 max-w-xl">
          <h2 class="text-2xl text-center font-bold mb-4">Edit Member</h2>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">NIK:</label>
            <input v-model="editMember.nik" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">Nama Member:</label>
            <input v-model="editMember.nama_member" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">Alamat:</label>
            <input v-model="editMember.alamat" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">Email:</label>
            <input v-model="editMember.email" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="flex justify-end">
            <button @click="updateMemberPut" class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Submit</button>
            <button @click="editPopUp = false" class="bg-gray-500 text-white px-4 py-2 rounded-md">Batal</button>
          </div>
        </div>
      </div>

      <!-- Add Buku Popup -->
      <div v-if="addPopUp" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-6 rounded-md w-11/12 max-w-xl">
          <h2 class="text-2xl text-center font-bold mb-4">Add Member</h2>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">NIK:</label>
            <input v-model="addMember.nik" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">Nama Member:</label>
            <input v-model="addMember.nama_member" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">Alamat:</label>
            <input v-model="addMember.alamat" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="title">Email:</label>
            <input v-model="addMember.email" type="text" class="shadow border rounded w-full py-1 px-2">
          </div>
          <div class="flex justify-end">
            <button @click="addMemberPost" class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Tambah</button>
            <button @click="addPopUp = false" class="bg-gray-500 text-white px-4 py-2 rounded-md">Batal</button>
          </div>
        </div>
      </div>


      <!-- Logout Popup -->
      <div v-if="isLogoutConfirmationOpen"
        class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-6 rounded-md" style="width: 500px; height: 170px;">  <!-- Adjust max-w-lg to your preferred width -->
          <div class="mb-4 text-center">
            <h2 class="text-2xl font-semibold">Konfirmasi Keluar</h2>
            <p class="text-gray-700">Apakah Anda yakin ingin keluar?</p>
          </div>
          <div class="flex justify-between space-x-4">
            <button @click="logout"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
              <RouterLink to="/login">Ya</RouterLink>
            </button>
            <div class="w-4"></div> <!-- Spacer -->
            <button @click="closeLogoutConfirmation"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300">
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import moment from 'moment';


export default {

  setup() {

    const formatDate = (date) => {
      moment.locale('id');
      return moment(date).format('D MMMM YYYY, HH:mm:ss');
    }

    const memberList = ref([]);
    const searchInput = ref("");
    const addPopUp = ref(false);
    const editPopUp = ref(false);
    const memberListTemp = ref([]);
    const editMemberId = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const addMember = ref({
      nik: "",
      nama_member: "",
      alamat: "",
      email: ""
    })

    const editMember = ref({
      nik: "",
      nama_member: "",
      alamat: "",
      email: ""
    })



    const pagedMemberList = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return memberList.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => Math.ceil(memberList.value.length / itemsPerPage));


    onMounted(() => {
      getMember();
    });

    watch([searchInput], () => {
      let filteredData = memberListTemp.value;

      if (searchInput.value.trim() !== "") {
        const searchInputLC = searchInput.value.toLowerCase();

        filteredData = filteredData.filter((item) => {
          return (
            item.nama_member.toLowerCase().includes(searchInputLC) ||
            item.email.toLowerCase().includes(searchInputLC)
          );
        });

        memberList.value = filteredData;
      } else {

        memberList.value = memberListTemp.value;
      }
    });

    const getMember = () => {
      axios.get("http://localhost:3000/member/all").then(function (response) {
        memberList.value = response.data;
        memberListTemp.value = response.data;
      })
    }

    const getEditMember = (index, id) => {
      editPopUp.value = true;
      editMemberId.value = id;

      editMember.value.nik = memberList.value[index].nik;
      editMember.value.nama_member = memberList.value[index].nama_member;
      editMember.value.alamat = memberList.value[index].alamat;
      editMember.value.email = memberList.value[index].email;

      // console.log(editMember.value);


    }

    const addMemberPost = () => {
      // console.log(addBook);
      axios.post("http://localhost:3000/member/add-member", {

        nik: addMember.value.nik,
        nama_member: addMember.value.nama_member,
        alamat: addMember.value.alamat,
        email: addMember.value.email,

      }).then(function (response) {
        toast.success('Sukses menambah member!')
        addPopUp.value = false;
        getMember();
      }).catch((error) => {
        toast.error('Error ketika menambah member!')
        console.error("AXIOS ERROR: ", error);
      });
    }

    const deleteMember = (id) => {
      axios.delete(`http://localhost:3000/member/${id}`)
        .then(function (response) {
          toast.success('Sukses menghapus member!')
          getMember();
        }).catch((error) => {
          toast.error('Error ketika menghapus member!')
        })
    }

    const updateMemberPut = () => {
      axios.put(`http://localhost:3000/member/update-member/${editMemberId.value}`, {
        nik: editMember.value.nik,
        nama_member: editMember.value.nama_member,
        alamat: editMember.value.alamat,
        email: editMember.value.email

      }).then(function (response) {
        toast.success('Sukses mengupdate data member!')
        getMember();
        editPopUp.value = false;
      })
    }


    return { formatDate, updateMemberPut, searchInput, editMemberId, editPopUp, getEditMember, editMember, deleteMember, addMemberPost, addPopUp, memberList, memberListTemp, getMember, addMember, currentPage, totalPages, pagedMemberList, };
  },
  data() {
    return {
      isSidebarVisible: localStorage.getItem("sidebar") === "true" || false,
      isLogoutConfirmationOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      const newSidebarState = !this.isSidebarVisible;
      localStorage.setItem("sidebar", newSidebarState);

      this.isSidebarVisible = newSidebarState;
    },
    confirmLogout() {
      // Handle logout logic
    },

    confirmLogout() {
      // Show the logout confirmation popup
      this.isLogoutConfirmationOpen = true;
    },

    logout() {
      // Handle logout logic here
      console.log("Logging out...");

      // Close the logout confirmation popup
      this.closeLogoutConfirmation();
    },

    closeLogoutConfirmation() {
      // Close the logout confirmation popup
      this.isLogoutConfirmationOpen = false;
    },
  },

};
</script>
