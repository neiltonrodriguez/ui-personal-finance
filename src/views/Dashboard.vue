<template>
    <div class="bg-slate-100 h-full w-full">
        <Navbar :isVisibleDrop="isVisibleDrop"/>
        <div @click="mostrarDrop">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

const isVisibleDrop = ref(false)
function mostrarDrop() {
    isVisibleDrop.value = !isVisibleDrop.value
}

</script>