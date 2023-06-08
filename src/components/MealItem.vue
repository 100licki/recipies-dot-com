<template>
    <div class="relative bg-white shadow rounded-md hover:scale-105 transition-all shadow-lg shadow-gray-300">
        <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }">
            <img :src="meal.picture" :alt="meal.name" class="rounded-t-md w-full h-48 object-cover shadow-lg shadow-gray-400" />
        </router-link>
        
        <div class="h-1 bg-orange-400 "></div>
       <div class="p-3 grid h-[calc(100%-12rem)]">
        <h3 class="font-bold text-xl text-center">{{ meal.name }}</h3>

        <p class="mb-6 text-base/7 pt-3 px-1 min-h-24 h-full">
          {{ $filters.truncateWords(meal.preparation, 20) + "..." }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-5 mb-5">
          <YouTubeButton :href="meal.youtube" class="hover:scale-105" />
          <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }" class="hover:scale-105">
            <RecipeButton  />
          </router-link>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import YouTubeButton from './YouTubeButton.vue';
import RecipeButton from './RecipeButton.vue';
const { meal } = defineProps({
    meal: {
        required: true,
        type: Object
    }
})

</script>