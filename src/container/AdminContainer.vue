<template>
    <div>
        <AdminNavBar></AdminNavBar>
        <router-view class="view"/>
    </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'
export default {
    name: 'AdminContainer',
    components: {
        AdminNavBar
    }
}
</script>