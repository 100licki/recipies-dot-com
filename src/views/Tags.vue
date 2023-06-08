<template>
  <div>
    <button @click="goToAdminView">Powrót</button>
  </div>
  <div>
    <h1>Dodaj Tagi</h1>
    <input v-model="tagName" type="text" placeholder="Wpisz nazwę tagu" />
    <button @click="addTag">Dodaj Tag</button>

    <h2>Tagi</h2>
    <ul>
      <li v-for="(tag, index) in tags" :key="index">
        {{ tag.name }}
        <button @click="deleteTag(tag.id)">Usuń</button>
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
      tagName: '',
      tags: [],
    };
  },
  mounted() {
    this.loadTags();
  },
  methods: {
    goToAdminView() {
      this.$router.push({ name: 'admin' });
    },
    async addTag() {
      if (this.tagName !== '') {
        const tag = {
          name: this.tagName,
        };

        try {
          const docRef = await addDoc(collection(db, 'tags'), tag);
          this.tags.push({ id: docRef.id, ...tag });
          this.tagName = '';
        } catch (error) {
          console.error('Błąd podczas dodawania tagu:', error);
        }
      }
    },
    async deleteTag(tagId) {
      try {
        await deleteDoc(doc(db, 'tags', tagId));
        this.tags = this.tags.filter(tag => tag.id !== tagId);
      } catch (error) {
        console.error('Błąd podczas usuwania tagu:', error);
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
  },
};
</script>
