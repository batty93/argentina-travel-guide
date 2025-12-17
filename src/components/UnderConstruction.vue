<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import '../assets/under-construction.css';
import TheFooter from './TheFooter.vue';
const route = useRoute();

const pageTitle = computed(() => {
  if (route.path === '/destinations') return 'Destinations';
  if (route.path === '/activities') return 'Activities';
  if (route.path === '/plan-trip') return 'Plan Your Trip';
  if (route.path === '/blog') return 'Blog';
  return 'This Page';
});
</script>

<template>
  <div class="page-wrapper">
    <main class="construction-container">
      <router-link to="/" class="back-button">&larr; Back to Home</router-link>
      
      <div class="construction-message">
        <h1>{{ pageTitle }} is Under Construction</h1>
        <p>Mafalda would like you to know that {{ pageTitle }} is currently being built.</p>
        <img src="/images/mafalda.jpg" alt="Mafalda Under Construction" class="construction-img" />
        
        <p> Mafalda is a beloved Argentine icon. A precocious 6 year old known for her sharp wit and deep concern for the state of humanity and the world. She was created by Jaoquin Salvador Lavado Tejon, a.k.a Quino. The comic strip ran from 1964 until 1973, and is still deeply loved and celebrated by Argentina.</p>
      </div>
    </main>
    <TheFooter />
  </div>
</template>