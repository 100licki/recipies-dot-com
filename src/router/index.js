import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import Home from '../views/Home.vue'
import MealsByIngredient from '../views/MealsByIngredient.vue'
import MealDetails from '../views/MealDetails.vue'
import Ingredients from '../views/Ingredients.vue'
import Admin from '../views/Admin.vue'
import Tags from '../views/Tags.vue'
import AddMeal from '../views/AddMeal.vue'
import SignIn from '../views/SignIn.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"

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
        path: '/sign-in',
        name: 'singIn',
        component: SignIn,
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/tags',
        name: 'tags',
        component: Tags,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/ingredients',
        name: 'ingredients',
        component: Ingredients,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/add-meal',
        name: 'addMeal',
        component: AddMeal,
        meta: {
          requiresAuth: true
        }
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
  }
];

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert("You don't have access!")
      next("/")
    }
  } else {
    next()
  }
})

export default router;
