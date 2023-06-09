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
          <h1 class = "pl-5 pt-7 pb-5 font-bold text-2xl">Tags</h1>
          <div class="flex items-center border border-gray-300 rounded-md">
            <img stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 17l5-5m0 0l-5-5m5 5H3" src="https://www.svgrepo.com/show/512950/tag-round-1174.svg"  class="h-8 w-8 px-2" />
            <input v-model="tagName" @keyup.enter="addTag" type="text" class=" border-0 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full rounded-md" placeholder="Add a Tag...">
            <button @click="addTag" class="pr-2">
              <img src="https://www.svgrepo.com/show/507822/plus-alt.svg"  class="h-8 w-8" />
            </button>
          </div>
          <div class="flex flex-wrap py-5 ">
            <div v-for="(tag, index) in tags" :key="index" class=" flex items-center justify-between text-left bg-orange-300 text-gray-700 h-10 py-1  rounded mr-1 mb-1">
              <div class = "text-base pl-4 pr-2 text-left"><p>{{ tag.name }}</p></div>
              
              <div class = "text-right flex items-center p-2"><button @click="deleteTag(tag.id)" class="w-4 h-4" ><img src="https://www.svgrepo.com/show/438806/remove.svg"  class="h-full w-full" /></button>
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
