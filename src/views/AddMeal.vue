<template>
    <div>
        <button @click="goToAdminView">Powrót</button>
    </div>
    <div>
        <h1>Dodaj Potrawę</h1>
        <input v-model="meal.name" type="text" placeholder="Nazwa potrawy" />
        <input v-model="meal.preparation" type="text" placeholder="Przygotowanie" />
        <input v-model="meal.time" type="text" placeholder="Czas przygotowania" />
        <input v-model="meal.picture" type="text" placeholder="Url obrazka" />
        <input v-model="meal.origin" type="text" placeholder="Pochodzenie" />
        <input v-model="meal.youtube" type="text" placeholder="Url youtube" />
        <select v-model="selectedDifficulty">
            <option v-for="difficulty in difficulties" :key="difficulty.id" :value="difficulty.id">{{ difficulty.name }}
            </option>
        </select>
        <select v-model="selectedIngredients" multiple>
            <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">{{ ingredient.name }}
            </option>
        </select>
        <select v-model="selectedTags" multiple>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
        </select>
        <button @click="addMeal">Dodaj Potrawę</button>
    </div>
    <div>
        <h2>Lista Potraw</h2>
        <ul>
            <li v-for="meal in meals" :key="meal.id">
                <span>{{ meal.name }} - {{ meal.time }}</span>
                <button @click="deleteMeal(meal.id)">Usuń</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { collection, doc, getDocs, deleteDoc, orderBy, query, serverTimestamp, addDoc } from 'firebase/firestore';
import db from '../firebase/init.js'

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
                difficulty: []
            },
            selectedDifficulty: [],
            selectedIngredients: [],
            selectedTags: [],
            tags: [],
            ingredients: [],
            difficulties: [],
            meals: []
        };
    },
    mounted() {
        this.loadTags();
        this.loadIngredients();
        this.loadMeals();
        this.loadDifficulties();
    },
    methods: {
        goToAdminView() {
      this.$router.push({ name: 'Admin' });
    },
        async addMeal() {
            const { name: name, origin: origin, preparation: preparation, youtube: youtube, picture: picture, time: time, } = this.meal;
            if (name && preparation && picture && time && this.selectedTags.length > 0 && this.selectedIngredients.length > 0 && this.selectedDifficulty) {
                const tagIds = this.selectedTags.map(tagId => doc(db, 'tags', tagId)); // Pobierz referencje do wybranych tagów
                const ingredientIds = this.selectedIngredients.map(ingredientId => doc(db, 'ingredients', ingredientId)); // Pobierz referencje do wybranych składników
                const difficultyId = doc(db, 'difficulties', this.selectedDifficulty); // Pobierz referencje do wybranego poziomu trudności
                const mealData = {
                    name: name,
                    origin: origin,
                    preparation: preparation,
                    youtube: youtube,
                    picture: picture,
                    tags: tagIds,
                    ingredients: ingredientIds,
                    difficulty: difficultyId,
                    time: time,
                    created: serverTimestamp()

                };

                try {
                    await addDoc(collection(db, 'meals'), mealData); // dodanie
                    this.resetForm();
                    this.loadMeals();
                } catch (error) {
                    console.error('Błąd podczas dodawania potrawy:', error);
                }
            }
        },
        async loadTags() {
            try {
                const querySnapshot = await getDocs(collection(db, 'tags')); // Pobierz wszystkie dokumenty z kolekcji 'tags'
                querySnapshot.forEach(doc => {
                    this.tags.push({ id: doc.id, ...doc.data() });
                });
            } catch (error) {
                console.error('Błąd podczas ładowania tagów:', error);
            }
        },
        async loadIngredients() {
            try {
                const querySnapshot = await getDocs(collection(db, 'ingredients')); // Pobierz wszystkie dokumenty z kolekcji 'ingredients'
                querySnapshot.forEach(doc => {
                    this.ingredients.push({ id: doc.id, ...doc.data() });
                });
            } catch (error) {
                console.error('Błąd podczas ładowania składników:', error);
            }
        },
        async loadDifficulties() {
            try {
                const querySnapshot = await getDocs(query(collection(db, 'difficulties'), orderBy('order'))); // Pobierz wszystkie dokumenty z kolekcji 'difficulties'
                querySnapshot.forEach(doc => {
                    this.difficulties.push({ id: doc.id, ...doc.data() });
                });
            } catch (error) {
                console.error('Błąd podczas ładowania poziomów trudności:', error);
            }
        },
        async loadMeals() {
            try {
                const querySnapshot = await getDocs(collection(db, 'meals')); // Pobierz wszystkie dokumenty z kolekcji 'meals'
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
                this.loadMeals(); // Załaduj posiłki ponownie po usunięciu
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
            this.selectedDifficulty = [];
        },
    },
};
</script>
  