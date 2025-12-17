import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import CurrencyConverter from '../components/CurrencyConverter.vue'
import AboutView from '../components/AboutView.vue'
import UnderConstruction from '../components/UnderConstruction.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/destinations',
            name: 'destinations',
            component: UnderConstruction
        },
        {
            path: '/activities',
            name: 'activities',
            component: UnderConstruction
        },
        {
            path: '/plan-trip',
            name: 'plan-trip',
            component: UnderConstruction
        },
        {
            path: '/blog',
            name: 'blog',
            component: UnderConstruction
        },
        {
            path: '/currency-converter',
            name: 'currency-converter',
            component: CurrencyConverter
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/under-construction',
            name: 'under-construction',
            component: UnderConstruction
        }
    ]
})

export default router