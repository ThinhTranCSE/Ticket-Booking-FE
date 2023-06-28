<template>
    <div class="header">
        <div class="row ">
            <div class="col-md-9" >
                <router-link to="/">
                    <div class="logo-container">
                        <img class="img-fluid" src="../assets/galaxy-logo.png" alt="logo-galaxy">
                    </div>
                </router-link>
            </div>

            <div class="col-md-3 d-flex login-link-container justify-content-around">
                <router-link v-if="!$store.state.user" to="/signin" class="align-self-center">Đăng nhập</router-link>
                <router-link v-if="!$store.state.user" to="/register" class="align-self-center">Đăng ký</router-link>
                <router-link v-else to="/profile" class="align-self-center">{{ $store.state.user.username }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        
    }
}
</script>


<style>
    .logo-container {
        width: 300px;
        margin-left: 50px
    }
    .header {
        margin-top: 20px
    }
    .login-link-container{
        justify-content: center;
    }
    
</style>