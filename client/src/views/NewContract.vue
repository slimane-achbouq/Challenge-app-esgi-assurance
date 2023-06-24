<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

      <main>

        <Banner type="success" class="mb-4" :open="contractCreated" v-if="contractCreated">
          Proceed to payment .
        </Banner>

        <div class="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200 mx-8 my-3">
          <div class="px-5 py-2">
            <div>
              <div class="mb-2 "><i class="fas fa-file-contract"></i><strong class="text-1xl text-slate-800"> Quote
                inforamtions</strong></div>
            </div>
            <div class="">
              <!-- Left side -->
              <div class="flex items-center mb-4 md:mb-0">
                <!-- User info -->

                <table class="table-auto w-full" v-if="quote">
                  <!-- Table header -->
                  <thead class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Insurance Type</div>
                    </th>

                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Coverage</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Coverage Duration</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Coverage Start Date</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Creating Date</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left ">Last update</div>
                    </th>
                  </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm font-medium divide-y divide-slate-100">
                  <!-- Row -->
                  <tr>
                    <td class="p-2 whitespace-nowrap ">
                      <div class="flex items-center">
                        <div>
                          <div class="text-slate-800 uppercase"> {{ quote.insuranceType }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="font-normal text-left">{{ quote.coverage }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="font-normal text-left">{{ quote.coverageDuration }} months</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="font-normal text-left">{{ processDate(quote.coverageStartDate) }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left ">{{ processDate(quote.createdAt) }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left ">{{ processDate(quote.updatedAt) }}</div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
        <div class="px-4 sm:px-6 lg:px-8  w-full">


          <!-- Page content -->
          <div class="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">

            <!-- Content -->
            <div>
              <div class="mb-3">
              </div>


              <header class="mb-4">
                <!-- Title -->
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"><i class="fas fa-file-signature"></i>
                  Contract Informations ✨</h1>
                <p>After creating your contract, the admin will check this inforamtions before validate your
                  contract.</p>
              </header>


              <hr class="my-3 border-t border-slate-200"/>

              <div>
                <form>
                  <div class="space-y-3">

                    <label class="block text-sm font-medium mb-1" for="card-country">Your Driving License <span
                        class="text-rose-500">*</span></label>


                    <div class="flex items-center justify-center w-full"
                         v-if="!hideImageFieladresse">
                      <label for="dropzone-file"
                             class="form-input w-full">
                        <div
                            class="flex flex-col items-center justify-center ">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400"
                               fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload your Driving license </span> or
                            drag and drop</p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            PDF Format Only</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" required
                               @change="handleFile1"/>
                      </label>
                    </div>
                    <div v-if="errors" class="text-xs mt-1 text-rose-500">
                      {{ errors.adresse }}
                    </div>

                    <div class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
                         v-if="hideImageFieladresse">
                      <div class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
                        <!-- Left side -->
                        <div class="flex items-start space-x-3 md:space-x-4">
                          <div class="w-9 h-9 shrink-0 mt-1">
                            <img class="w-9 h-9 rounded-full" src="@/images/pdf.png" width="36" height="36"/>
                          </div>
                          <div>
                            Driving Grise file :
                            <div class="text-sm">{{ adresse }}</div>
                          </div>
                        </div>

                        <div class="flex items-center space-x-4 pl-10 md:pl-0">
                          <button>

                          </button>
                        </div>

                      </div>
                    </div>
                    <div class="space-y-4">


                      <label class="block text-sm font-medium mb-1" for="card-country">Proof of your adresse <span
                          class="text-rose-500">*</span></label>
                      <div class="flex items-center justify-center w-full"
                           v-if="!hideImageFielddrivingLicense">
                        <label for="dropzone-file"
                               class="form-input w-full">
                          <div
                              class="flex flex-col items-center justify-center ">
                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span class="font-semibold">Click to upload the proof of your Adresse</span> or
                              drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              PDF Format Only</p>
                          </div>
                          <input id="dropzone-file" type="file" class="hidden" required
                                 @change="handleFile"/>
                        </label>
                      </div>
                      <div v-if="errors" class="text-xs mt-1 text-rose-500">
                        {{ errors.adresse }}
                      </div>

                      <div class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
                           v-if="hideImageFielddrivingLicense">
                        <div class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
                          <!-- Left side -->
                          <div class="flex items-start space-x-3 md:space-x-4">
                            <div class="w-9 h-9 shrink-0 mt-1">
                              <img class="w-9 h-9 rounded-full" src="@/images/pdf.png" width="36" height="36"/>
                            </div>
                            <div>
                              Adresse Grise file :
                              <div class="text-sm">
                                {{ drivingLicense }}
                              </div>
                            </div>
                          </div>

                          <div class="flex items-center space-x-4 pl-10 md:pl-0">
                            <button>

                            </button>
                          </div>

                        </div>
                      </div>

                    </div>

                    <div class="text-right">


                      <button type="" class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                              @click.prevent="onCreatedContract" v-if="!contractCreated && !existingPayment">Confirm and proceed to payment
                      </button>
                      <button type="" class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                              @click.prevent="onCreatedContract" v-else-if="contractCreated && !existingPayment">Proceed to payment
                      </button>
                      <button type="" class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                              @click.prevent="onCreatedContract" v-else-if="!contractCreated && existingPayment">Confirm
                      </button>

                    </div>


                  </div>


                </form>
              </div>

              <!-- Divider -->
              <hr class="my-6 border-t border-slate-200"/>

            </div>

            <!-- Sidebar -->
            <div>
              <div v-if="!existingPayment"
                   class="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                <div class="text-sm text-slate-800 font-semibold mb-3"><i class="fab fa-buffer"></i> Choose the plan :
                </div>
                <ul class="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col mb-4"
                    v-if="prices">
                  <li>
                    <button
                        :class="{'border-2 border-indigo-400': selectedPlan === 'Basic', 'border border-slate-200 hover:border-slate-300': selectedPlan !== 'Basic'}"
                        class="w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out"
                        @click="price =Math.round(prices[0]) ; selectedPlan = 'Basic'">
                      <div class="flex flex-wrap items-center justify-between mb-0.5">
                        <span class="font-semibold text-slate-800">Basic</span>
                        <span class="font-medium text-emerald-600">{{ Math.round(prices[0]) }} /mo</span>
                      </div>
                      <div class="text-sm">Our Basic coverage offers essential protection at an affordable price.</div>
                    </button>
                  </li>
                  <li>
                    <button
                        :class="{'border-2 border-indigo-400': selectedPlan === 'Standard', 'border border-slate-200 hover:border-slate-300': selectedPlan !== 'Standard'}"
                        class="w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out"
                        @click="price =Math.round(prices[1]) ;;selectedPlan = 'Standard'">
                      <div class="flex flex-wrap items-center justify-between mb-0.5">
                        <span class="font-semibold text-slate-800">Standard <span
                            class="text-xs italic text-indigo-500 align-top">Best Value ✨</span></span>
                        <span class="font-medium text-emerald-600">{{ Math.round(prices[1]) }} /mo</span>
                      </div>
                      <div class="text-sm">Our Standard coverage provides a balanced level of protection at a reasonable
                        cost.
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                        :class="{'border-2 border-indigo-400': selectedPlan === 'Premium', 'border border-slate-200 hover:border-slate-300': selectedPlan !== 'Premium'}"
                        class="w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out"
                        @click="price =Math.round(prices[2]) ;selectedPlan = 'Premium'">
                      <div class="flex flex-wrap items-center justify-between mb-0.5">
                        <span class="font-semibold text-slate-800">Premium</span>
                        <span class="font-medium text-emerald-600">{{ Math.round(prices[2]) }} /mo</span>
                      </div>
                      <div class="text-sm">Our Premium coverage offers the highest level of comprehensive protection for
                        maximum peace of mind.
                      </div>
                    </button>
                  </li>
                </ul>
                <div v-if="quote">
                  <router-link :to="{name: 'new_payment', params: {insurance_id: quote.id}}">
                    <button class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white">Proceed to payment</button>
                  </router-link>
                </div>
                <div class="text-xs text-slate-500 italic text-center">The available plans are based on your vehicle
                  inforamtions<a class="underline hover:no-underline" href="#0"></a>.
                </div>
              </div>
              <div v-else class="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                <div class="text-sm text-slate-800 font-semibold mb-3"><i class="fab fa-buffer"></i> My plan :
                </div>
                <ul class="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col mb-4"
                    v-if="prices">
                  <li v-if="existingPayment.price == Math.round(prices[0])">
                    <button
                        :class="{'border-2 border-indigo-400': existingPayment.price == Math.round(prices[0]), 'border border-emerald-200 hover:border-slate-300': existingPayment.price == Math.round(prices[0])}"
                        class="w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out">
                      <div class="flex flex-wrap items-center justify-between mb-0.5">
                        <span class="font-semibold text-slate-800">Basic</span>
                        <span class="font-medium text-emerald-600">{{ Math.round(prices[0]) }} /mo</span>
                      </div>
                      <div class="text-sm">Our Basic coverage offers essential protection at an affordable price.</div>
                    </button>
                  </li>
                  <li v-if="existingPayment.price == Math.round(prices[1])">
                    <button
                        :class="{'border-2 border-indigo-400': existingPayment.price == Math.round(prices[1]), 'border border-emerald-200 hover:border-slate-300': existingPayment.price == Math.round(prices[1])}"
                        class="w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out">
                      <div class="flex flex-wrap items-center justify-between mb-0.5">
                        <span class="font-semibold text-slate-800">Standard <span
                            class="text-xs italic text-indigo-500 align-top">Best Value ✨</span></span>
                        <span class="font-medium text-emerald-600">{{ Math.round(prices[1]) }} /mo</span>
                      </div>
                      <div class="text-sm">Our Standard coverage provides a balanced level of protection at a reasonable
                        cost.
                      </div>
                    </button>
                  </li>
                  <li v-if="existingPayment.price == Math.round(prices[2])">
                    <button
                        :class="{'border-2 border-indigo-400': existingPayment.price == Math.round(prices[2]), 'border border-emerald-200 hover:border-slate-300': existingPayment.price == Math.round(prices[2])}"
                        class="w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out">
                      <div class="flex flex-wrap items-center justify-between mb-0.5">
                        <span class="font-semibold text-slate-800">Premium</span>
                        <span class="font-medium text-emerald-600">{{ Math.round(prices[2]) }} /mo</span>
                      </div>
                      <div class="text-sm">Our Premium coverage offers the highest level of comprehensive protection for
                        maximum peace of mind.
                      </div>
                    </button>
                  </li>
                </ul>
                <div v-if="!existingPayment" class="text-xs text-slate-500 italic text-center">The available plans are based on your vehicle
                  inforamtions<a class="underline hover:no-underline" href="#0"></a>.
                </div>
              </div>
            </div>


          </div>


        </div>

      </main>

    </div>

  </div>
</template>

<script>
import {ref} from 'vue'
import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import axios from 'axios'
import Banner from '@/components/Banner.vue';
import ModalBlank from '@/components/ModalBlank.vue'

export default {
  name: 'NewContract',
  components: {
    Sidebar,
    Header,
    Banner,
    ModalBlank
  },
  data() {
    return {
      selectedPlan: "Basic",
      existingPayment: null,
      drivingLicense: null,
      hideImageFielddrivingLicense: null,
      adresse: null,
      hideImageFieladresse: null,
      quote: null,
      prices: null,
      errors: null,
      price: null,
      contractCreated: false,
      formData: {
        justificatifDomicile: null,
        permis: null,
        coverageStartDate: null,
        coverageEndDate: null,
        quoteId: null,
        insurancePremium: null
      }
    };
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
      this.drivingLicense = this.file.name
      this.formData.permis = this.file
      this.previewSrc = URL.createObjectURL(event.target.files[0]);
      this.hideImageFielddrivingLicense = true;
    },
    handleFile1(event) {
      this.file = event.target.files[0];
      this.adresse = this.file.name
      this.formData.justificatifDomicile = this.file
      this.previewSrc = URL.createObjectURL(event.target.files[0]);
      this.hideImageFieladresse = true;
    },
    processDate(date) {
      let dateObject = new Date(date);

      let year = dateObject.getUTCFullYear();
      let month = dateObject.getUTCMonth() + 1; // JS months are 0-11
      let day = dateObject.getUTCDate();

      // pad with 0 if needed
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return `${year}-${month}-${day}`;
    },
    async onCreatedContract() {

      this.formData.coverageStartDate = this.quote.coverageStartDate
      this.formData.coverageEndDate = this.quote.coverageStartDate
      this.formData.quoteId = this.quote.id
      this.formData.insurancePremium = this.price


      this.formData.insurancePremium = Number(this.formData.insurancePremium)


      const token = this.$store.getters["auth/token"]
      // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
      /*let response = await axios.post(`${import.meta.env.VITE_API_URL}/beneficiary-insurance`, this.formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })


      if (response.data) {
        this.contractCreated = true
      }*/


    }
  },
  setup() {

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }
  },
  async created() {

    const id = document.URL.substring(document.URL.lastIndexOf('/') + 1);

    const token = this.$store.getters["auth/token"]
    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    let response = await axios.get(`${import.meta.env.VITE_API_URL}/quotes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      this.quote = response.data
    }

    let existingPayment = await axios.get(`${import.meta.env.VITE_API_URL}/payment/${this.quote.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    this.existingPayment = existingPayment.data;

    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    response = await axios.get(`${import.meta.env.VITE_API_URL}/prices/${this.quote.vehicle.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      this.prices = response.data
    }

    this.price = Math.round(this.prices[0])
  }
}
</script>