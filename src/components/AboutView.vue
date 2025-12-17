<script setup>
import { ref } from 'vue';
import TheFooter from './TheFooter.vue';

const name = ref('');
const email = ref('');
const message = ref('');

function submitForm() {
  // In a real app, you would send this data to a server here.
  alert(`Thank you, ${name.value}! Your message has been sent.`);
  
  // Reset the form
  name.value = '';
  email.value = '';
  message.value = '';
}
</script>

<template>
  <main class="container">
    <router-link to="/" class="back-button">&larr; Back to Home</router-link>
    
    <h1>About Us</h1>
    <p>We are passionate about sharing the beauty, culture, and gastronomy of Argentina with the world. Feel free to reach out to us with any questions!</p>

    <div class="form-container">
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required placeholder="Your Name" />
        </div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required placeholder="your@email.com" />
        </div>
        
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="message" required rows="5" placeholder="How can we help you?"></textarea>
        </div>
        
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </main>
  <TheFooter />
</template>

<style scoped>
.back-button {
  display: inline-block;
  margin-bottom: 2rem;
  text-decoration: none;
  color: #6CACE4;
  font-weight: bold;
}
</style>