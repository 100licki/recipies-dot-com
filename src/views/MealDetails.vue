<template>
  <div class="max-w-[800px] mx-auto p-8">
    <h1 class="text-4xl font-bold mb-5 text-orange-300">{{ meal.name }}</h1>
    <div class="relative bg-white shadow rounded-md transition-all ">
            <img :src="meal.picture" :alt="meal.name" class="rounded-t-md w-full h-96 object-cover" />
        
    </div>
    <div
      class="flex items-center justify-center h-40 w-full bg-stone-900 mb-4 text-zinc-50 p-2 rounded-b-md shadow-lg shadow-gray-500"
    >
      <div
        class="flex items-center justify-between mx-auto w-full py-8 px-0 md:w-3/4 md:px-16"
      >
        <div class="text-center border-r-2 border-state-50 flex-[0_0_33.3%]">
          <p class="mb-4"><i class="fas fa-crown text-3xl"></i></p>
          <p class="mb-3 uppercase">Difficulty</p>
          <p>{{ difficulty.name }}</p>
        </div>
        <div class="text-center border-r-2 border-state-50 flex-[0_0_33.3%]">
          <p class="mb-4"><i class="fas fa-compass text-3xl"></i></p>
          <p class="mb-3 uppercase">Origin</p>
          <p>{{ meal.origin }}h</p>
        </div>
        <div class="text-center flex-[0_0_33.3%]">
          <p class="mb-4"><i class="fas fa-clock text-3xl"></i></p>
          <p class="mb-3 uppercase">Time</p>
          <p>{{ meal.time }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center mb-4">
      <div
        class="p-3 text-orange-300 font-bold text-xl"
        v-for="tag in tags"
        :key="tag.id"
      >
        #{{ tag.name }}
      </div>
    </div>

    <div class="flex flex-wrap mb-4 gap-2 justify-between">
      <div
        class="h-auto flex-[0_0_100%] md:flex-[0_0_27%] bg-slate-50 text-left p-4 shadow-md"
      >
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <div v-for="ingredient in ingredients" :key="ingredient.id">
          <span>{{ ingredient.name }}</span>
        </div>
      </div>
      <div
        class="h-auto flex-[0_0_100%] md:flex-[0_0_70%] bg-slate-50 text-left p-4 shadow-md"
      >
        <h2 class="text-2xl font-semibold mb-2">Preparation</h2>
        <div class="row">
          <label>{{ meal.preparation }}</label>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end mb-4">
      <!-- do poprawienia -->
      <div class="flex items-center justify-end mt-3">
        <YouTubeButton :href="meal.youtube" />
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