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
        <!-- do poprawienia -->
        <div class="flex items-center justify-between">
          <YouTubeButton :href="meal.youtube" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init.js'
import { useRoute } from "vue-router";
import YouTubeButton from '../components/YouTubeButton.vue';

export default {
  components: {
    YouTubeButton,
  },
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
    fetchIngredients() {
      const ingredientRefs = this.meal.ingredients;
      console.log(ingredientRefs);

      const ingredientPromises = ingredientRefs.map(ingredientRef => getDoc(ingredientRef));
      Promise.all(ingredientPromises)
        .then(ingredientDocs => {
          this.ingredients = ingredientDocs.map(ingredientDoc => ingredientDoc.data());
        })
        .catch(error => {
          console.error('Błąd pobierania składników:', error);
        });
    },
    fetchTags() {
      const tagRefs = this.meal.tags;
      console.log(tagRefs);

      const tagPromises = tagRefs.map(tagRef => getDoc(tagRef));
      Promise.all(tagPromises)
        .then(tagDocs => {
          this.tags = tagDocs.map(tagDoc => tagDoc.data());
        })
        .catch(error => {
          console.error('Błąd pobierania tagów:', error);
        });
    },
    fetchDifficulty() {
      const difficultyRef = this.meal.difficulty;
      console.log(difficultyRef);

      const difficultyPromise = getDoc(difficultyRef);
      Promise.all([difficultyPromise])
        .then(([difficultyDoc]) => {
          this.difficulty = difficultyDoc.data();
        })
        .catch(error => {
          console.error('Błąd pobierania trudności:', error);
        });
    }
  }
}
</script>