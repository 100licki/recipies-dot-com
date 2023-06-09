<template>
    <div>
      <div class="px-8 pb-3">
        <input type="text" v-model="searchQuery" @input="searchMeals" class="rounded border-2 bg-white border-gray-200 focus:ring-orange-300 focus:border-orange-300 w-full" placeholder="Wyszukaj potrawę" />
      </div>
      <div class="mt-2">
        <div>
          <div class="flex flex-wrap justify-center gap-3 px-8 mb-6">
            <button class="hover:text-orange-300 hover:scale-150 transition-all" v-for="letter in letters" :key="letter" @click="filterByLetter(letter)">
              {{ letter }} &nbsp; &nbsp; <!-- whitespace -->
            </button>
          </div>
          <div v-if="filteredMeals.length === 0 && searchQuery !== '' && filteredMeals.length === 0">
          
          </div>
          <div v-else>
            <div class="p-8 pb-0" style="color: #F1AD80;">
              <h1 class="text-4xl font-bold mb-4"></h1>
            </div>
          </div>
        </div>
        <div v-if="filteredMeals.length === 0 && searchQuery !== '' && filteredMeals.length === 0">
        </div>
        <div v-else-if="showAllMeals">
          <div class="p-8 pb-0" style="color: #F1AD80;">
            <h1 class="text-4xl font-bold mb-4">Meals</h1>
          </div>
        </div>
      </div>
      <Meals :meals="filteredMeals" />
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
  name: 'MealSearch',
  setup() {
    const searchQuery = ref('')
    const filteredMeals = ref([])
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const showAllMeals = ref(true)
    const selectedLetter = ref('');

    const filterByLetter = async (letter) => {
      if (letter === selectedLetter.value) {
        selectedLetter.value = ''; // Clear the selected letter
        showAllMeals.value = true; // Show all meals
      } else {
        selectedLetter.value = letter; // Set the selected letter
        showAllMeals.value = false; // Hide all meals
      }
      const mealsRef = collection(db, 'meals')
      let q;

      if (showAllMeals.value) {
        q = mealsRef; // Jeśli showAllMeals jest true, pobierz wszystkie potrawy
      } else {
          q = query(mealsRef, where('name', '>=', letter), where('name', '<', letter + 'z'));
        }

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
      // Domyślnie wyświetlaj wszystkie potrawy
      filterByLetter('')
      })

      const searchMeals = async () => {
        if (searchQuery.value === '') {
          showAllMeals.value = true
        // If the search query is empty, fetch all meals
          const mealsRef = collection(db, 'meals')
          const querySnapshot = await getDocs(mealsRef)

          filteredMeals.value = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
              picture: doc.data().picture,
              preparation: doc.data().preparation,
              youtube: doc.data().youtube
            };
          })
        } else {
          showAllMeals.value = false
          // If the search query is not empty, perform a case-insensitive search
            const mealsRef = collection(db, 'meals');
            const q = query(mealsRef, where('name', '>=', searchQuery.value), where('name', '<', searchQuery.value + 'z'))
            const querySnapshot = await getDocs(q)

        filteredMeals.value = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            picture: doc.data().picture,
            preparation: doc.data().preparation,
            youtube: doc.data().youtube
          };
        });
      }
    };
    onMounted(searchMeals)

  return {
            letters,
            filterByLetter,
            searchQuery,
            filteredMeals: filteredMeals,
            searchMeals,
            showAllMeals,
            selectedLetter
        }
    }
}
</script>
  