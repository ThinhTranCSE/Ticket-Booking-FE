<template>
    <b-container class="mt-5">
        <b-row>
            <b-col cols="5">
                <b-row align-h="center">
                    <b-img src="http://localhost:8000/storage/posters/6.jpg" left height="500px" width="333.33px"></b-img>
                </b-row>
                <b-row align-h="center" class="mt-4">
                    <b-btn size="md" variant="outline-primary" to="/shows">Đặt vé ngay</b-btn>
                </b-row>
            </b-col>

            <b-col cols="7">
                <h3 class="title">
                    năm bước để yêu
                </h3>

                <h5 class="duration mt-5"> 
                    Thời lượng: 90 phút
                </h5>
                <div class="sub-title">
                    Nội dung phim:
                </div>
                <div class="description">
                    Câu chuyện của Flash bắt đầu khi Barry Allen (Ezra Miller thủ vai) sử dụng siêu năng lực của mình để du hành thời gian nhằm thay đổi những sự kiện trong quá khứ. Nhưng khi nỗ lực cứu lấy gia đình mình vô tình thay đổi tương lai, Barry bị kẹt lại trong một thực tại, nơi tướng Zod tái xuất và đe dọa hủy diệt tất cả, nhưng không có bất cứ siêu anh hùng nào đứng ra giải cứu… Trừ khi Barry có thể thuyết phục một Batman rất khác và giải cứu một cư dân Kryptonian đang bị cầm tù… dẫu có thể đó không phải người mà anh thực sự tìm kiếm. Để giải cứu thế giới hiện tại cũng như trở lại tương lai mình từng biết, niềm hy vọng duy nhất của Barry là phải chạy đua vì cuộc đời mình. Vậy nhưng, sự hy sinh tuyệt đối đó có là đủ để đưa thế giới về lại như ban đầu?  
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'MovieView',
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