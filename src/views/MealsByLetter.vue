<template>
  <div>
    <div>
      <button v-for="letter in letters" :key="letter" @click="filterByLetter(letter)">
        {{ letter }} &nbsp; &nbsp; <!-- whitespace -->
      </button>
    </div>
    <div v-if="filteredMeals.length === 0">
      Brak potraw dla wybranej litery.
    </div>
    <div v-else>
      <div class="p-8 pb-0" style="color: #F1AD80;">
        <h1 class="text-4xl font-bold mb-4">Meals</h1>
      </div>
      <Meals :meals="filteredMeals" />
    </div>
  </div>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'
import Meals from '../components/Meals.vue';

export default {
  components: {
    Meals,
  },
  name: 'FoodList',
  setup() {
    const letters = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
    const filteredMeals = ref([])

    const filterByLetter = async (letter) => {
      const mealsRef = collection(db, 'meals')
      const q = query(mealsRef, where('name', '>=', letter), where('name', '<', letter + 'z'))
      const querySnapshot = await getDocs(q)

      filteredMeals.value = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          picture: doc.data().picture,
          preparation: doc.data().preparation,
          youtube: doc.data().youtube
        }
      })
    }

    onMounted(() => {
      // Domyślnie wyświetlaj potrawy zaczynające się od litery 'A'
      filterByLetter('A')
    })

    return {
      letters,
      filteredMeals: filteredMeals,
      filterByLetter
    }
  }
}
</script>
  