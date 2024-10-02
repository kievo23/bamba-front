<template>
    <div class="backdrop" >
        <div class="modal">
            <div class="title" v-show="!isRequested">
                <font-awesome-icon icon="fa-solid fa-question-circle " class="fa-2x"/>
            </div>
            <div class="body" v-show="!isRequested">
                <p>Buy credit worth </p>
                <p><span class="quote"> {{ amount }} </span></p>
                <p> for <span class="quote"> {{ phone }} </span></p>
                <button class="airtime-form-btn" @click="buyCredit">
                    Pay Via {{mpesaphone}}
                </button>
                <button class="cancel-form-btn" @click="closeModal">
                    Cancel
                </button>
            </div> 
            <div id="loading" class="modal-small" v-show="isRequested">
                <VueSpinnerGears size="120" color="white" />
                <p class="text-center-lg">Request sent.</p>
                <p class="text-center"> You should see a mpesa payment prompt on your phone <span class="quote">{{mpesaphone}}</span>  to complete the transaction</p>
                <button class="airtime-form-btn" @click="closeModal">
                    Close
                </button>
            </div>           
        </div>
    </div>
</template>

<script>
import {
  VueSpinnerGears,
  // ...
} from 'vue3-spinners';
export default {
    props : ['phone','amount','mpesaphone'],
    components: {
        VueSpinnerGears,
        // ...
    },
    data(){
        return {
            isRequested : false
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
        },
        buyCredit() {
            const url = import.meta.env.VITE_BASE_URL+"/api/stkpush";
            const data = {
                phone: this.phone,
                amount: this.amount,
                mpesaphone: this.mpesaphone,
                ref: this.phone
            }

            const headers = {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_API_KEY
            }
            this.axios.post(url,data,{headers}).then((res) => {
                console.log(res.data)
            });
            this.isRequested = true
            console.log("send to server");
        }
    }
}
</script>
<style>
</style>