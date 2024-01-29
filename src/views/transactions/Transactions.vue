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
                <template v-if="t.type_transaction == 'gasto'">
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
    <div class="flex items-end justify-end gap-3 p-3">
      <button @click="showDrawer" class="bg-blue-600 items-end p-3 rounded-md text-white hover:bg-blue-700">Nova transação</button></div>
    <div v-if="isVisibleDrawer">
      <!-- drawer component -->
      <div
        id="drawer-example"
        class="left-0 z-40 top-0 border-2 max-w-2xl fixed h-screen p-4 bg-white w-full"
        tabindex="-1"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-4 text-base font-semibold text-gray-500"
        >
          Nova Transaction
        </h5>
        <button @click="showDrawer"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
         
        </button>

        <p class="mb-6 text-sm text-gray-500">
          Cadastre uma nova transação.
          <form>
            <div>
              <div class="mt-3">
                <label>titulo</label>
                <input class="bg-slate-100 w-full p-2">
              </div>
              <div class="mt-3">
                <label>categoria</label>
                <input class="bg-slate-100 w-full p-2">
              </div>
              <div class="mt-3 p-2 flex items-center my-2"> 
                <select class="w-full block bg-slate-100 p-2 text-sm">
                  <option v-for="ty in transactionsTypes" :key="ty.id" :value="ty.id">{{ ty.title }}</option>
                </select>
              </div>
              <div class="mt-3">
                <label>valor R$</label>
                <input class="bg-slate-100 w-full p-2">
              </div>
              <div class="mt-3">
                <label>descrição</label>
                <input class="bg-slate-100 w-full p-2">
              </div>
            </div>
              <div class="grid grid-cols-2 gap-4 mt-10">
                <button
                  @click="showDrawer"
                  class="px-4 py-2 text-sm font-medium text-center text-white bg-red-500 border border-gray-200 rounded-lg focus:outline-none hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >Cancelar</button>
                <button @click="sendTransaction(payload)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  >Cadastrar
                </button>
              </div>
          </form>
        </p>
       
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import http from "../../services/http.js";
import router from "../../router/index.js";
import moment from "moment";

const swal = inject("$swal");
var isVisibleDrawer = ref()

const transactions = ref({});
const transactionsTypes = ref({});
function convertDate(date) {
  return moment(date).format("DD/MM/YYYY");
}

function showDrawer() {
  console.log(isVisibleDrawer)
  isVisibleDrawer.value = !isVisibleDrawer.value
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

function getTransactionTypes(){
  http.get("/transaction_type")
  .then((res) => {
    transactionsTypes.value = res.data.data
  })
  .catch((e) => {
    swal("Erro!", "não foi possível buscar tipos de transações", "error");
  })

}

onMounted(() => {
  getTransactions();
  getTransactionTypes();
});
</script>
