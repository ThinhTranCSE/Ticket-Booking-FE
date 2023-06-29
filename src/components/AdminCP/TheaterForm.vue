<template>
    <b-container>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-3">
            <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.name"
                placeholder="Enter theater's name"
                :required="fullRequired"
                ></b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="Location:"
            label-for="input-2"
            >
                <b-form-input
                id="input-2"
                v-model="form.location"
                placeholder="Enter location"
                :required="fullRequired"
                ></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="primary" style="float: right">Submit</b-button>
            <b-button type="reset" variant="danger" style="float: right">Reset</b-button>
            <div style="clear: both"></div>
        </b-form>

        <b-modal ok-only ref="successful-modal" ok-variant="success" title="Chúc mừng" >
            {{ successfulMessage }}
        </b-modal>
        <b-modal ref="failed-modal" ok-variant="danger" title="Thất bại" >
            {{ failedMessage }}
        </b-modal>
    </b-container> 
</template>

<script>
export default {
    name: 'TheaterForm',
    props:{
        onFormSubmit: {type: Function},
        initialName: String,
        initialLocation: String,
        successfulMessage: String,
        failedMessage: String,
        fullRequired: Boolean
    },
    data(){
        return{
            form: {
                name: this.initialName || '',
                location: this.initialLocation || '',
            },
            show: true,
        }
    },
    methods:{
        async onSubmit(event){
            event.preventDefault();
            try{
                const { data } = await this.onFormSubmit(this.form)
                .finally(() => {
                    this.form.name = '';
                    this.form.location = '';

                    this.show = false
                    this.$nextTick(() => {
                        this.show = true
                    })
                })
                this.$refs['successful-modal'].show();
                this.$emit('update-theater', data.data);
                this.$emit('create-theater', data.data);
            }
            catch(err){
                console.log(err);
                this.$refs['failed-modal'].show();
            }
        },    
        onReset(event){
            event.preventDefault();

            this.form.name = '';
            this.form.location = '';


            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
    },

}
</script>