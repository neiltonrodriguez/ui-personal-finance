<template>
    <div class="bg-slate-100 h-full w-full">
        <Navbar />
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import router from '../router/index'
import Navbar from '../components/Navbar.vue'
</script>