<template>
    <b-container>
        <h2 class="mt-5">Danh sách rạp phim</h2>
        <b-table striped hover :items="items" class="mt-5" bordered></b-table>
    </b-container>
</template>

<script>
export default {
    name: 'TheatersView',
    data(){
        return{
            items: [
                {
                    name: 'Galaxy Kinh Dương Vương',
                    location: 'đây là địa chỉ'
                },
                {
                    name: 'Galaxy Kinh Dương Vương',
                    location: 'đây là địa chỉ'
                },
                {
                    name: 'Galaxy Kinh Dương Vương',
                    location: 'đây là địa chỉ'
                },
                {
                    name: 'Galaxy Kinh Dương Vương',
                    location: 'đây là địa chỉ'
                },
                {
                    name: 'Galaxy Kinh Dương Vương',
                    location: 'đây là địa chỉ'
                },
                
            ]
        }
        
    }
}
</script>

<style scoped>

</style>