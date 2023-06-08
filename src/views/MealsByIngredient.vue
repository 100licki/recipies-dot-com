<template>
  <div>
    <div class="px-8 pb-3">
      <br> <!-- Empty line -->
      <input type="text" v-model="searchTerm" @input="searchByIngredient"  class="rounded border-2 bg-white border-gray-200 focus:ring-orange-300 focus:border-orange-300 w-full" placeholder="Wyszukaj składnik">
    </div>
    <div class="px-8" v-if="filteredMeals.length === 0 && searchTerm !== ''">
      Brak potraw dla wpisanego składnika.
    </div>
    <div v-else>
      <div class="p-8 pb-0" style="color: #F1AD80;">
        <h1 class="text-4xl font-bold mb-4">Potrawy</h1>
      </div>
      <Meals :meals="filteredMeals" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init.js'
import Meals from '../components/Meals.vue';

export default {
  components: {
    Meals,
  },
  name: 'MealList',
  setup() {
    const searchTerm = ref('')
    const filteredMeals = ref([])

    const searchByIngredient = async () => {
      const mealsRef = collection(db, 'meals')
      const mealsQuery = query(mealsRef)

      const mealsSnapshot = await getDocs(mealsQuery)
      const meals = mealsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          picture: doc.data().picture,
          preparation: doc.data().preparation,
          youtube: doc.data().youtube,
          ingredients: doc.data().ingredients || []
        }
      })

      filteredMeals.value = await filterMealsByIngredient(meals)
    }

    const filterMealsByIngredient = async (meals) => {
      const filteredMeals = []

      if (searchTerm.value === '') { // Dodajemy warunek, jeśli searchTerm jest puste, wyświetlamy wszystkie potrawy
        return meals
      }

      for (const meal of meals) {
        if (meal.ingredients && meal.ingredients.length > 0) {
          const ingredientsRef = meal.ingredients.map((ingredientRef) => doc(db, 'ingredients', ingredientRef.id))
          const ingredientsSnapshot = await Promise.all(ingredientsRef.map((ingredientRef) => getDoc(ingredientRef)))
          const ingredients = ingredientsSnapshot.map((ingredient) => ingredient.data().name.toLowerCase())

          if (ingredients.includes(searchTerm.value.toLowerCase())) {
            filteredMeals.push(meal)
          }
        }
      }

      return filteredMeals
    }

    onMounted(() => {
      searchByIngredient()
    })

    return {
      searchTerm,
      filteredMeals: filteredMeals,
      searchByIngredient
    }
  }
}
</script>
