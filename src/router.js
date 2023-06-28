
import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import MovieView from './views/MovieView.vue'
import TheaterView from './views/TheatersView.vue'
import ShowsView from './views/ShowsView.vue'
import SignInView from './views/SignInView.vue'
import UserProfileView from './views/UserProfileView.vue'
import RegisterView from './views/RegisterView.vue'
import AdminCP from './views/AdminCP.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: MovieView,
            props: true,
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
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignInView
        },
        {
            path: '/profile',
            name: 'profile',
            component: UserProfileView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/admincp',
            name: 'admincp',
            component: AdminCP
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        }

    ]
})
