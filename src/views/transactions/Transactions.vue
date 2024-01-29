<template>
  <div class="mt-3 max-w-7xl rounded-xl m-auto w-full h-full">
    <div class="flex gap-2">
      <div
        class="flex-1 p-3 flex flex-col items-center justify-center bg-white"
      >
        <div class="text-slate-400">últimas entradas</div>
        <div class="text-4xl text-green-600">R$230,00</div>
      </div>
      <div
        class="flex-1 p-3 flex flex-col items-center justify-center bg-white"
      >
        <div class="text-slate-400">últimas saídas</div>
        <div class="text-4xl text-red-600">R$230,00</div>
      </div>
    </div>
    <div class="mt-5">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Tipo</th>
              <th scope="col" class="px-6 py-3">Value</th>
              <th scope="col" class="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="t in transactions"
              :key="t.id"
              class="odd:bg-white even:bg-gray-50 border-b"
            >
              <td
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ t.title }}
              </td>
              <td class="px-6 py-4">{{ t.category }}</td>
              <td class="px-6 py-4 flex gap-3">
                <template v-if="t.type_transaction == 'gastos'">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </template>
                <template v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-green-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                </template>
                {{ t.type_transaction }}
              </td>
              <td class="px-6 py-4">{{ t.value }}</td>
              <td class="px-6 py-4">{{ convertDate(t.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import http from "../../services/http.js";
import router from "../../router/index.js";
import moment from 'moment'

const swal = inject("$swal");

const transactions = ref({});
function convertDate(date){
    return moment(date).format('DD/MM/YYYY');
}
function getTransactions() {
  http
    .get("/transaction")
    .then((res) => {
      transactions.value = res.data.data;
      router.push("/");
    })
    .catch((e) => {
      swal("Erro!", "Email ou senha incorreta", "error");
    });
}

onMounted(() => {
  getTransactions();
});
</script>
