<template>
    <div class="header">
        <div class="row ">
            <div class="col-md-10" >
                <div class="logo-container">
                    <img class="img-fluid" src="../assets/galaxy-logo.png" alt="logo-galaxy">
                </div>
            </div>

            <div class="col-md-2 d-flex login-link-container">
                <a href="" class="align-self-center">Login</a>
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