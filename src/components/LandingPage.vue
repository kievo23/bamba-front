<template>
  <div class="mother">
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="150" />
    <form class="airtime-form validate-form" @submit.prevent="">
      <span class="airtime-form-title">
        Buy Airtime via <span class="green">Mpesa</span> for
      </span>
      <div class="telkos">
        <img src="../assets/img/airtel.png" width="60px"/>
        <img src="../assets/img/safcom.png"  width="60px"/>
        <img src="../assets/img/telkom.png" width="60px"/>
      </div>
      
      <div class="container-airtime-form-btn">
        <button class="airtime-form-btn-samenumber" @click="otherNumberFunc" :class="{ 'active' : otherNumber }">
          <img src="../assets/img/mpesa.png" width="50px" />Buy for my Number
        </button>
        <button class="airtime-form-btn-differentnumber" :class="{ 'active' : !otherNumber }" @click="otherNumberFunc">
          <img src="../assets/img/mpesa.png" width="50px"/>Buy for another number
        </button>
      </div>
      
      <div class="wrap-input100 validate-input" data-validate="Valid Phone is required: ex@abc.xyz">
        <input class="input100" type="text" name="phone" placeholder="0733 123 123 (Number receiving airtime)" v-model="phone" @focusout="validatePhone">
        <span id="phoneError" class="error" v-if="PhoneNotValid === true"> Phone should have 0700123456 format</span>
        <span class="symbol-input100">
          <font-awesome-icon icon="fa-solid fa-phone" @click="openContacts()"/>
        </span>
      </div>
      <div class="wrap-input100 validate-input" data-validate="Password is required">
        <input class="input100" type="text" name="pass" placeholder="40 (amount)" v-model="amount" @keyup="validateAmount">
        <span id="amountError" class="error" v-if="AmountNotValid === true">Amount should be between 5 and 1000 bob</span>
        <span class="symbol-input100">
          <font-awesome-icon icon="fa-solid fa-bag-shopping" />
        </span>
      </div>
      <div v-if="otherNumber" class="separator">
        <hr>
        <p>Mpesa number to buy from</p>
      </div>
      <div class="wrap-input100 validate-input" data-validate="Valid Mpesa Phone" v-if="otherNumber === true">
        <input class="input100" type="text" name="mpesa-phone" placeholder="0722 123 123 (your mpesa number)" v-model="mpesaphone" @keyup="validateMpesaPhone">
        <span  id="mpesaPhoneError" class="error" v-if="MpesaPhoneNotValid === true">Phone should have 0700123456 format</span>
        <span class="symbol-input100">
          <font-awesome-icon icon="fa-solid fa-phone" />
        </span>
      </div>

      
      <div class="center" v-if="validated">
        <button class="airtime-form-btn" v-if="otherNumber" @click="toggleModal">
          Buy From {{mpesaphone}}
        </button>
        <button class="airtime-form-btn" v-if="!otherNumber" @click="toggleModal">
          Buy From {{phone}}
        </button>
      </div>
    </form>

    <teleport to="#modals" v-if="showModal">
      <Modal :phone="phone" :mpesaphone= "mpesaphone" :amount="amount" @close="toggleModal">
      </Modal>
    </teleport>    
    
  </div>
</template>

<script>
import Modal from './ModalConfirm.vue';

export default {
  data () {
    return {
      otherNumber: false,
      phone: '',
      amount: '',
      mpesaphone: '',
      showModal: false,

      validated: false,
      PhoneNotValid: false,
      AmountNotValid: false,
      MpesaPhoneNotValid: false,
      selectContact : null
    }
  },
  methods: {
    toggleModal() {
      if(!this.otherNumber){
        this.mpesaphone = this.phone
      }
      this.showModal = !this.showModal
    },
    openContacts() {
      this.selectContact = async () => {
        // feature check
        if (!('contacts' in navigator)) {
          return null;
        }

        // open the picker
        const contact = await navigator.contacts.select(['name', 'tel'], {
          multiple: false,
        });

        // handle the result
        return `${contact[0].name[0]} - ${contact[0].tel[0]}`;
      }
    },
    otherNumberFunc(){
      this.otherNumber = !this.otherNumber
      this.validate()
    },
    validatePhone() {
      this.phone = this.phone.split(" ").join("");
      if(this.phone.length != 10 && this.phone.length != 0){
        this.PhoneNotValid = true
      }else{
        this.PhoneNotValid = false
      }
      this.validate()
    },
    validateAmount() {
      this.amount = this.amount.split(" ").join("");
      if(this.amount >= 5 && this.amount <= 1000  || this.amount.length == 0){
        this.AmountNotValid = false
      }else{
        this.AmountNotValid = true
      }
      this.validate()
    },
    validateMpesaPhone() {
      this.mpesaphone = this.mpesaphone.split(" ").join("");
      if(this.mpesaphone.length != 10 && this.mpesaphone.length != 0){
        this.MpesaPhoneNotValid = true
      }else{
        this.MpesaPhoneNotValid = false
      }
      this.validate()
    },
    validate() {
      //console.log(this)
      if (this.PhoneNotValid === false &&
       this.AmountNotValid === false && 
       this.phone.length != 0 &&
       this.amount.length != 0
       ){
        if(this.otherNumber === true){
          if (this.MpesaPhoneNotValid === false &&
            this.mpesaphone.length != 0
            ){
              this.validated = true
            }
            else{
              this.validated = false;
            }
        }else{
          this.validated = true
        }
      }else{
        this.validated = false;
      }
    }
  },
  components: {
    Modal
  }
}

</script>
  
<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
  