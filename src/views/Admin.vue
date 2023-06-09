<template>
  
  <div class="grid grid-cols-1 md:grid-cols-3  pt-40 ">
    <div class="flex justify-center">
      <button @click="goToTagsView" class="font-normal text-xl bg-gradient-to-r from-orange-200 to-orange-400 hover:from-orange-200 hover:to-orange-500 text-white font-semibold px-8 py-3 rounded-md shadow-lg shadow-orange-300  hover:shadow-xl hover:shadow-orange-300 hover:scale-105 h-40 w-80">Add Tags</button>
    </div>
    <div class="flex justify-center">
      <button @click="goToIngredientsView" class="font-normal text-xl bg-gradient-to-r from-orange-200 to-orange-400 hover:from-orange-200 hover:to-orange-500 text-white font-semibold px-8 py-3 rounded-md shadow-lg shadow-orange-300  hover:shadow-xl hover:shadow-orange-300 hover:scale-105 h-40 w-80">Add Ingredients</button>
    </div>
    <div class="flex justify-center">
      <button @click="goToAddMeal" class="font-normal text-xl bg-gradient-to-r from-orange-200 to-orange-400 hover:from-orange-200 hover:to-orange-500 text-white font-semibold px-8 py-3 rounded-md shadow-lg shadow-orange-300  hover:shadow-xl hover:shadow-orange-300 hover:scale-105 h-40 w-80">Add Meals</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToTagsView() {
      this.$router.push({ name: 'tags' });
    },
    goToIngredientsView() {
      this.$router.push({ name: 'ingredients' });
    },
    goToAddMeal() {
      this.$router.push({ name: 'addMeal' });
    },
  },
};
</script>