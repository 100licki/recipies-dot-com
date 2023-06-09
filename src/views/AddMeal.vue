<template>
    <div class="pt-10 pb-5 px-40">
      <div class=" bg-white shadow rounded-md transition-all shadow-lg shadow-gray-300 pb-5 ">
        <div class="relative">
          <button @click="goToAdminView" class="absolute right-5 top-3">
            <img src="https://www.svgrepo.com/show/458545/back.svg" class="h-8 w-8" />
          </button>
        </div>
        <div class="px-10">
          <h1 class="pl-5 pt-7 pb-5 font-bold text-2xl">Add Meal</h1>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input v-model="meal.name" type="text" placeholder="Name of the meal" ref="elementToMeasure" class="text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded" />
            <input v-model="meal.preparation" type="text" placeholder="Recipe" class="text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded" />
            <input v-model="meal.time" type="text" placeholder="Time" class="text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded" />
            <input v-model="meal.picture" type="text" placeholder="Graphics URL link" class="text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded" />
            <input v-model="meal.origin" type="text" placeholder="Origin" class="text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded" />
            <input v-model="meal.youtube" type="text" placeholder="Youtube URL link" class="text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded" />
            <div>
              <select :style="{ height: elementHeight + 'px' }" v-model="selectedDifficulty" class="text-sm h-full border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded">
                <option disabled value="" class = "text-gray-500" >Choose a difficulty level</option>
                <option v-for="difficulty in difficulties" :key="difficulty.id" :value="difficulty.id">{{ difficulty.name }}</option>
              </select>
              
            </div>
            <select v-model="selectedIngredients" multiple class="text-sm custom-select border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 focus:bg-color-200 w-full rounded">
              <option disabled selected value="" class = "py-1 px-2">Select Ingredients</option>
              <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id" class="bg-stone-100 focus:bg-orange-200 my-1 p-2">{{ ingredient.name }}</option>
            </select>
            <select v-model="selectedTags" multiple class="text-sm custom-select border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 focus:bg-color-200 w-full rounded">
              <option disabled selected value="" class = "py-1 px-2">Select Tags</option>
              <option v-for="tag in tags" :key="tag.id" :value="tag.id" class="bg-stone-100 focus:bg-orange-200 my-1 p-2">{{ tag.name }}</option>
            </select>
          </div >
          <div class="my-4 ">
          <button @click="addMeal" :style="{ height: elementHeight + 'px' }" class=" flex items-center justify-center bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-300 hover:to-orange-500 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-orange-300 w-full h-full">Add new meal</button>
        </div>
        </div>
      <div class = "px-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="meal in meals" :key="meal.id" class=" bg-white shadow rounded-md transition-all shadow-lg shadow-gray-300">
                
                    
                        <div>
            
                <img :src="meal.picture" :alt="meal.name" class="rounded-t-md w-full h-48 object-cover shadow-lg shadow-gray-400 h-10" />
                
                <div class="h-1 bg-orange-400 "></div>
                    <div class="p-3">
                        <h3 class="font-bold text-xl text-center">{{ meal.name }}</h3>
                        
                        <p class="mb-2 text-base pt-3 px-1">
                            {{ $filters.truncateWords(meal.preparation, 20) + "..." }}
                        </p>
                        
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 mb-4">
                        
                        <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }">
                        <div>
                        <p class=" text-gray-500 text-sm pt-3 px-1 text-center">
                            Click to see details
                        </p>
                    </div>
                </router-link>
                <button @click="deleteMeal(meal.id)">  
                <div>
                        <p class=" text-gray-500 text-sm pt-3 px-1 text-center">
                            Delete
                        </p>
                    </div>
                </button>  
                </div>
                    </div>
                
                    
            </div>

        </div>

      </div>
      
      
    </div>
    </div>
  </template>
  
  <style>
  .custom-select option:checked {
    background-color: #fed7aa;
    border-radius: 5px;
    padding-left: 5px;
  }
  </style>
  
  <script>
  import { collection, doc, getDocs, deleteDoc, orderBy, query, serverTimestamp, addDoc } from 'firebase/firestore';
  import db from '../firebase/init.js';
  import RecipeButton from '../components/RecipeButton.vue';
  
  export default {
    data() {
      return {
        meal: {
          name: '',
          origin: '',
          preparation: '',
          youtube: '',
          picture: '',
          time: '',
          ingredients: [],
          tags: [],
          difficulty: ''
        },
        selectedDifficulty: '',
        selectedIngredients: [],
        selectedTags: [],
        tags: [],
        ingredients: [],
        difficulties: [],
        meals: [],
        elementHeight: 0
      };
    },
    
    mounted() {
      this.loadTags();
      this.loadIngredients();
      this.loadMeals();
      this.loadDifficulties();
      this.measureElementHeight();
    },
    methods: {
      measureElementHeight() {
        this.elementHeight = this.$refs.elementToMeasure.clientHeight;
      },
      goToAdminView() {
        this.$router.push({ name: 'admin' });
      },
      async addMeal() {
        const { name, origin, preparation, youtube, picture, time } = this.meal;
        if (name && preparation && picture && time && this.selectedTags.length > 0 && this.selectedIngredients.length > 0 && this.selectedDifficulty) {
          const tagIds = this.selectedTags.map(tagId => doc(db, 'tags', tagId));
          const ingredientIds = this.selectedIngredients.map(ingredientId => doc(db, 'ingredients', ingredientId));
          const difficultyId = doc(db, 'difficulties', this.selectedDifficulty);
  
          const mealData = {
            name,
            origin,
            preparation,
            youtube,
            picture,
            tags: tagIds,
            ingredients: ingredientIds,
            difficulty: difficultyId,
            time,
            created: serverTimestamp()
          };
  
          try {
            await addDoc(collection(db, 'meals'), mealData);
            this.resetForm();
            this.loadMeals();
          } catch (error) {
            console.error('Błąd podczas dodawania potrawy:', error);
          }
        }
      },
      async loadTags() {
        try {
          const querySnapshot = await getDocs(collection(db, 'tags'));
          querySnapshot.forEach(doc => {
            this.tags.push({ id: doc.id, ...doc.data() });
          });
        } catch (error) {
          console.error('Błąd podczas ładowania tagów:', error);
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
      async loadDifficulties() {
        try {
          const querySnapshot = await getDocs(query(collection(db, 'difficulties'), orderBy('order')));
          querySnapshot.forEach(doc => {
            this.difficulties.push({ id: doc.id, ...doc.data() });
          });
        } catch (error) {
          console.error('Błąd podczas ładowania poziomów trudności:', error);
        }
      },
      async loadMeals() {
        try {
          const querySnapshot = await getDocs(collection(db, 'meals'));
          this.meals = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
        } catch (error) {
          console.error('Błąd podczas ładowania posiłków:', error);
        }
      },
      async deleteMeal(mealId) {
        try {
          await deleteDoc(doc(db, 'meals', mealId));
          this.loadMeals();
        } catch (error) {
          console.error('Błąd podczas usuwania posiłku:', error);
        }
      },
      resetForm() {
        this.meal.name = '';
        this.meal.origin = '';
        this.meal.preparation = '';
        this.meal.youtube = '';
        this.meal.picture = '';
        this.meal.time = '';
        this.selectedTags = [];
        this.selectedIngredients = [];
        this.selectedDifficulty = '';
      },
    },
  };
  </script>
  