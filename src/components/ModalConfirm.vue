<template>
    <div class="backdrop" @click="closeModal">
        <div class="modal">
        <div class="title">
            <font-awesome-icon icon="fa-solid fa-question-circle " class="fa-2x"/>
        </div>
        <div class="body">
            <p>Buy credit worth <span class="quote"> {{ amount }} </span> for </p>
            <p><span class="quote"> {{ phone }} </span></p>
            <button class="airtime-form-btn">
                 Pay Via {{phone}}
            </button>
        </div>            
        </div>
    </div>
</template>

<script>
export default {
    props : ['phone', 'amount'],
    methods: {
        closeModal(){
            this.$emit('close')
        }
    }
}
</script>
<style>

</style>