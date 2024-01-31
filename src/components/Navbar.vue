<script setup>
import { useAuth } from "../stores/auth.js";
import router from "./../router/index.js";

const auth = useAuth();

function logout() {
      auth.clear();
      router.push("/login");
}

</script>
<template>
  <div class="bg-teal-800 w-full h-12 flex items-center">
    <div class="max-w-7xl p-3 w-full justify-between m-auto flex flex-row">
      <div class="text-white">PersonalFinance</div>
      <div class="hidden md:flex text-white">
        <ul class="flex gap-3">
          <li
            class="hover:bg-teal-900 h-full pl-3 pr-3 rounded-md cursor-pointer"
          >
            <router-link to="/">TRANSAÇÕES</router-link>
          </li>
          <li
            class="hover:bg-teal-900 h-full pl-3 pr-3 rounded-md cursor-pointer"
          >
            PERFIL
          </li>
          <li
            class="hover:bg-teal-900 h-full pl-3 pr-3 rounded-md cursor-pointer"
          >
            <a @click="logout()"> SAIR </a>
          </li>
        </ul>
      </div>
      <div class="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
