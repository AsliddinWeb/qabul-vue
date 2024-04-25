<!--<script setup>-->
<!--import { ref } from 'vue';-->
<!--import axios from 'axios'; // Ensure axios is correctly imported-->
<!--import { useRouter, useRoute } from 'vue-router';-->
<!--import { useStore } from 'vuex';-->
<!--import Navbar from "@/components/auth/Navbar.vue";-->

<!--const phone_number = ref('');-->
<!--const password = ref('');-->

<!--const router = useRouter();-->
<!--const store = useStore();-->

<!--async function login() {-->
<!--  try {-->
<!--    const response = await axios.post('/auth/login', { phone_number: phone_number.value, password: password.value });-->
<!--    store.dispatch('login', response.data.token);-->
<!--    router.push({ name: 'dashboard' });-->
<!--  } catch (error) {-->
<!--    console.error('Login error:', error);-->
<!--  }-->
<!--}-->
<!--</script>-->

<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { mask } from "vue-the-mask";
import axiosClient from "@/api/api.js";
import Navbar from "@/components/auth/Navbar.vue";


export default {
  name: "Login",
  directives: {
    mask,
  },
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const credentials = ref({ phone_number: "", password: "" });
    // const motiv = ref([]);

    const login = async () => {
      const cleanNumber = credentials.value.phone_number.replace(/\D+/g, "");
      if (cleanNumber.length !== 9) {
        alert("Telefon raqami noto'g'ri kiritildi. Iltimos, 9 raqam kiriting.");
        return;
      }

      // Telefon raqamini to'g'ri formatda saqlash
      const fullPhoneNumber = "+998" + cleanNumber;

      try {
        const response = await authStore.login({
          phone_number: fullPhoneNumber,
          password: credentials.value.password,
        });

        if (response && response.status === 200) {
          console.log("Muaffaqiyatli kirish!");
          router.push({ name: "home" });
        }
      } catch (error) {
        console.error(error);
        credentials.value.phone_number = ""; // Telefon raqamini tozalang
        credentials.value.password = ""; // Parolni tozalang
        alert(
            "Telefon raqami yoki parol noto'g'ri. Iltimos, qaytadan kiriting."
        );
      }
    };

    // const motivApi = async () => {
    //   try {
    //     const response = await axiosClient.get("course/register-motivation/");
    //     motiv.value = response.data;
    //   } catch (error) {
    //     console.error("register-motivation error:", error);
    //   }
    // };

    // onMounted(() => {
    //   motivApi();
    // });

    return {
      credentials,
      login,
      // motiv,
    };
  },
};
</script>

<template>
  <Navbar />

  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-medium text-3xl text-gray-900">Xalqaro Innovatsion Universitet!</h1>
        <p class="leading-relaxed mt-4">Qabul tizimiga xush kelibsiz. . .</p>
      </div>
      <div class="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Kirish</h2>
        <div class="relative mb-4">
          <label for="phone-number" class="leading-7 text-sm text-gray-600">Telefon raqam</label>
          <input
              v-mask="'##-###-##-##'"
              v-model="credentials.phone_number" type="tel" id="phone-number" name="phone-number" placeholder="(99) 123-45-67"
                 class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">Parol</label>
          <input v-model="credentials.password" type="password" id="password" name="password" placeholder="Parolingizni kiriting. . ."
                 class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <button
            @click.prevent="login"
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Kirish
        </button>
        <p class="text-xs text-gray-500 mt-3">Ro'yhatdan o'tmoqchimisiz?
          <RouterLink class="text-blue-500 font-bold" to="/register">Ro'yhatdan o'tish</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>