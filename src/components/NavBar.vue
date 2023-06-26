<template>
    <b-navbar class="nav-bar" toggleable="lg" type="dark" variant="dark" >
        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item class="nav-item" to="/" :class="{ active: $route.name == 'home'}" @click="handleClickEvent">Phim</b-nav-item>
            <b-nav-item class="nav-item" to="/theaters" :class="{ active: $route.name == 'theaters'}" @click="handleClickEvent" >Rạp</b-nav-item>
            <b-nav-item class="nav-item" to="/shows" :class="{ active: $route.name == 'shows'}" @click="handleClickEvent">Suất Chiếu</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'NavBar',
        data(){
            return {

            }
        },
        methods: {
            handleClickEvent(){
                console.log(this.$route.name);
                this.curRouteName = this.$route.name;
            }
        },
        computed: {
            
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
</style>