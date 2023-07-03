<template>
    <div class="mt-3">
      <b-navbar type="light" variant="light">
        <b-button v-b-toggle.sidebar-nav variant="light">
          <b-icon icon="list"></b-icon>
        </b-button>

        <b-button variant="danger" @click="handleLogout" class="ml-auto">Đăng xuất</b-button>

      </b-navbar>

      <b-sidebar id="sidebar-nav" width="180px">
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item to="/admin/admincp" @click="hide">AdminCP</b-nav-item>
              <b-nav-item to="/admin/dashboard" @click="hide">Dashboard</b-nav-item>
              <b-nav-item to="/admin/bookings" @click="hide">Bookings</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="danger" block @click="hide" to="/"><b-icon icon="arrow-left"/> User's View</b-button>
        </div>
      </template>
    </b-sidebar>
    </div>
</template>

<script>
import httpCommon from '../http-common';
export default {
    name: 'AdminNavBar',
    data(){
        return {

        }
    },
    methods: {
        async handleLogout(){
            try{
                const { data } = httpCommon.delete('auth/logout');
                this.$store.commit('setUser', null);
                this.$store.commit('setToken', null);
                this.$router.push('/signin');
            }
            catch(err){
                console.log(err);
            }
        },
    },
    computed: {
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