<template>
  <div>
    <!-- Inne elementy widoku -->

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
      this.$router.push({ name: 'Tags' });
    },
    goToIngredientsView() {
      this.$router.push({ name: 'Ingredients' });
    }
  },
};
</script>