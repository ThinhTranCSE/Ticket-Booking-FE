<template>
    <b-container class="mt-5">
        <h3 class="mb-5">Đăng ký</h3>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
            id="input-group-1"
            label="Username:"
            label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.username"
                placeholder="Enter username"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="input-2"
            >
                <b-form-input
                id="input-2"
                v-model="form.password"
                placeholder="Enter password"
                type="password"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" style="float: right">Submit</b-button>
            <b-button type="reset" variant="danger" style="float: right">Reset</b-button>
            <div style="clear: both"></div>
        </b-form>
        <b-modal ok-only ref="successful-modal" ok-variant="success" title="Chúc mừng" >
            Đăng ký thành công!!
        </b-modal>
        <b-modal ref="failed-modal" ok-variant="danger" title="Thất bại" >
            Hãy thử lại với thông tin khác!!
        </b-modal>
    </b-container>
</template>

<script>
import httpCommon from '../http-common';

export default {
    name: 'RegisterView',
    data(){
        return {
            form: {
                username: '',
                password: '',
            },
            show: true,
        }
    },
    methods: {
        async onSubmit(event){
            event.preventDefault();
            try{
                const { data } = await httpCommon.post('auth/register', this.form)
                .finally(() => {
                    this.form.username = '';
                    this.form.password = '';

                    this.show = false
                    this.$nextTick(() => {
                        this.show = true
                    })
                })
                this.$store.commit('setUser', data.user);
                this.$store.commit('setToken', data.token);
                httpCommon.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token;
                this.$refs['successful-modal'].show();
            }   
            catch(err){
                console.log(err);
                this.$refs['failed-modal'].show();
            }

        },
        onReset(event){
            event.preventDefault();

            this.form.username = '';
            this.form.password = '';

            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
    },

}
</script>

<style scoped>

</style>