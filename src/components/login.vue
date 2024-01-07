<template>
  <div class="flex h-screen relative">
    <div class=" w-2/4 flex items-center justify-center shadow-xl relative">
        <!-- Left side - Login Form -->
        <div class="bg-white py-10 px-5">
            <h2 class=" text-center text-4xl font-semibold mb-4 ">Login</h2>
            <form @submit.prevent="submit" class="">
                <input type="text" placeholder="Username" v-model="data.nama_karyawan" required
                    class="w-full py-4 px-4 rounded border border-gray-300 mb-3">
                <input type="password" placeholder="Password" v-model="data.password" required
                    class="w-full py-4 px-4 rounded border border-gray-300 mb-3">
                <button type="submit" class=" button w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Login</button>
            </form>
            <!-- <div class="p-4 text-center">
                Belum punya akun? <router-link to="/register" class="text-blue-500 hover:text-blue-600">Daftar disini</router-link>
            </div> -->
        </div>
    </div>

    <!-- Right side -->
    <div class=" w-46 flex items-center justify-center bg-red-500">
      <img src="../assets/bg.jpg" alt="" class="h-screen ">
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';
import { useStore } from 'vuex';
// import { reactive } from 'vue';
import { setCookie } from '../utils/utilityFunction'; // Adjust the p
import axios from 'axios';
export default {
  name: "Login",
  setup() {
    const router = useRouter();  // Import the router instance
    const store = useStore();  // Import the Vuex store if you're using it
    const data = reactive({  // Define the data object using reactive
      nama_karyawan: '',
      password: '',
    });
    const submit = async () => {
  try {
    // const response = await fetch('http://localhost:3000/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify(data)
    // });

    const response = await axios.post('http://localhost:3000/auth/login', {
  nama_karyawan: data.nama_karyawan,
  password: data.password
});

// Check if the response status is in the range 200-299 (indicating success)
const result = response.data;
if(result.status)
{
  console.log(result.status);
  await router.push('/dashboard');
    authService.login();
}



      // if(!response.ok) {
      //               const errorData = await response.json();
      //               throw new Error(errorData.message || 'Login Failed')
      //           }
      //           // errorMessage.value = '',
                
      //           // Update store dengan nama pengguna
      //           // store.commit('setUserName', data.nama_karyawan);
      //           localStorage.setItem('isAuthenticated', 'true');
         
      //           console.log('URL setelah push:', router.currentRoute.value.path);

      // if (result) {
      //   // Save the token in local storage or a secure storage mechanism
      //   if (setCookie('accessToken', result.accessToken, 1)) {
      //     // Optional: Set the token in Vuex store if you're using Vuex
      //     store.commit('setAccessToken', result.accessToken);
          
      //     // Redirect to the '/admin' page
      //     authService.login();
      //           localStorage.setItem('isAuthenticated', 'true');
      //     await router.push({ name: "admin" });
      //   } else {
      //     console.log(result.accessToken);
      //     // Redirect to the '/admin' page even if cookie setting fails
      //     await router.push('/admin');
      //   }
      // } else {
      //   // Handle the case when result is undefined
      //   console.log('Result is undefined. Do not set the cookie or redirect.');
      //   // Optionally, you can display an error message or take other actions.
      // }

    // } else {
    //   // Handle unsuccessful login (e.g., show an error message)
    //   console.error('Login failed:', response.statusText);
    //   alert('Login failed, please try again.');
    // }
  } catch (error) {
    // Handle network or other errors
    console.error('Login error:', error);
    alert('An error occurred, please try again.');
  }
};


    return {
      setCookie,
      data,
      submit
    };
  },
};

// import { reactive } from 'vue';
// import { useRouter } from 'vue-router';
// import authService from '../services/authService';
// import { useStore } from 'vuex';
// import { setCookie } from '../utils/utilityFunction';

// export default {
//   name: "Login",
//   setup() {
//     const router = useRouter();
//     const store = useStore();
//     const data = reactive({
//       nama_karyawan: '',
//       password: '',
//     });

//     const submit = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify(data),
//         });

//         if (response.ok) {
//           // Successful login
//           const result = await response.json();
//           console.log('Received token:', result.accessToken);

//           if (result && authService.isValidToken()) {
//             console.log('Token is valid. Proceed with setting the cookie and redirecting.');
//             // Check if the token is valid
//             // Save the token in local storage or a secure storage mechanism
//             if (setCookie('accessToken', result.accessToken, 1)) {
//               // Optional: Set the token in Vuex store if you're using Vuex
//               // Redirect to the '/admin' page
//               await router.push('/admin');
//  // ensure replace is false

//             } else {
//               console.log(result.accessToken);
//               // Redirect to the '/admin' page even if cookie setting fails
//               // await router.push('/admin');
//             }
//           } else {
//             // Handle the case when the token is not valid
//             console.error('Invalid token. Do not set the cookie or redirect.');
//             // Optionally, you can display an error message or take other actions.
//           }
//         } else {
//           // Handle unsuccessful login (e.g., show an error message)
//           console.error('Login failed:', response.statusText);
//           alert('Login failed, please try again.');
//         }
//       } catch (error) {
//         // Handle network or other errors
//         console.error('Login error:', error);
//         alert('An error occurred, please try again.');
//       }
//     };

//     return {
//       setCookie,
//       data,
//       submit,
//     };
//   },
// };














//     const data = reactive({
//       nama_karyawan: '',
//       password: ''
//     });
//     const router = useRouter();

//     // Function to set a cookie
// function setCookie(name, value, daysToExpire) {
//   const date = new Date();
//   date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Set the expiration time
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// // Example usage: Set a cookie named "user" with the value "John Doe" that expires in 7 days
// // setCookie("user", "John Doe", 7);


//     const submit = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify(data)
//         });

//         if (response.ok) {
//           // Successful login
//           const result = await response.json();

//           // Assuming your server sends an access token
//           // const accessToken = result.data;

//           // Save the token in local storage or a secure storage mechanism
//           if(setCookie('accessToken', result.accessToken, 1)){
//           // authService.login();
//           // Redirect to the '/dalam' page
//           await router.push({name: "admin"});
//           }
//           else{
//            console.log(result.accessToken);
//            await router.push('/admin');
//           }
          
//         } else {
//           // Handle unsuccessful login (e.g., show an error message)
//           console.error('Login failed:', response.statusText);
//           alert('Login failed, please try again.');
//         }
//       } catch (error) {
//         // Handle network or other errors
//         console.error('Login error:', error);
//         alert('An error occurred, please try again.');
//       }
//     };

//     return {
//       setCookie,
//       data,
//       submit
//     };
//   },
// };



















// import {reactive} from 'vue';
// import {useRouter} from "vue-router";

// export default {
//   name: "Login",
//   setup() {
//     const data = reactive({
//       nama_karyawan: '',
//       password: ''
//     });
//     const router = useRouter();

//     const submit = async () => {
//       // Vue.js
//   await fetch('http://localhost:3000/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   credentials: 'include',
//   body: JSON.stringify(data)
// });


//       await router.push('/dalam');
//       // window.location.href = "http://localhost:5173/dalam"
//     }

//     return {
//       data,
//       submit
//     }
//   },
// };


// export default {
//   data() {
//     return {
//       nama_karyawan: '',
//       password: '',
//     };
//   },
//   methods: {

  

// // Inside your login method
// login() {
 
//       const userCredentials = {
//         nama_karyawan: this.nama_karyawan,
//         password: this.password,
//       };

//       axios.post('http://localhost:3000/auth/login', userCredentials)
//         .then(response => {
//           // Handle the successful login response
//           const { accessToken, refreshToken } = response.data;
//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('refreshToken', refreshToken);

//           // Redirect the user to the '/dalam' page
//           this.$router.push('/dalam');
//         })
//         .catch(error => {
//           console.error('Login failed:', error.response.data.message);
//           alert('Login gagal, coba lagi');
//         });
//     },
//   },
// };



//     login() {
//   // Define an array of admin credentials
//   const adminCredentials = [
//     { username: 'admin', password: 'admin123' },
//     { username: 'Yasser', password: '123' },
//     { username: 'Kun', password: '123' },
//     // Add more admin credentials as needed
//   ];

//   // Check if the entered username and password match any admin credentials
//   const isAdmin = adminCredentials.some(
//     admin => admin.username === this.username && admin.password === this.password
//   );

//   if (isAdmin) {
//     // Redirect if the user is an admin
//     this.$router.push('/dalam');
//   } else {
//     alert('Login gagal, coba lagi');
//   }
// },



  //   login() {
  // if (this.username === 'admin' && this.password === 'admin123') {
  //   this.$router.push('/dalam');


  // } else if (this.username === 'user' && this.password === 'user123') {
  //   this.$router.push('/user');


//   } else {
//     alert('Login gagal, coba lagi');
//   }
// },

  

</script>

<style scoped>
.container-login {
  display: flex;
  justify-content: center;
  background: url('../assets/bg.jpg') center/cover no-repeat;
  align-items: center;
  height: 100vh;
}

.login {
  background: linear-gradient(to right);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 2rem;
  width: 400px;
}

.input-field {
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #A76647;
  transition: all 0.2s ease;
}

.button:active {
  transform: scale(0.95);
}

.button:hover {
  background-color: #3a5f66;
}

p {
  margin-top: 20px;
  color: #fff;
  text-align: center;
}
</style>