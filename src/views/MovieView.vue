<template>
    <b-container class="mt-5">
        <b-overlay :show="is_busy">
            <b-row>
                <b-col cols="5">
                    <b-row align-h="center">
                        <b-img :src="movie_data.poster" left height="500px" width="333.33px"></b-img>
                    </b-row>
                    <b-row align-h="center" class="mt-4">
                        <b-btn size="md" variant="outline-primary" to="/shows">Đặt vé ngay</b-btn>
                    </b-row>
                </b-col>
    
                <b-col cols="7">
                    <h3 class="title">
                        {{ movie_data.name }}
                    </h3>
    
                    <h5 class="duration mt-5"> 
                        Thời lượng: {{ movie_data.duration }} phút
                    </h5>
                    <div class="sub-title">
                        Nội dung phim:
                    </div>
                    <div class="description">
                        {{ movie_data.description }}
                    </div>
                </b-col>
            </b-row>
        </b-overlay>
    </b-container>
</template>

<script>
import httpCommon from '../http-common'
export default {
    name: 'MovieView',
    data(){
        return {
            id: this.$route.params.id,
            movie_data: {},
            is_busy: false
        }
    },
    async created(){
        try{
            this.is_busy = true;
            setTimeout(() => this.is_busy = false, 3000);

            const { data } = await httpCommon.get(`/movies/${this.id}`);
            this.movie_data =  data.data;

            this.is_busy = false;
        }
        catch(err){
            console.log(err);
        }
    }

}
</script>

<style scoped>
    .title{
        text-transform: uppercase;
        /* font-size: 30px; */
        font-weight: 500;
    }
    .duration{
        font-weight: 300;

    }
    .sub-title{
        font-size: 23px;
        font-weight: 400;
        margin-top: 50px;
    }
    .description{
        margin-top: 20px;
        line-height: 30px;
    }


</style>