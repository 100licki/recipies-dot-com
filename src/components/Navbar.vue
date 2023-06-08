<template>
  <header class="bg-white shadow h-16 flex justify-between items-stretch">
    <div class="inline-flex justify-between w-full max-w-[1200px] mx-auto px-8">
      <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full  font-bold" style="color: #F1AD80;">
        Home
      </router-link>
      <div class="p-8 pb-3">
        <h1 class="text-4xl font-bold mb-4" style="color: #F1AD80;"></h1>
      </div>
      <!-- Tutaj jeszcze button do administacji -->
      <router-link :to="{ name: 'byIngredient' }" 
        class="inline-flex items-center justify-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white w-44 font-bold">
        Meals By Ingredients
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