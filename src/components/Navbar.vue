<template>
  <header class="relative bg-white shadow h-16 flex justify-between items-stretch ">
    <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full px-5 text-orange-400 font-light text-lg">
      Home
    </router-link>
    <div class="p-8 pb-3">
      <h1 class="text-4xl font-bold mb-4" style="color: #F1AD80;"></h1>
    </div>

    <div class="flex items-center ">
      <router-link :to="{ name: 'byIngredient' }" style="border-right: 1px solid rgb(235,235,235);border-left: 1px solid rgb(235,235,235);"
      class="px-5 whitespace-nowrap inline-flex items-center justify-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white w-full font-light text-orange-400 text-base">
        Meals By Ingredients
      </router-link>
      <router-link :to="{ name: 'admin' }" 
      class="px-5 whitespace-nowrap inline-flex items-center justify-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white w-full font-light text-orange-400 text-base">
        Admin Panel
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const keyword = ref("");
</script>