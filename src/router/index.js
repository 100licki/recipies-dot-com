import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';
import Home from '../views/Home.vue'
import MealsByIngredient from '../views/MealsByIngredient.vue'
import MealsByLetter from '../views/MealsByLetter.vue'
import MealDetails from '../views/MealDetails.vue'
import Ingredients from '../views/Ingredients.vue'
import Admin from '../views/Admin.vue'
import Tags from '../views/Tags.vue'
import AddMeal from '../views/AddMeal.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
      },
      {
        path: '/admin/tags',
        name: 'tags',
        component: Tags,
      },
      {
        path: '/admin/ingredients',
        name: 'ingredients',
        component: Ingredients,
      },
      {
        path: '/admin/add-meal',
        name: 'addMeal',
        component: AddMeal,
      },
      {
        path: "/by-letter/:letter?",
        name: "byLetter",
        component: MealsByLetter,
      },
      {
        path: "/by-ingredient/:ingredient?",
        name: "byIngredient",
        component: MealsByIngredient,
      },
      {
        path: '/meal/:id',
        name: 'mealDetails',
        component: MealDetails
      }
    ]
  },
  {
    path: '/guest',
    component: GuestLayout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
