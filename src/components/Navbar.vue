<template>
  <header class="bg-yellow-50 shadow h-16 flex justify-between items-stretch">
    <router-link
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 font-bold" style="color: #F1AD80;"
    >
      Home
    </router-link>
    <div class="p-8 pb-3">
    <h1 class="text-4xl font-bold mb-4" style="color: #F1AD80;"></h1>
  </div>
  <div class="px-8 pb-3">
    <input
      type="text"
      v-model="keyword"
      class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 w-full"
      placeholder="Search for Meals"
      @change="searchMeals"
    />
  </div>

  <Meals :meals="meals" />
    <div class="flex items-center gap-1">
      <router-link
        :to="{ name: 'byName' }"
        style="color: #000000;" class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white"
      >
        Search Meals
      </router-link>
      <router-link
        :to="{ name: 'byLetter' }"
        style="color: #000000;" class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white"
      >
        Meals By Letter
      </router-link>
      <router-link
        :to="{ name: 'ingredients' }"
        style="color: #000000;" class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-300 hover:text-white"
      >
        Meals By Ingredients
      </router-link>
    </div>
  </header>

  
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import Meals from '../components/Meals.vue'

const route = useRoute();
const keyword = ref("");
const meals = computed(() => store.state.searchedMeals);

function searchMeals() {
  if (keyword.value) {
    store.dispatch("searchMeals", keyword.value);
  } else {
    store.commit("setSearchedMeals", []);
  }
}

onMounted(() => {
  keyword.value = route.params.name
  if (keyword.value) {
    searchMeals()
  }
})
</script>