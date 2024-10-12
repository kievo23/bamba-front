<template>
    <div class="backdrop" >
        <div class="modal">
            <div class="title">
                <font-awesome-icon icon="fa-solid fa-question-circle " class="fa-3x" v-show="!isRequested"/>
                <font-awesome-icon icon="fa-solid fa-thumbs-up " class="fa-3x" v-show="isCompleted"/>
            </div>
            <div class="body" >
                <div id="details" v-show="!isRequested">
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
                    <VueSpinnerGears size="120" color="white" v-show="!isPaymentReceived"/>
                    <VueSpinnerHourglass size="120" color="white" v-show="isPaymentReceived && !isCompleted"/>
                    <p class="text-center-lg" v-show="!isCompleted">Request sent.</p>
                    <p class="text-center" id="statusMessage"> {{ statusMessage }}</p>
                    <p class="text-center" v-show="!isPaymentPromptSent"> <span class="quote">{{mpesaphone}}</span>  to complete the transaction</p>
                    <button class="airtime-form-btn" @click="closeModal">
                        Close
                    </button>
                </div>
            </div> 
                       
        </div>
    </div>
</template>

<script>
import {
  VueSpinnerGears,
  VueSpinnerHourglass
  // ...
} from 'vue3-spinners';
export default {
    props : ['phone','amount','mpesaphone'],
    components: {
        VueSpinnerGears,
        VueSpinnerHourglass
        // ...
    },
    data(){
        return {
            isRequested : false,
            isPaymentReceived: false,
            isCompleted: false,
            isPaymentPromptSent: false,
            statusMessage: "You should see a mpesa payment prompt on your phone",
            url : import.meta.env.VITE_BASE_URL+"/api/stkpush",
            urlStatus : import.meta.env.VITE_BASE_URL+"/api/stkpushstatus",
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
        },
        
        buyCredit() {
            
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
            this.axios.post(this.url,data,{headers}).then((res) => {
                console.log(res.data)
                this.isRequested = true;
                this.statusMessage = res.data.ResponseDescription+". Input your Mpesa PIN to complete the transaction"
                
                if(res.data.ResponseCode == "0"){
                    this.isPaymentPromptSent = true
                    let timerId = setInterval(() => {
                        const dataStatus = {
                            merchant_request_i_d: res.data.MerchantRequestID,
                        }
                        this.axios.post(this.urlStatus,dataStatus,{headers}).then((res) => {
                            console.log(res.data)
                            if(res.data.status == "1" && res.data.airtime_status == "1"){
                                this.statusMessage = "Congratulations! Airtime has been sent. Job completed.";
                                this.isCompleted = true
                                clearInterval(timerId)
                            }else if(res.data.status == "1" && res.data.airtime_status == "0"){
                                this.isPaymentReceived = true
                                this.statusMessage = "Payment received, We are working hard to send you airtime unlike our henpecked Sirkal"
                            }
                        });
                    },1500);
                }
            });
            console.log("send to server");
        }
    }
}
</script>
<style>
</style>