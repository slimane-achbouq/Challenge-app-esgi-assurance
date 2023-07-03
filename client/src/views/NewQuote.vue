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
          class="mb-1"
          :open="quoteCreated"
          v-if="quoteCreated"
        >
          quote created successfully .
        </Banner>
        <Banner
          type="error"
          class="mb-1"
          :open="Object.keys(errors).length !== 0"
          v-if="true"
        >
          Check the fields.
        </Banner>

        <Banner
          type="error"
          class="mb-1"
          :open="formatIncorrect"
          v-if="formatIncorrect"
        >
          The format of the file must be PDF.
        </Banner>

        <Banner type="success" class="mb-1" :open="true" v-if="caretCrise">
          File uploaded successfully.
        </Banner>

        <div class="lg:relative lg:flex">
          <!-- Content -->
          <div
            class="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]"
          >
            <div class="lg:max-w-[1240px] lg:mx-auto">
              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <div class="mb-3">
                  <!-- Progress bar -->
                  <div class="px-4 pt-4 pb-8">
                    <div class="max-w-md mx-auto w-full">
                      <div class="relative">
                        <div
                          class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                          aria-hidden="true"
                        ></div>
                        <ul class="relative flex justify-between w-full">
                          <li>
                            <a
                              class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              >1</a
                            >
                          </li>
                          <li>
                            <a
                              class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold"
                              :class="
                                step.id >= 2
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-slate-100 text-slate-500'
                              "
                              >2</a
                            >
                          </li>
                          <li>
                            <a
                              class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold"
                              :class="
                                step.id >= 3
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-slate-100 text-slate-500'
                              "
                              >3</a
                            >
                          </li>
                          <li>
                            <a
                              class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold"
                              :class="
                                step.id >= 4
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-slate-100 text-slate-500'
                              "
                              >4</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <header class="mb-6">
                  <!-- Title -->
                  <h1
                    class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"
                    v-if="step.id == 1 || step.id == 2"
                  >
                    <i class="fas fa-car"></i> Vehicle informations
                  </h1>
                  <h1
                    class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"
                    v-if="step.id == 3"
                  >
                    <i class="fas fa-file-signature"></i> Quote informations
                  </h1>
                  <p></p>
                </header>

                <div>
                  <form>
                    <div class="space-y-4">
                      <!-- 1st row -->

                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 1"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-country"
                            >Vehicle Type
                            <span class="text-rose-500">*</span></label
                          >
                          <select
                            id="card-country"
                            class="form-select w-full"
                            v-model="formData.vehicleType"
                          >
                            <option>Car</option>
                            <option>Motorcycle</option>
                            <option>Truck</option>
                          </select>
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.vehicletype"
                          >
                            {{ errors.vehicletype }}
                          </p>
                        </div>
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Brand <span class="text-rose-500">*</span></label
                          >
                          <select
                            id="brand"
                            v-model="formData.brand"
                            class="form-select w-full"
                          >
                            <option
                              v-for="item in brands"
                              :key="item.brand"
                              :value="item.brand"
                            >
                              {{ item.brand }}
                            </option>
                          </select>
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.brand"
                          >
                            {{ errors.brand }}
                          </p>
                        </div>
                      </div>
                      <!-- 2nd row -->
                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 1"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-address"
                            >Model <span class="text-rose-500">*</span></label
                          >

                          <select
                            id="model"
                            v-model="formData.model"
                            class="form-select w-full"
                          >
                            <option
                              v-for="model in selectedBrandModels"
                              :key="model"
                              :value="model"
                            >
                              {{ model }}
                            </option>
                          </select>
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.model"
                          >
                            {{ errors.model }}
                          </p>
                        </div>
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-city"
                            >Horse Power in HP<span class="text-rose-500"
                              >*</span
                            ></label
                          >
                          <input
                            id="card-city"
                            class="form-input w-full placeholder-slate-300"
                            type="number"
                            v-model="formData.horsepower"
                            placeholder="200"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.horsepower"
                          >
                            Horse Power should not be empty
                          </p>
                        </div>
                      </div>
                      <!-- 3rd row -->
                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 1"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-state"
                            >License Plate
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-state"
                            class="form-input w-full placeholder-slate-300"
                            type="text"
                            v-model="formData.licensePlate"
                            placeholder="AA-123-BB"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.licenseplate"
                          >
                            License Plate should not be empty
                          </p>
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.licenseplateformat"
                          >
                            Place Number format not correct
                          </p>
                        </div>
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="startingDate"
                            >License Obtained Date
                            <span class="text-rose-500">*</span><br
                          /></label>
                          <input
                            type="datetime-local"
                            class="form-input w-full"
                            id="startingDate"
                            name="startingDate"
                            v-model="formData.licenseObtainedDate"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.licenseobtaineddate"
                          >
                            Date not valid
                          </p>
                        </div>
                      </div>
                      <!-- 4th row -->
                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 2"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Annual Mileage (KM)
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-name"
                            class="form-input w-full placeholder-slate-300"
                            type="number"
                            v-model="formData.annualMileage"
                            placeholder="70000"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.annualmileage"
                          >
                            Annual Mileage should not be empty
                          </p>
                        </div>

                        <div class="flex-1" v-if="step.id == 2">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="startingDate"
                            >Vehicle Circulation Date
                            <span class="text-rose-500">*</span><br
                          /></label>
                          <input
                            type="datetime-local"
                            class="form-input w-full"
                            id="startingDate"
                            name="startingDate"
                            v-model="formData.vehicleCirculationDate"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.vehiclecirculationdate"
                          >
                            Date not valid
                          </p>
                        </div>
                      </div>

                      <!-- 4th row -->
                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 2"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Registration Card Holder Name<span
                              class="text-rose-500"
                              >*</span
                            ></label
                          >
                          <input
                            id="card-name"
                            class="form-input w-full placeholder-slate-300"
                            type="text"
                            v-model="formData.registrationCardHolder"
                            placeholder="First Name, Last Name"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.registrationcardholder"
                          >
                            Registration Card Holder should not be empty
                          </p>
                        </div>

                        <div class="flex-1" v-if="step.id == 2">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="startingDate"
                            >Registration Card Date
                            <span class="text-rose-500">*</span><br
                          /></label>
                          <input
                            type="datetime-local"
                            class="form-input w-full"
                            id="startingDate"
                            name="startingDate"
                            v-model="formData.registrationCardDate"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.registrationcarddate"
                          >
                            Date not valid
                          </p>
                        </div>
                      </div>

                      <!-- 4th row -->
                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 2"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-country"
                            >Purchase Mode
                            <span class="text-rose-500">*</span></label
                          >
                          <select
                            id="card-country"
                            class="form-select w-full"
                            v-model="formData.purchaseMode"
                          >
                            <option>New</option>
                            <option>Used</option>
                          </select>
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.purchasemode"
                          >
                            {{ errors.purchasemode }}
                          </p>
                        </div>
                        <div class="flex-1" v-if="step.id == 2">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Parking Postal Code
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-name"
                            class="form-input w-full placeholder-slate-300"
                            type="text"
                            v-model="formData.parkingPostalCode"
                            placeholder="75000"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.parkingpostalcode"
                          >
                            Parking Postal C ode should not be empty
                          </p>
                        </div>
                      </div>

                      <!-- 1st row -->

                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 3"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-country"
                            >Insurance Type
                            <span class="text-rose-500">*</span></label
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
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.insurancetype"
                          >
                            {{ errors.insurancetype }}
                          </p>
                        </div>
                        <div class="flex-1" v-if="step.id == 3">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-country"
                            >Coverage
                            <span class="text-rose-500">*</span></label
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
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.coverage"
                          >
                            {{ errors.coverage }}
                          </p>
                        </div>
                      </div>
                      <!-- 2nd row -->
                      <div
                        class="md:flex space-y-4 md:space-y-0 md:space-x-4"
                        v-if="step.id == 3"
                      >
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-address"
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
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.coverageduration"
                          >
                            Coverage Duration should not be empty
                          </p>
                        </div>
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="startingDate"
                            >Coverage Start Date
                            <span class="text-rose-500">*</span><br
                          /></label>
                          <input
                            type="datetime-local"
                            class="form-input w-full"
                            id="startingDate"
                            name="startingDate"
                            v-model="formData.coverageStartDate"
                          />
                          <p
                            class="text-xs mt-1 text-rose-500"
                            v-if="errors.coveragestartdate"
                          >
                            Date not valid
                          </p>
                        </div>
                      </div>

                      <div
                        class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
                        v-if="hideImageField && step.id == 1"
                      >
                        <div
                          class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2"
                        >
                          <!-- Left side -->
                          <div class="flex items-start space-x-3 md:space-x-4">
                            <div class="w-9 h-9 shrink-0 mt-1">
                              <img
                                class="w-9 h-9 rounded-full"
                                src="@/images/pdf.png"
                                width="36"
                                height="36"
                              />
                            </div>
                            <div>
                              Carte Grise file :
                              <div class="text-sm">{{ caretCrise }}</div>
                            </div>
                          </div>

                          <div
                            class="flex items-center space-x-4 pl-10 md:pl-0"
                          >
                            <button></button>
                          </div>
                        </div>
                      </div>

                      <div
                        class="flex items-center justify-center w-full"
                        v-if="!hideImageField && step.id == 1"
                      >
                        <label for="dropzone-file" class="form-input w-full">
                          <div
                            class="flex flex-col items-center justify-center pt-5 pb-6"
                          >
                            <svg
                              aria-hidden="true"
                              class="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p
                              class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                            >
                              <span class="font-semibold"
                                >Click to upload Carte Grise</span
                              >
                              or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              PDF Format Only
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              REQUIRED
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            required
                            @change="handleFile"
                          />
                        </label>
                      </div>

                      <p
                        class="text-xs mt-1 text-rose-500"
                        v-if="errors.filerequired && step.id == 1"
                      >
                        Carte grise required
                      </p>

                      <div class="text-right" v-if="!quoteCreated">
                        <button
                          type=""
                          v-if="step.id == 2 || step.id == 3"
                          @click.prevent="
                            prevStep({
                              id: step.id - 1,
                              label: 'Information',
                              selectedTab: 'StepTwo',
                            })
                          "
                          class="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
                        >
                          back
                        </button>

                        <button
                          type=""
                          v-if="step.id != 3"
                          @click.prevent="
                            nextStep({
                              id: step.id + 1,
                              label: 'Information',
                              selectedTab: 'StepTwo',
                            })
                          "
                          class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                        >
                          Next step
                        </button>

                        <button
                          @click.prevent="onQuoteCreated"
                          v-if="step.id == 3"
                          class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white mx-5"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <!-- Divider -->
                <hr class="my-6 border-t border-slate-200" />
              </div>
            </div>
          </div>
        </div>

        <ModalBlank
          id="success-modal"
          :modalOpen="quoteCreated"
          v-if="quoteCreated"
        >
          <div class="p-5 flex space-x-4">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100"
            >
              <svg
                class="w-4 h-4 shrink-0 fill-current text-emerald-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
                />
              </svg>
            </div>
            <!-- Content -->
            <div>
              <!-- Modal header -->
              <div class="mb-2">
                <div class="text-lg font-semibold text-slate-800">
                  Quote created successfully
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    Quote created successfully ! Your plans are now ready.
                    Please proceed and select the best option for you.
                  </p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <router-link
                  :to="{ name: 'newcontract', params: { id: quote_id } }"
                >
                  <button
                    class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Choose my plans
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </ModalBlank>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import Banner from "@/components/Banner.vue";
import ModalBlank from "@/components/ModalBlank.vue";
import axios from "axios";
import { licensePlateValidation } from "@/utils/utils-common-function";

export default {
  name: "NewQuote",
  components: {
    Sidebar,
    Header,
    Banner,
    ModalBlank,
  },
  data() {
    return {
      formatIncorrect : false,
      quote_id: null,
      errors: {},
      formData: {
        vehicleType: "Car",
        brand: "",
        model: "",
        horsepower: "",
        licensePlate: "",
        licenseObtainedDate: "",
        annualMileage: "",
        vehicleCirculationDate: "",
        registrationCardHolder: "",
        registrationCardDate: "",
        purchaseMode: "New",
        parkingPostalCode: "",
        insuranceType: "Collision",
        coverage: "Basic",
        coverageDuration: "",
        startingDate: "",
        coverageStartdate: "",
        carteGrise: null,
        licenseplateformat: null,
      },
      error: null,
      selectedSituation: null,
      selectedTab: "StepOne",
      hideImageField: false,
      caretCrise: false,
      quoteCreated: false,
      steps: [
        {
          id: 1,
          label: "Tell us what’s your situation ✨",
          selectedTab: "StepOne",
        },
        {
          id: 2,
          label: "Information",
          selectedTab: "StepTwo",
        },
      ],
      step: {
        id: 1,
        label: "Tell us what’s your situation ✨",
        selectedTab: "StepOne",
      },
      brands: [],
      selectedBrand: null,
      selectedModel: null,
    };
  },
  computed: {
    selectedBrandModels() {
      if (!this.formData.brand) {
        return [];
      }
      const brand = this.brands.find((b) => b.brand === this.formData.brand);
      return brand ? brand.models : [];
    },
  },
  async mounted() {
    const res = await fetch("./car-list.json");
    this.brands = await res.json();
    this.formData.brand = this.brands.length > 0 ? this.brands[0].brand : null;
    this.selectedModel =
      this.formData.brand.length > 0 ? this.formData.brand[0] : null;
  },

  methods: {
    async onQuoteCreated() {
      if (!licensePlateValidation(this.formData.licensePlate)) {
        this.errors["licenseplateformat"] = "license plate format incorrect";
      }

      // Check if startingDate is not empty
      if (this.formData.startingDate !== "") {
        const date = new Date(this.formData.startingDate);
        this.formData.startingDate = date.toISOString();
      }

      if (this.formData.licenseObtainedDate !== "") {
        const date = new Date(this.formData.licenseObtainedDate);
        this.formData.licenseObtainedDate = date.toISOString();
      }

      if (this.formData.registrationCardDate !== "") {
        const date = new Date(this.formData.registrationCardDate);
        this.formData.registrationCardDate = date.toISOString();
      }

      if (this.formData.vehicleCirculationDate !== "") {
        const date = new Date(this.formData.vehicleCirculationDate);
        this.formData.vehicleCirculationDate = date.toISOString();
      }

      if (this.formData.annualMileage !== "") {
        let num = parseFloat(this.formData.annualMileage);
        this.formData.annualMileage = isNaN(num)
          ? this.formData.annualMileage
          : num;
      }

      if (this.formData.coverageDuration !== "") {
        let num = parseFloat(this.formData.coverageDuration);
        this.formData.coverageDuration = isNaN(num)
          ? this.formData.coverageDuration
          : num;
      }

      const token = this.$store.getters["auth/token"];
      try {
        let response = await axios.post(
          `${import.meta.env.VITE_API_URL}/vehicles-with-quotes`,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.quote_id = response.data.quote.id;
        this.errors = {};
        this.quoteCreated = true;
      } catch (error) {
        this.errors = this.mapErrorsToFields(error.response.data.message);
      }
    },
    mapErrorsToFields(errorMessages) {
      let fieldErrors = {};
      errorMessages.forEach((message) => {
        let fieldName = message.split(" ")[0].toLowerCase();
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = message;
        }
      });

      if (this.errors.licenseplateformat)
        fieldErrors["licenseplateformat"] = "Format incorrect";

      if (!this.hideImageField)
        fieldErrors["filerequired"] = "carte Grise required";
      return fieldErrors;
    },
    back(object) {
      this.step = object;
    },
    prevStep(object) {
      this.error = null;
      try {
        if (this.step.id === 1) {
          this.step = object;
        } else {
          this.step = object;
        }
      } catch (error) {
        this.error = error.message || "There is an error !";
      }
    },
    nextStep(object) {
      this.error = null;
      try {
        if (this.step.id === 1) {
          this.step = object;
        } else {
          this.step = object;
        }
      } catch (error) {
        this.error = error.message || "There is an error !";
      }
    },
    handleFile(event) {
      this.file = event.target.files[0];


      if (this.file.type != 'application/pdf') {
        console.log(this.file.type)
        this.formatIncorrect = true
      } else {
        this.formatIncorrect = false
        this.caretCrise = this.file.name;
        this.formData.carteGrise = this.file;
        this.previewSrc = URL.createObjectURL(event.target.files[0]);
        this.hideImageField = true;
        

      }
      
    },
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>
