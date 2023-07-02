<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebar-open="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebar-open="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <div
          class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto"
          style="background-color: #f1f5f9"
        >
          <!-- Page header -->
          <div class="mb-5 flex justify-between">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
              Account Settings ✨
            </h1>
          </div>

          <!-- Content -->
          <div class="bg-white shadow-lg rounded-sm mb-5">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSidebar />
              <div class="grow">
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                  <div class="sm:flex sm:justify-between sm:items-center mb-5">
                    <!-- Left: Title -->
                    <div class="mb-4 sm:mb-0">
                      <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                        Credit card
                      </h1>
                    </div>

                    <!-- Add card button -->
                    <button
                      v-if="isHide"
                      class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                      @click="openModal"
                    >
                      <svg
                        class="w-4 h-4 fill-current opacity-50 shrink-0"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                        />
                      </svg>
                      <span class="hidden xs:block ml-2">Add Card</span>
                    </button>
                    <button
                      v-if="!isHide"
                      class="btn bg-white border-slate-200 hover:border-slate-300 text-rose-500 hover:text-rose-600"
                      @click="deleteCard()"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <ModalBasic
                  id="feedback-modal"
                  title="Credit card informations"
                  :modal-open="modalOpen"
                  @close-modal="closeModal"
                >
                  <!-- Modal content -->
                  <div class="px-5 py-4">
                    <div class="space-y-3">
                      <div class="space-y-4">
                        <!-- Card Number -->
                        <div>
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-nr"
                            >Card Number
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-nr"
                            v-model="creditCardNumber"
                            class="form-input w-full"
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxlength="19"
                            @input="formatCreditCardNumber"
                          />
                          <div
                            v-if="errors.creditCardNumber"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.creditCardNumber }}
                          </div>
                        </div>

                        <!-- Expiry and CVC -->
                        <div class="flex space-x-4">
                          <div class="flex-1">
                            <label
                              class="block text-sm font-medium mb-1"
                              for="card-expiry"
                              >Expiry Date
                              <span class="text-rose-500">*</span></label
                            >
                            <input
                              id="card-expiry"
                              v-model="expiryDate"
                              class="form-input w-full"
                              type="text"
                              maxlength="5"
                              placeholder="MM/YY"
                              @input="formatExpiryDate"
                            />
                            <div
                              v-if="errors.expiryDate"
                              class="text-xs mt-1 text-rose-500"
                            >
                              {{ errors.expiryDate }}
                            </div>
                          </div>
                          <div class="flex-1">
                            <label
                              class="block text-sm font-medium mb-1"
                              for="card-cvc"
                              >CVC <span class="text-rose-500">*</span></label
                            >
                            <input
                              id="card-cvc"
                              v-model="cvc"
                              class="form-input w-full"
                              type="text"
                              maxlength="3"
                              placeholder="CVC"
                              @input="formatCVC"
                            />
                            <div
                              v-if="errors.cvc"
                              class="text-xs mt-1 text-rose-500"
                            >
                              {{ errors.cvc }}
                            </div>
                          </div>
                        </div>

                        <!-- Name on Card -->
                        <div>
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Name on Card
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-name"
                            v-model="cardName"
                            class="form-input w-full"
                            type="text"
                            placeholder="John Doe"
                            @input="formatCardName"
                          />
                          <div
                            v-if="errors.cardName"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.cardName }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Modal footer -->
                  <div class="px-5 py-4 border-t border-slate-200">
                    <div class="flex flex-wrap justify-end space-x-2">
                      <button
                        class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                        @click.stop="
                          modalOpen = false;
                          showDeleteButton = false;
                        "
                      >
                        Cancel
                      </button>
                      <button
                        v-if="
                          validation.creditCardNumber &&
                          validation.expiryDate &&
                          validation.cvc &&
                          validation.cardName
                        "
                        class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                        @click="addCreditCard()"
                      >
                        Add
                      </button>
                      <button
                        v-if="
                          !validation.creditCardNumber ||
                          !validation.expiryDate ||
                          !validation.cvc ||
                          !validation.cardName
                        "
                        class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                        disabled
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </ModalBasic>

                <!-- Panel body -->
                <div class="space-y-6">
                  <!-- Billing Information -->
                  <section>
                    <div v-if="!isHide" class="grid place-items-center">
                      <div class="card">
                        <div class="card-inner">
                          <div class="front">
                            <img
                              src="https://t4.ftcdn.net/jpg/02/28/90/29/360_F_228902961_uOLa60iyETJufWEoXUkjnewnQkU1lJYW.jpg"
                              class="map-img"
                            />
                            <div class="row">
                              <img
                                src="https://i.ibb.co/G9pDnYJ/chip.png"
                                width="60px"
                              />
                              <img
                                src="https://i.ibb.co/WHZ3nRJ/visa.png"
                                width="60px"
                              />
                            </div>
                            <div class="row card-no">
                              <p>****</p>
                              <p>****</p>
                              <p>****</p>
                              <p>6420</p>
                            </div>
                            <div class="row card-holder">
                              <p>CARD HPLDER</p>
                              <p>VALID TILL</p>
                            </div>
                            <div class="row name">
                              <p>{{ card.cardName }}</p>
                              <p>{{ card.expiryDate }}</p>
                            </div>
                          </div>
                          <div class="back">
                            <img
                              src="https://t4.ftcdn.net/jpg/02/28/90/29/360_F_228902961_uOLa60iyETJufWEoXUkjnewnQkU1lJYW.jpg"
                              class="map-img"
                            />
                            <div class="bar"></div>
                            <div class="row card-cvv">
                              <div>
                                <img
                                  src="https://i.ibb.co/S6JG8px/pattern.png"
                                />
                              </div>
                              <p>{{ card.cvc }}</p>
                            </div>
                            <div class="row card-text">
                              <p>
                                this is a virtual card design using HTML and
                                CSS. You can aslo design something like this.
                              </p>
                            </div>
                            <div class="row signature">
                              <p>CUSTOMER SIGNATURE</p>
                              <img
                                src="https://i.ibb.co/WHZ3nRJ/visa.png"
                                width="80px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <section>
                  <div class="p-6 space-y-6">
                    <div>
                      <h2 class="text-2xl text-slate-800 font-bold mb-4">
                        Important
                      </h2>
                      <div class="text-sm">
                        You will find all your payments in contracts. Your
                        credit card will be automatically deleted if it is
                        expired.
                      </div>
                    </div>
                    <!-- Invoices -->
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "../Sidebar.vue";
import Header from "../Header.vue";
import SettingsSidebar from "./SettingsSidebar.vue";
import Banner from "../../components/Banner2.vue";
import ModalBasic from "../../components/Modal.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {
  ValidateCreditCardNumber,
  ValidateMMYY,
} from "../../utils/utils-common-function";

export default {
  name: "BillingPanel",
  components: {
    Sidebar,
    Header,
    SettingsSidebar,
    Banner,
    ModalBasic,
  },
  data() {
    const store = useStore();
    const modalOpen = ref(false);
    const token = store.getters["auth/token"];
    const email = store.getters["auth/email"];
    const card = ref(null);
    const isHide = ref(true);

    onMounted(async () => {
      await fetchMessages();
    });

    // Fetch messages from the store
    async function fetchMessages() {
      const payload = {
        email: email,
        token: token,
      };
      try {
        const fetchedCard = await store.dispatch("auth/getCreditCard", payload);
        card.value = fetchedCard;
        if (fetchedCard?.message === "this user does not have a card !") {
          isHide.value = true;
          return;
        }
        isHide.value = false;
      } catch (error) {
        console.log(error);
      }
    }

    function onOpenModal() {
      modalOpen.value = true;
    }

    function onModalClose() {
      modalOpen.value = false;
    }

    async function addCreditCard() {
      if (!ValidateCreditCardNumber(this.creditCardNumber)) {
        return;
      }
      if (this.cvc.length < 3) {
        return;
      }

      if (this.cardName.length < 3) {
        return;
      }
      this.cvc = Number(this.cvc);

      const actionPayload = {
        cardNumber: this.creditCardNumber,
        expiryDate: this.expiryDate,
        cvc: this.cvc,
        cardName: this.cardName,
        userEmail: email,
        token: token,
      };

      try {
        const response = await store.dispatch(
          "auth/createCreditCard",
          actionPayload
        );
        await response.json();
        await fetchMessages();
      } catch (error) {
        console.log(error);
      }
      modalOpen.value = false;
      this.validation.creditCardNumber = false;
      this.validation.expiryDate = false;
      this.validation.cvc = false;
      this.validation.cardName = false;
      this.creditCardNumber = "";
      this.cvc = "";
      this.expiryDate = "";
      this.cardName = "";
    }
    async function deleteCard() {
      const actionPayload = {
        email: email,
        token: token,
      };
      try {
        const response = await store.dispatch(
          "auth/deleteCreditCard",
          actionPayload
        );
        if (response.message == "You have delete credit card with success !") {
          Swal.fire({
            text: "Your credit card was deleted",
            icon: "success",
          });
          await fetchMessages();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      modalOpen,
      onOpenModal,
      onModalClose,
      addCreditCard,
      deleteCard,
      creditCardNumber: "",
      expiryDate: "",
      cvc: "",
      cardName: "",
      userEmail: null,
      token: null,
      errors: {
        creditCardNumber: null,
        expiryDate: null,
        cvc: null,
      },
      card,
      isHide,
      validation: {
        creditCardNumber: false,
        expiryDate: false,
        cvc: false,
        cardName: false,
      },
    };
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
    formatCreditCardNumber() {
      // Remove any existing spaces from the credit card number
      let formattedNumber = this.creditCardNumber.replace(/\s/g, "");

      // Add spaces after every 4 digits
      formattedNumber = formattedNumber.replace(/\D/g, "");

      // Remove any non-digit characters from the card number
      formattedNumber = formattedNumber.replace(/(.{4})/g, "$1 ");

      // Update the credit card number with the formatted value
      this.creditCardNumber = formattedNumber;
      console.log(ValidateCreditCardNumber(this.creditCardNumber));
      if (!ValidateCreditCardNumber(this.creditCardNumber)) {
        this.errors.creditCardNumber = "Please provide a valid Visa number!";
        this.validation.creditCardNumber = false;
      } else {
        this.errors.creditCardNumber = "";
        this.validation.creditCardNumber = true;
      }
    },
    formatExpiryDate() {
      // Remove any non-digit characters from the expiry date
      let formattedDate = this.expiryDate.replace(/\D/g, "");
      // Limit the length to 4 digits
      formattedDate = formattedDate.slice(0, 4);
      // Add a slash after the second digit
      if (formattedDate.length > 2) {
        formattedDate =
          formattedDate.slice(0, 2) + "/" + formattedDate.slice(2);
      }
      // Update the expiry date with the formatted value
      this.expiryDate = formattedDate;
      if (!ValidateMMYY(this.expiryDate)) {
        this.errors.expiryDate = "Please enter a valid date in MM/YY format.";
        this.validation.expiryDate = false;
      } else {
        this.errors.expiryDate = "";
        this.validation.expiryDate = true;
      }
    },
    formatCVC() {
      // Remove any non-digit characters from the cvc
      let formattedCVC = this.cvc.replace(/\D/g, "");
      // Limit the length to 3 digits
      formattedCVC = formattedCVC.slice(0, 3);
      // Update the cvc with the formatted value
      this.cvc = formattedCVC;

      if (this.cvc.length < 3) {
        this.errors.cvc = "Please enter a valide cvc number";
        this.validation.cvc = false;
      } else {
        this.errors.cvc = "";
        this.validation.cvc = true;
      }
    },
    formatCardName() {
      if (this.cardName.length < 3) {
        this.errors.cardName = "Enter a valide card name";
        this.validation.cardName = false;
      } else {
        this.errors.cardName = "";
        this.validation.cardName = true;
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=josefin+Sans:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Josefin Sans", sans-serif;
}

.container {
  min-height: 100vh;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 380px;
  height: 219px;
  color: #fff;
  cursor: pointer;
  perspective: 1000px;
}
.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.front,
.back {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #000000, #8788ff);
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 30px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
  backface-visibility: hidden;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.map-img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: -1;
}

.card-no {
  font-size: 25px;
  margin-top: 7px;
}

.card-holder {
  font-size: 12px;
  margin-top: 10px;
}

.name {
  font-size: 22px;
  margin-top: 20px;
}

.bar {
  background: #222;
  margin-left: -30px;
  margin-right: -30px;
  height: 60px;
  margin-top: 10px;
}

.card-cvv {
  margin-top: 20px;
}

.card-cvv div {
  flex: 1;
}

.card-cvv img {
  width: 100%;
  display: block;
  line-height: 0;
}

.card-cvv p {
  background: #fff;
  color: #000;
  font-size: 22px;
  padding: 10px 20px;
}

.card-text {
  margin-top: 30px;
  font-size: 14px;
}

.signature {
  margin-top: 30px;
}

.back {
  transform: rotateY(180deg);
}

.card:hover .card-inner {
  transform: rotateY(-180deg);
}
</style>
