<template>
    <b-navbar class="nav-bar" toggleable="lg" type="dark" variant="dark" >
        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item class="nav-item" to="/" :class="{ active: $route.name == 'home'}" @click="handleClickEvent">Phim</b-nav-item>
            <b-nav-item class="nav-item" to="/theaters" :class="{ active: $route.name == 'theaters'}" @click="handleClickEvent" >Rạp</b-nav-item>
            <b-nav-item class="nav-item" to="/shows" :class="{ active: $route.name == 'shows'}" @click="handleClickEvent">Suất Chiếu</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
        <b-button to="/admincp" v-if="isAdmin" variant="light" class="nav-btn">AdminCP</b-button>
        <b-button to="/dashboard" v-if="isAdmin" variant="light" class="nav-btn">Dashboard</b-button>
        <b-button v-if="isLogin" variant="danger" @click="handleLogout" class="nav-btn">Đăng xuất</b-button>
    </b-navbar>
</template>

<script>
import httpCommon from '../http-common';
import store from '../store';
export default {
    name: 'NavBar',
    data(){
        return {

        }
    },
    methods: {
        handleClickEvent(){
            this.curRouteName = this.$route.name;
        },
        async handleLogout(){
            try{
                const { data } = httpCommon.delete('auth/logout');
                console.log(data);
                this.$store.commit('deleteUser');
                this.$store.commit('deleteToken');
            }
            catch(err){
                console.log(err);
            }
        },
    },
    computed: {
        isAdmin(){
            if(this.$store.state.user){
                return this.$store.state.user.role == 'admin'
            }
            return false;
        },
        isLogin(){
            if(this.$store.state.token){
                return this.$store.state.token != null;
            }
            return false
        }
    }
}
</script>

<style>
    .nav-bar{
        margin-top: 20px;
    }
    .nav-item{
        margin: auto 10px auto 10px
    }
    .active{
        color: white;
    }
    .nav-btn{
        margin-right: 10px;
    }
</style>