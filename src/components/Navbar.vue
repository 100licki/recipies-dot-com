<template>
  <header class="bg-yellow-50 shadow h-16 flex justify-between items-stretch">
    <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full px-5 font-bold" style="color: #F1AD80;">
      Home
    </router-link>
    <div class="p-8 pb-3">
      <h1 class="text-4xl font-bold mb-4" style="color: #F1AD80;"></h1>
    </div>

    <div class="flex items-center gap-1">


      <!-- Tutaj jeszcze button do administacji -->


      <router-link :to="{ name: 'byIngredient' }" style="color: #000000;"
        class="inline-flex items-center justify-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white w-44">
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