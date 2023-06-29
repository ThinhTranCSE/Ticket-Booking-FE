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
                placeholder="Enter movie's name"
                :required="fullRequired"
                ></b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="Description:"
            label-for="input-2"
            >
                <b-form-textarea
                id="input-2"
                v-model="form.description"
                placeholder="Enter desription..."
                rows="3"
                max-rows="6"
                :required="fullRequired"   
                ></b-form-textarea>
            </b-form-group>

            <b-form-group
            id="input-group-3"
            label="Duration:"
            label-for="input-3"
            >
                <b-form-input
                id="input-3"
                v-model="form.duration"
                placeholder="Enter duration"
                type="number"
                :required="fullRequired"
                ></b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group-4"
            label="Poster:"
            label-for="input-4"
            >   
                <b-form-file
                v-model="form.poster"
                :state="Boolean(form.poster)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                :required="fullRequired"
                ></b-form-file>
            </b-form-group>
            <div class="mt-3">Selected file: {{ form.poster ? form.poster.name : '' }}</div>

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
    name: 'MovieForm',
    props:{
        onFormSubmit: {type: Function},
        initialName: String,
        initialDescription: String,
        initialDuration: Number,
        successfulMessage: String,
        failedMessage: String,
        fullRequired: Boolean
    },
    data(){
        return{
            form: {
                name: this.initialName || '',
                description: this.initialDescription || '',
                duration: this.initialDuration || null,
                poster: null
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
                    this.form.description = '';
                    this.form.duration = null;
                    this.form.poster = null;

                    this.show = false
                    this.$nextTick(() => {
                        this.show = true
                    })
                })
                this.$refs['successful-modal'].show();
                this.$emit('update-movie', data.data);
                this.$emit('create-movie', data.data);
            }
            catch(err){
                console.log(err);
                this.$refs['failed-modal'].show();
            }
        },    
        onReset(event){
            event.preventDefault();

            this.form.name = '';
            this.form.description = '';
            this.form.duration = null;
            this.form.poster = null;

            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
    },

}
</script>