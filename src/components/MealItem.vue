<template>
    <div class="bg-white shadow rounded-xl hover:scale-105 transition-all">
        <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }">
            <img :src="meal.picture" :alt="meal.name" class="rounded-t-xl w-full h-48 object-cover" />
        </router-link>
        <div class="p-3">
            <h3 class="font-bold">{{ meal.name }}</h3>
            <p class="mb-4">
                {{ $filters.truncateWords(meal.preparation, 20) }}
            </p>
            <div class="flex items-center justify-between">
                <YouTubeButton :href="meal.youtube" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import YouTubeButton from './YouTubeButton.vue';

const { meal } = defineProps({
    meal: {
        required: true,
        type: Object
    }
})

</script>