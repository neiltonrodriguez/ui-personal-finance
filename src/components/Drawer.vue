<template>
    <div 
        id="drawer-example"
        class="left-0 z-40 top-0 border-2 max-w-2xl fixed h-screen p-4 bg-white w-full"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-4 text-base font-semibold text-gray-500"
        >
          Nova Transaction
        </h5>
        <button @click="$emit('fechar')"
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

        <p class="mb-6 text-sm text-gray-500"></p>
          Cadastre uma nova transação.
          <form v-on:submit.prevent="createTransactions(payload)">
            <div>
              <div class="mt-3">
                <label>titulo</label>
                <input v-model="payload.title" class="bg-slate-100 w-full p-2">
              </div>
               <div class="mt-3"> 
                <label>categoria</label>
                <select v-model="payload.category_id" class="w-full m-0 block bg-slate-100 p-2.5">
                  <option v-for="c in categorys" :key="c.id" :value="c.id">{{ c.title }}</option>
                </select>
              </div>
              <div class="mt-3"> 
                <label>conta</label>
                <select v-model="payload.account_id" class="w-full m-0 block bg-slate-100 p-2.5">
                  <option v-for="ac in accounts" :key="ac.id" :value="ac.id">{{ ac.title }}</option>
                </select>
              </div>
              <div class="mt-3"> 
                <label>tipo de transação</label>
                <select v-model="payload.type_transaction_id" class="w-full m-0 block bg-slate-100 p-2.5">
                  <option v-for="ty in transactionsTypes" :key="ty.id" :value="ty.id">{{ ty.title }}</option>
                </select>
              </div>
              <div class="mt-3"> 
                <label>tipo de pagamento</label>
                <select v-model="payload.type_payment_id" class="w-full m-0 block bg-slate-100 p-2.5">
                  <option v-for="pt in paymentTypes" :key="pt.id" :value="pt.id">{{ pt.title }}</option>
                </select>
              </div>
              <div class="mt-3">
                <label>valor R$</label>
                <input type="number" v-model="payload.value" class="bg-slate-100 w-full p-2">
              </div>
              <div class="mt-3">
                <label>descrição</label>
                <input v-model="payload.description" class="bg-slate-100 w-full p-2">
              </div>
            </div>
              <div class="grid grid-cols-2 gap-4 mt-10">
                <button
                  @click="showDrawer"
                  class="px-4 py-2 text-sm font-medium text-center text-white bg-red-500 border border-gray-200 rounded-lg focus:outline-none hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >Cancelar</button>
                <button @click="$emit('payload', payload)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  >Cadastrar
                </button>
              </div>
          </form>
       
      </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import http from "../services/http";

const payload = ref({})
const accounts = ref([]);
const categorys = ref([]);
const transactionsTypes = ref([]);
const paymentTypes = ref([]);


defineEmits(['payload', 'fechar']);


function getCategorys() {
  http
    .get("/category")
    .then((res) => {
      categorys.value = res.data.data;
    })
    .catch((e) => {
      swal("Erro!", "Email ou senha incorreta", "error");
    });
}

function getAccounts() {
  http
    .get("/account")
    .then((res) => {
      accounts.value = res.data.data;
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

function getPaymentTypes(){
  http.get("/payment_type")
  .then((res) => {
    paymentTypes.value = res.data.data
  })
  .catch((e) => {
    swal("Erro!", "não foi possível buscar tipos de transações", "error");
  })

}

onMounted(() => {
  getTransactionTypes();
  getPaymentTypes();
  getAccounts();
  getCategorys();
});
</script>