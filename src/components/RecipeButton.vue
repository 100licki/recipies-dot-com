<template>
  <a
    :href="href"
    target="_blank"
    class="bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-300 hover:to-orange-500 text-white font-semibold py-3 px-10  rounded-md shadow-lg hover:shadow-orange-300"
  >
    <slot>Details</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  href: String
})
</script>
