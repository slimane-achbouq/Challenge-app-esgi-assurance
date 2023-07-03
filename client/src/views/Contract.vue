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
        <Banner
          v-if="contractUpdated"
          type="success"
          class="mb-1"
          :open="contractUpdated"
        >
          Contract edited successfully .
        </Banner>

        <Banner
          v-if="!payment && role === 'User'"
          type="error"
          class="mb-1"
          :open="true"
        >
          You have not yet paid for this contract, click
          <a
            class="cursor-pointer text-blue-900/100"
            @click="submit(`Azulance -  option`, price)"
          >
            here.</a
          >
          to start payment
        </Banner>

        <Banner v-if="deleted" type="success" class="mb-1" :open="deleted">
          Contract deleted successfully.
        </Banner>

        <Banner v-if="role === 'User'" type="warning" class="mb-1" :open="true">
          To edit the inforamtions of the contract you must create a request

          <router-link
                  :to="{ name: 'contact' }"
                >
          <a class="cursor-pointer text-blue-900/100"> here.</a>
          </router-link>
        </Banner>

        <Banner
          v-if="contract && !contract.status && role === 'User'"
          type="warning"
          class="mb-1"
          :open="true"
        >
          this contract is not yet validated by the admin
        </Banner>

        <div class="lg:relative lg:flex">
          <!-- Content -->
          <div
            class="px-4 sm:px-6 lg:px-2 py-8 lg:grow lg:pr-4 xl:pr-4 2xl:ml-1"
          >
            <div class="lg:mx-10">
              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <header class="mb-6 flex w-full justify-between">
                  <!-- Title -->
                  <h1
                    class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"
                  >
                    <i class="fas fa-file-contract"></i> Contract Detail ✨
                  </h1>
                  <div>
                    <button
                      v-if="role === 'Admin'"
                      class="btn border-slate-200 hover:border-slate-300 text-slate-600 mr-2"
                      @click="modalOpen = true"
                    >
                      <svg
                        class="w-4 h-4 fill-current text-slate-500 shrink-0"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"
                        />
                      </svg>
                      <span class="ml-2">Edit Contract</span>
                    </button>

                    <button
                      v-if="role === 'Admin'"
                      class="btn border-slate-200 hover:border-slate-300 text-rose-500"
                      @click="modaDeletelOpen = true"
                    >
                      <svg
                        class="w-4 h-4 fill-current shrink-0"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"
                        />
                      </svg>
                      <span class="ml-2">Delete</span>
                    </button>
                  </div>
                </header>
                <!-- Billing Information -->
                <!-- Cart items -->
                <div v-if="contract" class="mb-6 lg:mb-0">
                  <div
                    class="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200"
                  >
                    <button
                      v-if="role === 'User' && contract.status"
                      class="btn border-rose-500 hover:border-slate-300 text-rose-500 m-3"
                      @click="modaDeletelOpen = true"
                    >
                      <router-link
                        :to="{
                          name: 'new_claim',
                          params: { insurance_id: contract._id },
                        }"
                      >
                        <span class="ml-2"
                          ><i class="fas fa-file-signature"></i> Create a
                          claim</span
                        >
                      </router-link>
                    </button>

                    <button
                      v-if="role === 'Admin' && !contract.status"
                      class="btn border-green-500 hover:border-slate-300 text-green-500 m-3"
                      @click="modaValidateOpen = true"
                    >
                      <span class="ml-2"
                        ><i class="fas fa-file-signature"></i> Validate
                        contract</span
                      >
                    </button>

                    <header
                      class="pr-10 pl-5 py-4 border-b border-slate-100 flex items-center justify-between"
                    >
                      <h2 class="font-semibold text-slate-800">
                        <i class="fas fa-file-contract"></i> Contract
                        informations
                      </h2>
                      <i
                        v-if="role === 'Admin'"
                        class="far fa-edit cursor-pointer"
                        @click="modalOpen = true"
                      ></i>
                    </header>

                    <div class="px-10 divide-y divide-slate-100 space-y-3">
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Status</div>
                          <div class="  ">
                            <span
                              v-if="contract.status"
                              class="bg-emerald-100 text-emerald-600 font-medium rounded-full text-center px-2.5 py-1"
                              >Valid</span
                            ><span
                              v-if="!contract.status"
                              class="bg-amber-100 text-amber-600 font-medium rounded-full text-center px-2.5 py-1"
                              >Invalid</span
                            >
                            <span
                              v-if="!payment"
                              class="bg-amber-100 text-amber-600 font-medium rounded-full bg-rose-100 text-rose-600 text-center px-2.5 py-1"
                              >Unpaid</span
                            >
                          </div>
                        </div>
                      </div>

                      <div class="divide-y divide-slate-100">
                        <div
                          class="flex justify-between text-sm m-3 divide-slate-100"
                        >
                          <div class="font-medium text-slate-800 mx-35">
                            Quote Number
                          </div>
                          <div class="">{{ contract.dossierNumber }}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">
                            Insurance Type
                          </div>
                          <div class="">{{ contract.insuranceType }}</div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Price</div>
                          <div class="">{{ contract.insurancePremium }}</div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">
                            Coverage End date
                          </div>
                          <div class="">
                            {{ processDate(contract.coverageStartDate) }}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">
                            Coverage Start Date
                          </div>
                          <div class="">
                            {{ processDate(contract.coverageEndDate) }}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">
                            Creating Date
                          </div>
                          <div class="">
                            {{ processDate(contract.createdAt) }}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">
                            Last update
                          </div>
                          <div class="">
                            {{ processDate(contract.updatedAt) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div
              class="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[320px] xl:w-[352px] 2xl:w-[calc(352px+80px)] lg:h-[calc(100vh-64px)]"
            >
              <div class="py-8 px-4">
                <div class="max-w-sm mx-auto lg:max-w-none">
                  <h2 class="text-2xl text-slate-800 font-bold mb-6">
                    Related information
                  </h2>
                  <div class="space-y-6">
                    <!-- Sidebar -->

                    <div v-if="user" class="h-full px-5 py-2">
                      <!-- Details -->
                      <div class="justify-center">
                        <div
                          class="text-xs text-slate-500 font-semibold uppercase mb-3"
                        >
                          <i class="fas fa-user"></i>
                          Beneficiary
                        </div>
                        <div class="divide-y divide-slate-300 m-3">
                          <div>
                            <div class="flex justify-between text-sm m-2">
                              <div class="text-slate-800">Name</div>
                              <div class="text-slate-400 italic">
                                {{ user.firstName }} {{ user.firstName }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="flex justify-between text-sm m-2">
                              <div class="text-slate-800">Adresse</div>
                              <div class="text-slate-400 italic">
                                {{ user.postalAddress }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="flex justify-between text-sm m-2">
                              <div class="text-slate-800">Phone Number</div>
                              <div class="text-slate-400 italic">
                                {{ user.phoneNumber }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="flex justify-between text-sm m-2">
                              <div class="text-slate-800">Email</div>
                              <div class="text-slate-400 italic">
                                {{ user.email }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="flex justify-between text-sm m-2">
                              <div class="text-slate-800">License</div>
                              <div class="text-slate-400 italic">
                                <i
                                  class="fas fa-download cursor-pointer"
                                  @click="downloadFile(user.permis)"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="flex justify-between text-sm m-2">
                              <div class="text-slate-800">Proof of adresse</div>
                              <div class="text-slate-400 italic">
                                <i
                                  class="fas fa-download cursor-pointer"
                                  @click="
                                    downloadFile(user.justificatifDomicile)
                                  "
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <!-- For contract component -->
                      <div
                        class="col-span-full bg-white shadow-lg rounded-sm border border-slate-200 px-5"
                      >
                        <header class="py-4 border-b border-slate-100">
                          <h2 class="font-semibold text-slate-800">
                            <i class="fas fa-money-check-alt"></i> Paiment
                            History
                          </h2>
                        </header>
                        <div class="p-3">
                          <!-- Table -->
                          <div class="overflow-x-auto">
                            <table class="table-auto w-full">
                              <!-- Table header -->
                              <thead
                                class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm"
                              >
                                <tr>
                                  <th class="whitespace-nowrap p-4">
                                    <div class="font-semibold text-left">
                                      Transcation id
                                    </div>
                                  </th>
                                  <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">
                                      Paiment date
                                    </div>
                                  </th>
                                  <th class="p-2 whitespace-nowrap p-2">
                                    <div class="font-semibold text-left">
                                      total
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <!-- Table body -->
                              <tbody
                                class="text-sm font-medium divide-y divide-slate-100"
                              >
                                <!-- Row -->
                                <tr v-if="payment">
                                  <td
                                    class="p-2 whitespace-nowrap md:w-1/2 p-3"
                                  >
                                    <div class="flex items-center">
                                      <div>
                                        <div class="text-slate-800 uppercase">
                                          #{{ payment._id }}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="p-2 whitespace-nowrap">
                                    <div class="font-normal text-left">
                                      {{ formatDate(payment.createdAt) }}
                                    </div>
                                  </td>
                                  <td class="p-2 whitespace-nowrap">
                                    <div class="text-left text-emerald-500">
                                      {{ payment.price }}€
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ModalBasic
              id="feedback-modal"
              :modal-open="modalOpen"
              title="Edit Quote"
            >
              <!-- Modal content -->
              <div class="px-5 py-4">
                <div class="space-y-3">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="card-address"
                        >Price <span class="text-rose-500">*</span></label
                      >
                      <input
                        id="card-address"
                        v-model="formData.insurancePremium"
                        class="form-input w-full placeholder-slate-300"
                        type="number"
                        placeholder="12"
                      />
                      <p class="text-xs mt-1 text-rose-500"></p>
                      <div class="text-xs mt-1 text-rose-500"></div>
                    </div>

                    <div class="col-span-1">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="card-country"
                        >Insurance Type
                        <span class="text-rose-500">*</span></label
                      >
                      <select
                        id="card-country"
                        v-model="formData.insuranceType"
                        class="form-select w-full"
                      >
                        <option>Liability</option>
                        <option>Collision</option>
                        <option>Comprehensive</option>
                      </select>
                      <p class="text-xs mt-1 text-rose-500"></p>
                      <div class="text-xs mt-1 text-rose-500"></div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="startingDate"
                        >Coverage Start Date <span class="text-rose-500">*</span
                        ><br
                      /></label>
                      <input
                        id="startingDate"
                        v-model="formData.coverageStartDate"
                        type="date"
                        class="form-input w-full"
                        name="startingDate"
                      />
                      <p class="text-xs mt-1 text-rose-500"></p>
                    </div>
                    <div class="col-span-1">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="startingDate"
                        >Coverage End Date <span class="text-rose-500">*</span
                        ><br
                      /></label>
                      <input
                        id="startingDate"
                        v-model="formData.coverageEndDate"
                        type="date"
                        class="form-input w-full"
                        name="startingDate"
                      />
                      <p class="text-xs mt-1 text-rose-500"></p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="px-5 py-4 border-t border-slate-200">
                <div class="flex flex-wrap justify-end space-x-2">
                  <button
                    class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                    @click="modalOpen = false"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                    @click="onUpdate"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </ModalBasic>

            <ModalBasic id="danger-modal" :modal-open="modaDeletelOpen" v-if="role == 'Admin'">
              <div class="p-5 flex w-full space-x-4">
                <!-- Icon -->
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100"
                >
                  <svg
                    class="w-4 h-4 shrink-0 fill-current text-rose-500"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
                    />
                  </svg>
                </div>
                <!-- Content -->
                <div>
                  <!-- Modal header -->
                  <div class="mb-2">
                    <div class="text-lg font-semibold text-slate-800">
                      Delete Contract?
                    </div>
                  </div>
                  <!-- Modal content -->
                  <div class="text-sm mb-10">
                    <div class="">
                      <p>Are you sure you want to delete the Contract?</p>
                    </div>
                  </div>
                  <!-- Modal footer -->
                </div>
              </div>

              <div class="flex flex-wrap justify-end space-x-2 m-6">
                <button
                  class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                  @click.stop="modaDeletelOpen = false"
                >
                  Cancel
                </button>
                <button
                  class="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
                  @click="deleteItem"
                >
                  Yes, Delete it
                </button>
              </div>
            </ModalBasic>

            <ModalBasic id="danger-modal" :modal-open="modaValidateOpen">
              <div class="p-5 flex w-full space-x-4">
                <!-- Icon -->
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100"
                >
                  <svg
                    class="w-4 h-4 shrink-0 fill-current text-green-500"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
                    />
                  </svg>
                </div>
                <!-- Content -->
                <div>
                  <!-- Modal header -->
                  <div class="mb-2">
                    <div class="text-lg font-semibold text-slate-800">
                      Validate Contract?
                    </div>
                  </div>
                  <!-- Modal content -->
                  <div class="text-sm mb-10">
                    <div class="">
                      <p>Are you sure you want to vaidate the Contract?</p>
                    </div>
                  </div>
                  <!-- Modal footer -->
                </div>
              </div>

              <div class="flex flex-wrap justify-end space-x-2 m-6">
                <button
                  class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                  @click.stop="modaValidateOpen = false"
                >
                  Cancel
                </button>
                <button
                  class="btn-sm bg-green-500 hover:bg-green-600 text-white"
                  @click="validateItem"
                >
                  Yes, Validate it
                </button>
              </div>
            </ModalBasic>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div v-if="sessionId && publishableKey">
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import axios from "axios";
import ModalBasic from "@/components/Modal.vue";
import Banner from "@/components/Banner.vue";
import moment from "moment";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  name: "Contract",
  components: {
    Sidebar,
    Header,
    ModalBasic,
    Banner,
    StripeCheckout,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
  data() {
    return {
      contract: null,
      user: null,
      formData: {
        insuranceType: "Collision",
        coverage: "Basic",
        coverageStartDate: "",
        insurancePremium: "",
        coverageEndDate: "",
      },
      modalOpen: false,
      contractUpdated: false,
      modaDeletelOpen: false,
      modaValidateOpen: false,
      deleted: false,
      role: null,
      payment: null,
      sessionId: null,
      publishableKey:
        "pk_test_51MZYljHiiKajDgAsKTAGtexDySSMf7qJ1VxyjEIebTMcEcttRWeCGMnXtXgtCdEf0iN5k60WuXQxGlAva3xG0Yvo00ImgD98YH",
    };
  },
  async created() {
    this.role = this.$store.getters["auth/roles"];

    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const token = this.$store.getters["auth/token"];
    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    let response = null;

    try {
      response = await axios.get(
          `${import.meta.env.VITE_API_URL}/insurance/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      localStorage.setItem("insurance-data", JSON.stringify(response.data));
    }
    catch(e) {
      response = JSON.parse(localStorage.getItem("insurance-data"));
    }

    /*if(response.data["hydra:member"]){
      customers.value = await response.data["hydra:member"];
    }*/

    if (response.data) {
      this.contract = response.data;
    }

    this.formData.insuranceType = this.contract.insuranceType;
    this.formData.coverageDuration = this.contract.coverageDuration;
    this.formData.coverageStartDate = this.processDate(
      this.contract.coverageStartDate
    );
    this.formData.coverageEndDate = this.processDate(
      this.contract.coverageEndDate
    );
    this.formData.insurancePremium = this.contract.insurancePremium;


    const response1 = JSON.parse(localStorage.getItem("beneficiary-data")) ?? await axios.get(
      `${import.meta.env.VITE_API_URL}/beneficiary/${this.contract.beneficiary}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    /*if(response.data["hydra:member"]){
      customers.value = await response.data["hydra:member"];
    }*/

    if (response1.data) {
      if (!localStorage.getItem("beneficiary-data")) {
        localStorage.setItem("beneficiary-data", JSON.stringify(response1));
      }
      this.user = response1.data;
    }

    const response2 = await axios.get(
      `${import.meta.env.VITE_API_URL}/payment/${this.contract.quoteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response2.data) {
      this.payment = response2.data;
    }
  },
  methods: {
    submit: async function (title, tarif) {
      await this.getStripeSession(
        title,
        Number(this.contract.insurancePremium)
      );
      this.$refs.checkoutRef.redirectToCheckout();
    },

    getStripeSession: async function (title, tarif) {
      let token = this.$store.getters["auth/token"];
      let request = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/payment/getSession/${title}/${tarif}/${token}/${
          this.contract.quoteId
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.sessionId = request.data.id;
    },

    formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD");
    },
    downloadFile(file) {
      const byteArray = new Uint8Array(file.data);

      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a URL for the blob and download it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank"); // Open in new tab
      document.body.appendChild(link);
      link.click();
    },
    processDate(date) {
      let dateObject = new Date(date);

      let year = dateObject.getUTCFullYear();
      let month = dateObject.getUTCMonth() + 1; // JS months are 0-11
      let day = dateObject.getUTCDate();

      // pad with 0 if needed
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      return `${year}-${month}-${day}`;
    },
    onModaDeletelOpen() {
      this.modaDeletelOpen = true;
    },

    async validateItem() {
      const token = this.$store.getters["auth/token"];
      // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/insurance/${this.contract["_id"]}`,
        { status: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.contract.status=true

      this.contractUpdated = true;
      this.modaValidateOpen = false;
    },

    async deleteItem() {
      const token = this.$store.getters["auth/token"];

      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/insurance/${this.contract["_id"]}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.modaDeletelOpen = false;
        this.deleted = true;
        this.$router.push("quotes");
      } catch (e) {
        this.modaDeletelOpen = false;
        this.deleted = false;
      }
    },

    async onUpdate() {
      const token = this.$store.getters["auth/token"];
      // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/insurance/${this.contract["_id"]}`,
        this.formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.contractUpdated = true;
      this.modalOpen = false;
    },
  },
};
</script>
