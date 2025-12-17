<script setup>
import { ref } from 'vue';
import TheWelcome from './TheWelcome.vue';
import TheFooter from './TheFooter.vue';
import '../assets/home.css';



const heroBg = `${import.meta.env.BASE_URL}images/ba_at_night.jpg`;
// Image files available in public/images
const baRainbow = `${import.meta.env.BASE_URL}images/baRainbow.jpg`;
const jardin_japones = `${import.meta.env.BASE_URL}images/jardin_japones.jpg`;
const jardin2 = `${import.meta.env.BASE_URL}images/jardin2.jpg`;
const speed = `${import.meta.env.BASE_URL}images/speed.jpg`;
const arborealMagna = `${import.meta.env.BASE_URL}images/arborealMagna.JPG`;
const argFlag = `${import.meta.env.BASE_URL}images/argFlag.jpg`;
const jardinBotanico = `${import.meta.env.BASE_URL}images/jardinBotanico.JPG`;
const modelDeMonumental = `${import.meta.env.BASE_URL}images/modelDeMonumental.JPG`;

const carousel = ref(null);

function scrollLeft() {
  if (carousel.value) {
    const card = carousel.value.querySelector('.card');
    // Scroll by the width of one card plus a bit for the gap
    const scrollAmount = card ? card.offsetWidth + 20 : 320;
    carousel.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
}

function scrollRight() {
  if (carousel.value) {
    const card = carousel.value.querySelector('.card');
    // Scroll by the width of one card plus a bit for the gap
    const scrollAmount = card ? card.offsetWidth + 20 : 320;
    carousel.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function handleImageError(event) {
    const fallback = `${import.meta.env.BASE_URL}images/ba_at_night.jpg`;
    const src = event.target.getAttribute('src') || '';
    // If the current src is already the fallback, just log and return
    if (src.includes(fallback)) {
        console.warn(`Fallback image failed to load: ${src}`);
        return;
    }
    console.warn(`Image failed to load: ${src}. Replacing with fallback ${fallback}`);
    event.target.src = fallback;
}
</script>

<template>
  <main>
   
    <header class="site-header">
        <div class="container nav">
            <nav class="links">
                <router-link to="/destinations" class="btn-nav">Destinations</router-link>
                <router-link to="/activities" class="btn-nav">Activities</router-link>
                <router-link to="/plan-trip" class="btn-nav">Plan Your Trip</router-link>
                <router-link to="/currency-converter" class="btn-nav">Currency</router-link>
                <router-link to="/blog" class="btn-nav">Blog</router-link>
                <router-link to="/about" class="btn-nav">About Us</router-link>
            </nav>
        </div>
    </header>

    <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
        <div class="overlay"></div>
        <h1>Let's travel to Argentina!!!</h1>
    </section>

    <div class="welcome-section">
        <TheWelcome />
    </div>

    <h2 class="section-title">Popular Destinations</h2>
    <div class="carousel-wrapper" id="destinations">
        <button class="nav-btn prev" @click="scrollLeft">&#10094;</button>
        <div class="carousel" ref="carousel">

        <div class="card">
            <h3><img :src="baRainbow" alt="Buenos Aires flower sign" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="jardin_japones" alt="Japanese Garden in BA" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="jardin2" alt="japanese archway in BA" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="speed" alt="Time lapse around monument" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="arborealMagna" alt="Metallic tree in Buenos Aires" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="argFlag" alt="Argentina flag in wind" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="jardinBotanico" alt="Botanical Garden" @error="handleImageError"></h3>
        </div>
        <div class="card">
            <h3><img :src="modelDeMonumental" alt="Model of Mas Monumental" @error="handleImageError"></h3>
        </div>

    </div>
        <button class="nav-btn next" @click="scrollRight">&#10095;</button>
    </div>

    <TheFooter />

  </main>
</template>

<style>
/* Media query for smaller screens (e.g., tablets and mobile phones) */
@media (max-width: 768px) {
    .site-header .nav .links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px; /* Add some space between wrapped items */
    }

    .btn-nav {
        padding: 8px 12px;
        font-size: 0.9rem;
    }

    .hero h1 {
        font-size: 2.5rem; /* Make hero text smaller on smaller screens */
        padding: 0 1rem; /* Add horizontal padding */
    }

    .carousel .card {
        /* Make carousel cards wider on smaller screens */
        flex: 0 0 80%;
        max-width: 80%;
    }
}

/* Media query for very small screens (e.g., mobile phones) */
@media (max-width: 480px) {
    .hero h1 {
        font-size: 2rem;
    }

    .carousel .card {
        /* Make cards take up even more space on very small screens */
        flex: 0 0 90%;
        max-width: 90%;
    }
}
</style>