
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/MovieView.vue'
import TheaterView from '../views/TheatersView.vue'
import ShowsView from '../views/ShowsView.vue'
import SignInView from '../views/SignInView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminCP from '../views/AdminCP.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminContainer from '../container/AdminContainer.vue'
import UserContainer from '../container/UserContainer.vue'
import UsersBookingsDashboard from '../views/UsersBookingsDashboard.vue'
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: UserContainer,
            children: [
                {
                    path: '',
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
            ]
        },
        {
            path: '/admin',
            component: AdminContainer,
            redirect: {
                path: '/admin/bookings'
            },
            children: [
                {
                    path: 'bookings',
                    name: 'bookings',
                    component: UsersBookingsDashboard
                },
                {
                    path: 'admincp',
                    name: 'admincp',
                    component: AdminCP,
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: Dashboard,
                },
            ],
            beforeEnter: (to, from, next) => {
                const isAdmin = JSON.parse(localStorage.getItem('VUEX-PERSISTEDSTATE')).value.setUser.role == 'admin';
                if (!isAdmin) {
                    next({name: 'home'});
                } else {
                    next();
                }
            }
        }
    ]
})
