<script setup>
const malvinas = '/images/lasmalvinas.jpg';
</script>

<template>
    <footer>
        <p>Las Malvinas son Argentinas <br><img :src="malvinas"
                alt="outline of las malvinas with argentine flag" class="footer-img"></p>
        <p>Elizabeth Batz 2025</p>
    </footer>
</template>

<style scoped>
footer {
    text-align: center;
    padding: 2rem;
    background-color: #6CACE4;
    color: white;
    margin-top: auto;
    width: 100%;
}
.footer-img {
    width: 50px;
    height: auto;
}
</style>