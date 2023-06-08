<template>
    <div>
        <input type="text" v-model="searchQuery" @input="searchMeals" placeholder="Wyszukaj potrawę" />
        <div v-if="filteredMeals.length === 0 && searchQuery !== ''">
            Brak wyników dla wyszukiwanej potrawy.
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
    name: 'MealSearch',
    setup() {
        const searchQuery = ref('')
        const filteredMeals = ref([])

        const searchMeals = async () => {
            if (searchQuery.value === '') {
                // Jeśli pole wyszukiwania jest puste, pobierz wszystkie potrawy
                const mealsRef = collection(db, 'meals')
                const querySnapshot = await getDocs(mealsRef)

                filteredMeals.value = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        name: doc.data().name,
                        picture: doc.data().picture,
                        preparation: doc.data().preparation,
                        youtube: doc.data().youtube
                    }
                })
            } else {
                // Jeśli pole wyszukiwania nie jest puste, wykonaj wyszukiwanie
                const mealsRef = collection(db, 'meals')
                const q = query(mealsRef, where('name', '>=', searchQuery.value), where('name', '<', searchQuery.value + 'z'))
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
        }
        onMounted(searchMeals)

        return {
            searchQuery,
            filteredMeals,
            searchMeals
        }
    }
}
</script>
  