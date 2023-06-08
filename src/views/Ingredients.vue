<template>
  <div>
    <button @click="goToAdminView">Powrót</button>
  </div>
  <div>
    <h1>Dodaj Składnik</h1>
    <input v-model="ingredientName" type="text" placeholder="Wpisz nazwę składnika" />
    <button @click="addIngredient">Dodaj Składnik</button>

    <h2>Składniki</h2>
    <ul>
      <li v-for="(ingredient, index) in ingredients" :key="index">
        {{ ingredient.name }}
        <button @click="deleteIngredient(ingredient.id)">Usuń</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import db from '../firebase/init.js'

export default {
  data() {
    return {
      ingredientName: '',
      ingredients: [],
    };
  },
  mounted() {
    this.loadIngredients();
  },
  methods: {
    goToAdminView() {
      this.$router.push({ name: 'admin' });
    },
    async addIngredient() {
      if (this.ingredientName !== '') {
        const ingredient = {
          name: this.ingredientName,
        };

        try {
          const docRef = await addDoc(collection(db, 'ingredients'), ingredient);
          this.ingredients.push({ id: docRef.id, ...ingredient });
          this.ingredientName = '';
        } catch (error) {
          console.error('Błąd podczas dodawania składnika:', error);
        }
      }
    },
    async deleteIngredient(ingredientId) {
      try {
        await deleteDoc(doc(db, 'ingredients', ingredientId));
        this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== ingredientId);
      } catch (error) {
        console.error('Błąd podczas usuwania składnika:', error);
      }
    },
    async loadIngredients() {
      try {
        const querySnapshot = await getDocs(collection(db, 'ingredients'));
        querySnapshot.forEach(doc => {
          this.ingredients.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Błąd podczas ładowania składników:', error);
      }
    },
  },
};
</script>
