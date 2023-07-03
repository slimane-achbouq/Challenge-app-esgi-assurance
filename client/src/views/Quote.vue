<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <Banner
          type="success"
          class="mb-4"
          :open="quoteUpdated"
          v-if="quoteUpdated"
        >
          Quote edited successfully .
        </Banner>

        <Banner type="success" class="mb-4" :open="deleted" v-if="deleted">
          Quote deleted successfully.
        </Banner>

        <div class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                <i class="fa fa-file-contract"></i> Quote Detail ✨
              </h1>
            </div>

            <!-- Right: Actions -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
              v-if="quote && this.quote.insurancePremium == 0"
            >
              <button
                class="btn border-slate-200 hover:border-slate-300 text-slate-600"
                @click="modalOpen = true"
                v-if="this.quote.insurancePremium == 0"
              >
                <svg
                  class="w-4 h-4 fill-current text-slate-500 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"
                  />
                </svg>
                <span class="ml-2">Edit Quote</span>
              </button>

              <button
                class="btn border-slate-200 hover:border-slate-300 text-rose-500"
                @click="modaDeletelOpen = true"
                v-if="this.quote.insurancePremium == 0"
              >
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                  <path
                    d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"
                  />
                </svg>
                <span class="ml-2">Delete</span>
              </button>

              <!-- Add account button -->
              <router-link
                :to="{ name: 'newcontract', params: { id: quote.id } }"
              >
                <button
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <svg
                    class="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                    />
                  </svg>
                  <span class="hidden xs:block ml-2" v-if="role === 'User'"
                    >Choose my plan</span
                  >
                </button>
              </router-link>
            </div>
          </div>

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-5">
            <!-- User detail -->

            <div
              class="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200"
            >
              <div class="px-5 py-2">
                <div>
                  <div class="mb-2">
                    <i class="fas fa-user m-2"></i
                    ><strong class="text-1xl text-slate-800"
                      >Customer information</strong
                    >
                  </div>
                </div>
                <div class="">
                  <!-- Left side -->
                  <div class="flex items-center mb-4 md:mb-0">
                    <!-- Avatar -->
                    <div class="mr-4">
                      <img
                        class="inline-flex rounded-full"
                        src="@/images/useravatar.png"
                        width="64"
                        height="64"
                        alt="User"
                      />
                    </div>
                    <!-- User info -->

                    <table class="table-auto w-full">
                      <!-- Table header -->
                      <thead
                        class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm"
                      >
                        <tr>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">
                              First Name | Last Name
                            </div>
                          </th>

                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">email</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">
                              phoneNumber
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">adresse</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">Age</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">Status</div>
                          </th>
                        </tr>
                      </thead>
                      <!-- Table body -->
                      <tbody
                        class="text-sm font-medium divide-y divide-slate-100"
                      >
                        <!-- Row -->
                        <tr v-if="user">
                          <td class="p-2 whitespace-nowrap">
                            <div class="flex items-center">
                              <div>
                                <div class="text-slate-800 uppercase">
                                  {{ user.firstname }} {{ user.lastname }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="font-normal text-left">
                              {{ user.email }}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="font-normal text-left">
                              {{ user.phoneNumber }}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="font-normal text-left">
                              {{ user.adresse }} {{ user.city }}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left">
                              {{ calculateAge(user.age) }} yo
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left text-emerald-500">
                              <span
                                class="bg-emerald-100 text-emerald-600 font-medium rounded-full text-center px-2.5 py-1"
                                v-if="user.isValide"
                                >Actif</span
                              ><span
                                class="bg-amber-100 text-amber-600 font-medium rounded-full text-center px-2.5 py-1"
                                v-if="!user.isValide"
                                >Inactif</span
                              >
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- quote info -->

            <div
              class="flex flex-col col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200"
            >
              <header
                class="px-5 py-4 border-b border-slate-100 flex items-center justify-between"
              >
                <h2 class="font-semibold text-slate-800">
                  <i class="fas fa-file-contract"></i> Quote informations
                </h2>
                <i
                  class="far fa-edit cursor-pointer"
                  @click="modalOpen = true"
                  v-if="quote && this.quote.insurancePremium == 0"
                ></i>
              </header>

              <div class="px-10 divide-y divide-slate-100 space-y-3" v-if="quote">
                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">Status</div>
                    <div class="  ">
                      <span
                        class="bg-emerald-100 text-emerald-600 font-medium rounded-full text-center px-2.5 py-1"
                        v-if="quote.insuranceId"
                        >subscribed</span
                      ><span
                        class="bg-amber-100 text-amber-600 font-medium rounded-full text-center px-2.5 py-1"
                        v-if="!quote.insuranceId"
                        >unsubscribed</span
                      >
                    </div>
                  </div>
                </div>

                <div class="divide-y divide-slate-100">
                  <div
                    class="flex justify-between text-sm m-3 divide-slate-100"
                  >
                    <div class="font-medium text-slate-800">Quote Number</div>
                    <div class="">{{ quote.quoteNumber }}</div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">Insurance Type</div>
                    <div class="">{{ quote.insuranceType }}</div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">Coverage</div>
                    <div class="">{{ quote.coverage }}</div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">
                      Coverage Duration
                    </div>
                    <div class="">{{ quote.coverageDuration }} Months</div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">
                      Coverage Start Date
                    </div>
                    <div class="">
                      {{ processDate(quote.coverageStartDate) }}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">Creating Date</div>
                    <div class="">{{ processDate(quote.createdAt) }}</div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm m-3">
                    <div class="font-medium text-slate-800">Last update</div>
                    <div class="">{{ processDate(quote.updatedAt) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quote detail -->
            <div v-if="quote"
              class="col-span-full xl:col-span-6 bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg rounded-sm border border-slate-800"
            >
              <header v-if="quote"
                class="px-5 py-4 border-b border-slate-600 flex items-center justify-between font-semibold"
              >
                <h2 class="font-semibold text-slate-200">
                  <i class="fas fa-bus"></i> Vehicle informations
                </h2>
                <router-link
                  class="block"
                  :to="{ name: 'editquote', params: { id: quote.vehicle.id } }"
                >
                  <i
                    class="far fa-edit font-semibold text-slate-200 cursor-pointer"
                    v-if="this.quote.insurancePremium == 0"
                  ></i>
                </router-link>
              </header>
              <div class="h-full px-5 py-2" v-if="quote">
                <!-- Details -->
                <div class="justify-center">
                  <div
                    class="text-xs text-slate-500 font-semibold uppercase mb-3"
                  >
                    Details
                  </div>
                  <div class="divide-y divide-slate-300 m-3">
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">Vehicle type</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.vehicleType }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">Brand</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.brand }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">Model</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.model }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">Horsepower</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.horsepower }} HP
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">License Plate</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.licensePlate }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">License Obtained Date</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.licenseObtainedDate }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">
                          Vehicle Circulation Date
                        </div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.vehicleCirculationDate }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">
                          Registration Card Holder
                        </div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.registrationCardHolder }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">registrationCardDate</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.registrationCardDate }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">Purshace type</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.purchaseMode }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-sm m-1">
                        <div class="text-slate-300">Annual Mileage</div>
                        <div class="text-slate-400 italic">
                          {{ quote.vehicle.annualMileage }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-span-full bg-white shadow-lg rounded-sm border border-slate-200 mx-8"
            >
              <div
                class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
              >
                <div
                  class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2"
                >
                  <!-- Left side -->
                  <div class="flex items-start space-x-3 md:space-x-4">
                    <div class="w-9 h-9 shrink-0 mt-1">
                      <img
                        @click="downloadFile"
                        class="w-9 h-9 rounded-full"
                        src="@/images/pdf.png"
                        width="36"
                        height="36"
                      />
                    </div>
                    <div>
                      Carte Grise file :
                      <div class="text-sm">Cartegrise.pdf</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4 pl-10 md:pl-0">
                    <button></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ModalBasic id="feedback-modal" :modalOpen="modalOpen" title="Edit Quote">
        <!-- Modal content -->
        <div class="px-5 py-4">
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1" for="card-country"
                  >Insurance Type <span class="text-rose-500">*</span></label
                >
                <select
                  id="card-country"
                  class="form-select w-full"
                  v-model="formData.insuranceType"
                >
                  <option>Liability</option>
                  <option>Collision</option>
                  <option>Comprehensive</option>
                </select>
                <p class="text-xs mt-1 text-rose-500"></p>
                <div class="text-xs mt-1 text-rose-500"></div>
              </div>
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1" for="card-country"
                  >Coverage <span class="text-rose-500">*</span></label
                >
                <select
                  id="card-country"
                  class="form-select w-full"
                  v-model="formData.coverage"
                >
                  <option>Basic</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
                <p class="text-xs mt-1 text-rose-500"></p>
                <div class="text-xs mt-1 text-rose-500"></div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1" for="card-address"
                  >Coverage Duration by months
                  <span class="text-rose-500">*</span></label
                >
                <input
                  id="card-address"
                  class="form-input w-full placeholder-slate-300"
                  type="number"
                  v-model="formData.coverageDuration"
                  placeholder="12"
                />
                <p class="text-xs mt-1 text-rose-500"></p>
                <div class="text-xs mt-1 text-rose-500"></div>
              </div>
              <div class="col-span-1">
                <label class="block text-sm font-medium mb-1" for="startingDate"
                  >Coverage Start Date <span class="text-rose-500">*</span><br
                /></label>
                <input
                  type="date"
                  class="form-input w-full"
                  id="startingDate"
                  name="startingDate"
                  v-model="formData.coverageStartDate"
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

      <ModalBasic id="danger-modal" :modalOpen="modaDeletelOpen">
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
                Delete Quote?
              </div>
            </div>
            <!-- Modal content -->
            <div class="text-sm mb-10">
              <div class="">
                <p>Are you sure you want to delete the Quote?</p>
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
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import axios from "axios";
import moment from "moment";
import ModalBasic from "@/components/Modal.vue";
import Banner from "@/components/Banner.vue";

export default {
  name: "Quote",
  components: {
    Sidebar,
    Header,
    ModalBasic,
    Banner,
  },
  data() {
    return {
      id: null,
      quote: null,
      customer: null,
      user: null,
      formData: {
        insuranceType: "Collision",
        coverage: "Basic",
        coverageDuration: "",
        coverageStartDate: "",
      },
      modalOpen: false,
      quoteUpdated: false,
      modaDeletelOpen: false,
      deleted: false,
      role: null,
    };
  },
  methods: {
    downloadFile() {
      const byteArray = new Uint8Array(this.quote.vehicle.carteGrise.data);

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
    calculateAge(birthDateString) {
      const birthDate = moment(birthDateString);
      const now = moment();
      return now.diff(birthDate, "years");
    },
    onModaDeletelOpen() {
      this.modaDeletelOpen = true;
    },
    async deleteItem() {
      const token = this.$store.getters["auth/token"];
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/quotes/${this.quote.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.modaDeletelOpen = false;
        this.deleted = true;
      } catch (e) {
        console.log(e)
        this.modaDeletelOpen = false;
        this.deleted = false;
      }
    },
    async onUpdate() {
      const token = this.$store.getters["auth/token"];
      // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/quotes/${this.quote.id}`,
        this.formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.quoteUpdated = true;
      this.modalOpen = false;
    },
  },

  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },

  async created() {
    this.role = this.$store.getters["auth/roles"];
    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const token = this.$store.getters["auth/token"];
    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/quotes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    /*if(response.data["hydra:member"]){
          customers.value = await response.data["hydra:member"];
        }*/

    if (response.data) {
      this.quote = response.data;
    }

    this.formData.insuranceType = this.quote.insuranceType;
    this.formData.coverage = this.quote.coverage;
    this.formData.coverageDuration = this.quote.coverageDuration;
    this.formData.coverageStartDate = this.processDate(
      this.quote.coverageStartDate
    );
    const response1 = JSON.parse(localStorage.getItem("one-user")) ?? await axios.get(
      `${import.meta.env.VITE_API_URL}/getoneuser/${this.quote.userId}`,
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
      if (!localStorage.getItem("one-user")) {
        localStorage.setItem("one-user", JSON.stringify(response));
      }
      this.user = response1.data;
    }
  },
};
</script>
