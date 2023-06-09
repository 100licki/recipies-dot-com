<template>
  
      
  <div class="pt-10 px-40">
    <div class="relative bg-white shadow rounded-md  transition-all shadow-lg shadow-gray-300 ">
      
      <div class="relative">
        <button @click="goToAdminView" class = "absolute right-5 top-3">
          <img src="https://www.svgrepo.com/show/458545/back.svg"  class="h-8 w-8" />
        </button>
      <!--<button @click="goToAdminView">Powrót</button>-->
      </div>
      <div class="px-10">
        <h1 class = "pl-5 pt-7 pb-5 font-bold text-2xl">Ingredients</h1>
        <div class="flex items-center border border-gray-300 rounded-md">
          <img stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 17l5-5m0 0l-5-5m5 5H3" src="https://www.svgrepo.com/show/512950/tag-round-1174.svg"  class="h-8 w-8 px-2" />
          <input v-model="ingredientName" @keyup.enter="addIngredient" type="text" class=" border-0 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded-md" placeholder="Add ingredient...">
          <button @click="addIngredient" class="pr-2">
            <img src="https://www.svgrepo.com/show/507822/plus-alt.svg"  class="h-8 w-8" />
          </button>
        </div>
        <div class="flex flex-wrap py-5 ">
          <div v-for="(ingredient, index) in ingredients" :key="index" class=" flex items-center justify-between text-left bg-orange-300 text-gray-700 h-10 py-1  rounded mr-1 mb-1">
            <div class = "text-base pl-4 pr-2 text-left"><p>{{ ingredient.name }}</p></div>
            
            <div class = "text-right flex items-center p-2"><button @click="deleteIngredient(ingredient.id)" class="w-4 h-4" ><img src="https://www.svgrepo.com/show/438806/remove.svg"  class="h-full w-full" /></button>
            </div>
            </div>
        </div>
        <!--<ul>
          <li v-for="(tag, index) in tags" :key="index">
            {{ tag.name }}
            <button @click="deleteTag(tag.id)">Usuń</button>
          </li>
        </ul>-->
      </div>
    </div>
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
