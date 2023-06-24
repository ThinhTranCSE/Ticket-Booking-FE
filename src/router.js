
import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import MovieView from './views/MovieView.vue'
import TheaterView from './views/TheatersView.vue'
import ShowsView from './views/ShowsView.vue'

Vue.use(Router)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/movie',
            name: 'movie',
            component: MovieView
        },
        {
            path: '/theaters',
            name: 'theaters',
            component: TheaterView
        },
        {
            path: '/shows',
            name: 'shows',
            component: ShowsView
        }
    ]
})
