<template>
  <div class="flex h-screen bg-blue-500">
    <div class="bg-white flex items-center justify-center shadow-xl h-screen w-screen">
      <!-- Left side - Login Form -->
      <div class="bg-white py-10 px-5 ">
        <h2 class=" text-center text-4xl font-semibold mb-10">Mendaftar</h2>
        <form @submit.prevent="Mendaftar" class="">
          <input type="text" placeholder="Username" v-model="username" required
            class="w-full p-4 rounded border border-gray-300 mb-6">
          <input type="password" placeholder="Password" v-model="password" required
            class="w-full p-4 rounded border border-gray-300 mb-6">
          <button type="submit" class=" button w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Daftar</button>
        </form>

        <div class="bg-white p-4 mx-auto text-center">
          Sudah punya akun? <router-link to="/login" class="text-blue-500 hover:text-blue-600">Masuk
            disini</router-link>
        </div>

      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      // Add registration logic here, such as sending data to the server
      console.log("Registering with username:", this.username);
      console.log("Password:", this.password);
    },
  },
};
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
  background-color: #2d3e50;
  transition: all 0.2s ease;
}

.button:active {
  transform: scale(0.95);
}

.button:hover {
  background-color: #34495e;
}

p {
  margin-top: 20px;
  color: #fff;
  text-align: center;
}
</style>

