<template>
  <div class="p-8 pb-0" style="color: #F1AD80;">
    <h1 class="text-4xl font-bold mb-4">Meals</h1>
  </div>
  <Meals :meals="meals" />
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/init.js'
import Meals from '../components/Meals.vue';

export default {
  components: {
    Meals,
  },
  data() {
    return {
      meals: []
    };
  },
  mounted() {
    this.loadMeals();
  },
  methods: {
    async loadMeals() {
      try {
        const querySnapshot = await getDocs(collection(db, 'meals')); // Pobierz wszystkie dokumenty z kolekcji 'meals'
        this.meals = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
      } catch (error) {
        console.error('Błąd podczas ładowania posiłków:', error);
      }
    }
  }
};
</script>
