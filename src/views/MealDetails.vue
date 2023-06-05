<template>
  <div class="max-w-[800px] mx-auto p-8">
    <h1 class="text-4xl font-bold mb-5 text-orange-300">{{ meal.name }}</h1>
    <img :src="meal.picture" :alt="meal.name" class="max-w-[100%]">
    <div class="grid grid-cols-1 sm:grid-cols-3 text-lg py-2">
      <div>
        <strong class="font-bold">Difficulty:</strong> {{ difficulty.name }}
      </div>
      <div>
        <strong class="font-bold">Origin:</strong> {{ meal.origin }}
      </div>
      <div>
        <strong class="font-bold">Time:</strong> {{ meal.time }}
      </div>
    </div>

    <div class="my-3">
      {{ meal.preparation }}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul>
          <li v-for="ingredient in ingredients" :key="ingredient.id">
            {{ ingredient.name }}
          </li>
        </ul>
        <h2 class="text-2xl font-semibold mb-2">Tags</h2>
        <ul>
          <li v-for="tag in tags" :key="tag.id">
            {{ tag.name }}
          </li>
        </ul>
      </div>
      <a :href="meal.youtube" target="_blank"
        class="px-3 py-2 rounded border-2 text-white border-orange-600 bg-orange-500 hover:bg-orange-600 transition-colors">
        <slot>YouTube</slot>
      </a>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init.js'
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      meal: {},
      ingredients: [],
      tags: [],
      difficulty: ''
    };
  },
  mounted() {
    this.fetchMeal();

  },
  methods: {
    async fetchMeal() {
      const route = useRoute();
      const mealId = route.params.id;
      console.log('The id is: ' + route.params.id);
      const colRef = doc(db, 'meals', mealId);
      const docSnapshot = await getDoc(colRef);
      this.meal = docSnapshot.data();
      this.fetchIngredients()
      this.fetchTags()
      this.fetchDifficulty()
    },
    async fetchIngredients() {
      const ingredientRefs = this.meal.ingredients;
      console.log(ingredientRefs);
      try {
        for (const ingredientRef of ingredientRefs) {
          const ingredientDoc = await getDoc(ingredientRef);
          this.ingredients.push(ingredientDoc.data());
        }
      } catch (error) {
        console.error('Błąd pobierania składników:', error);
      }
    },
    async fetchTags() {
      const tagRefs = this.meal.tags;
      console.log(tagRefs);
      try {
        for (const tagRef of tagRefs) {
          const tagDoc = await getDoc(tagRef);
          this.tags.push(tagDoc.data());
        }
      } catch (error) {
        console.error('Błąd pobierania tagów:', error);
      }
    },
    async fetchDifficulty() {
      const difficultyRef = this.meal.difficulty;
      console.log(difficultyRef);
      try {
        const difficultyDoc = await getDoc(difficultyRef);
        this.difficulty = difficultyDoc.data();
      } catch (error) {
        console.error('Błąd pobierania trudności:', error);
      }
    }
  }
}
</script>