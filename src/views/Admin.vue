<template>
  <div>
    <button @click="goToTagsView">Przejdź do Tagów</button>
  </div>
  <div>
    <button @click="goToIngredientsView">Przejdź do Składników</button>
  </div>
  <div>
    <router-link to="/admin/add-meal">Dodaj Posiłek</router-link>
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
    }
  },
};
</script>