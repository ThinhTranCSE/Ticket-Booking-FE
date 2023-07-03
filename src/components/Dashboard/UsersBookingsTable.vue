<template>
    <b-container>
        <b-table
        :items="users_items"
        :fields="users_fields"
        :busy="busy"
        hover
        >
        <template #table-busy>
            <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
            </div>
        </template>
        <template #cell(manage)="{ toggleDetails}">
            <div> 
                <b-button @click="toggleDetails" variant="primary">Chi tiết</b-button>
            </div>
        </template>
        <template #row-details="{ item }">
            <UserBookingsDetails :userId="item.id"></UserBookingsDetails>
        </template>
        </b-table>
    </b-container>
</template>

<script>
import UserBookingsDetails from './UserBookingsDetails.vue';
export default {
    name: 'UsersBookingsTable',
    components: {
        UserBookingsDetails
    },
    props: {
        items: Array,
        busy: Boolean
    },
    data(){
        return {
            users_items: [],
            users_fields: ['id', 'username', 'role', 'manage'],
        }
    },
    methods: {

    },
    watch: {
        items(val){
            this.users_items = val;
        },
    }
}
</script>