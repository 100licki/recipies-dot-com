<template>
    <div class="relative bg-white shadow rounded-md hover:scale-105 transition-all shadow-lg shadow-gray-300">
        <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }">
            <img :src="meal.picture" :alt="meal.name" class="rounded-t-md w-full h-48 object-cover" />
        </router-link>
        <div class="p-3">
            <h3 class="font-bold">{{ meal.name }}</h3>
            <p class="mb-4">
                {{ $filters.truncateWords(meal.preparation, 20) }}
            </p>
            <br>
            <br>
            <div class="absolute bottom-5 left-7">
                <YouTubeButton :href="meal.youtube" />
            </div>
            <div class="absolute bottom-5 right-7">
                <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }">
                    <RecipeButton/>
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