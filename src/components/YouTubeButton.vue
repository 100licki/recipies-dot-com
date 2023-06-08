<template>
  <a
    :href="href"
    target="_blank"
    class="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-red-400"
  
  >
    <slot>YouTube</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  href: String
})
</script>
