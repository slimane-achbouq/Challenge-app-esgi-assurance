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
          v-if="quoteCreated"
          type="success"
          class="mb-4"
          :open="quoteCreated"
        >
          vehicle edited successfully .
        </Banner>
        <Banner
          v-if="true"
          type="error"
          class="mb-4"
          :open="Object.keys(errors).length !== 0"
        >
          Check the fields you filled.
        </Banner>
        <Banner v-if="caretCrise" type="success" class="mb-4" :open="true">
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
                <header class="mb-6">
                  <!-- Title -->
                  <h1
                    class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"
                  >
                    <i class="fas fa-car"></i> Edit Vehicle informations
                  </h1>
                  <p></p>
                </header>

                <div>
                  <form>
                    <div class="space-y-4">
                      <!-- 1st row -->

                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-country"
                            >Vehicle Type
                            <span class="text-rose-500">*</span></label
                          >
                          <select
                            id="card-country"
                            v-model="formData.vehicleType"
                            class="form-select w-full"
                          >
                            <option>Car</option>
                            <option>Motorcycle</option>
                            <option>Truck</option>
                          </select>
                          <p
                            v-if="errors.vehicletype"
                            class="text-xs mt-1 text-rose-500"
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
                            v-if="errors.brand"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.brand }}
                          </p>
                        </div>
                      </div>
                      <!-- 2nd row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
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
                            v-if="errors.model"
                            class="text-xs mt-1 text-rose-500"
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
                            v-model="formData.horsepower"
                            class="form-input w-full placeholder-slate-300"
                            type="number"
                            placeholder="200"
                          />
                          <p
                            v-if="errors.horsepower"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.horsepower }}
                          </p>
                        </div>
                      </div>
                      <!-- 3rd row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-state"
                            >License Plate
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-state"
                            v-model="formData.licensePlate"
                            class="form-input w-full placeholder-slate-300"
                            type="text"
                            placeholder="AA-11-BB"
                          />
                          <p
                            v-if="errors.licenseplate"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.licenseplate }}
                          </p>
                          <p
                            v-if="errors.licenseplateformat"
                            class="text-xs mt-1 text-rose-500"
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
                            id="startingDate"
                            v-model="formData.licenseObtainedDate"
                            type="datetime-local"
                            class="form-input w-full"
                            name="startingDate"
                          />
                          <p
                            v-if="errors.licenseobtaineddate"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.licenseobtaineddate }}
                          </p>
                        </div>
                      </div>
                      <!-- 4th row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Annual Mileage (KM)
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-name"
                            v-model="formData.annualMileage"
                            class="form-input w-full placeholder-slate-300"
                            type="number"
                            placeholder="70000"
                          />
                          <p
                            v-if="errors.annualmileage"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.annualmileage }}
                          </p>
                        </div>

                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="startingDate"
                            >Vehicle Circulation Date
                            <span class="text-rose-500">*</span><br
                          /></label>
                          <input
                            id="startingDate"
                            v-model="formData.vehicleCirculationDate"
                            type="datetime-local"
                            class="form-input w-full"
                            name="startingDate"
                          />
                          <p
                            v-if="errors.vehiclecirculationdate"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.vehiclecirculationdate }}
                          </p>
                        </div>
                      </div>

                      <!-- 4th row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
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
                            v-model="formData.registrationCardHolder"
                            class="form-input w-full placeholder-slate-300"
                            type="text"
                            placeholder="firstName lastName"
                          />
                          <p
                            v-if="errors.registrationcardholder"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.registrationcardholder }}
                          </p>
                        </div>

                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="startingDate"
                            >Registration Card Date
                            <span class="text-rose-500">*</span><br
                          /></label>
                          <input
                            id="startingDate"
                            v-model="formData.registrationCardDate"
                            type="datetime-local"
                            class="form-input w-full"
                            name="startingDate"
                          />
                          <p
                            v-if="errors.registrationcarddate"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.registrationcarddate }}
                          </p>
                        </div>
                      </div>

                      <!-- 4th row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-country"
                            >Purchase Mode
                            <span class="text-rose-500">*</span></label
                          >
                          <select
                            id="card-country"
                            v-model="formData.purchaseMode"
                            class="form-select w-full"
                          >
                            <option>New</option>
                            <option>Used</option>
                          </select>
                          <p
                            v-if="errors.purchasemode"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.purchasemode }}
                          </p>
                        </div>
                        <div class="flex-1">
                          <label
                            class="block text-sm font-medium mb-1"
                            for="card-name"
                            >Parking Postal Code
                            <span class="text-rose-500">*</span></label
                          >
                          <input
                            id="card-name"
                            v-model="formData.parkingPostalCode"
                            class="form-input w-full placeholder-slate-300"
                            type="text"
                            placeholder="75000"
                          />
                          <p
                            v-if="errors.parkingpostalcode"
                            class="text-xs mt-1 text-rose-500"
                          >
                            {{ errors.parkingpostalcode }}
                          </p>
                        </div>
                      </div>

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
                                class="w-9 h-9 rounded-full"
                                src="@/images/pdf.png"
                                width="36"
                                height="36"
                              />
                            </div>
                            <div>
                              Carte Grise file :
                              <div v-if="caretCrise" class="text-sm">
                                {{ caretCrise }}
                              </div>
                              <div v-if="!caretCrise" class="text-sm">
                                carte-grise.pdf
                              </div>
                            </div>
                          </div>

                          <div
                            class="flex items-center space-x-4 pl-10 md:pl-0"
                          >
                            <button></button>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center justify-center w-full">
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
                                >Click to upload A new Carte Grise</span
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
                        v-if="errors.filerequired && step.id == 1"
                        class="text-xs mt-1 text-rose-500"
                      >
                        Carte grise required
                      </p>

                      <div class="text-right">
                        <button
                          class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                          @click.prevent="onQuoteEdited"
                        >
                          Edit
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
          v-if="quoteCreated"
          id="success-modal"
          :modal-open="quoteCreated"
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
                  Vehicle edited successfully
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    The vehicle has been created successfully.if you want to
                    back to quotes detail click on " Quotes detail "
                  </p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <button
                  class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                >
                  cancele
                </button>
                <router-link class="block" to="/quotes">
                <button
                  class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Quotes list
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
import { useStore } from "vuex";
import { licensePlateValidation } from "@/utils/utils-common-function";

export default {
  name: "EditQuote",
  components: {
    Sidebar,
    Header,
    Banner,
    ModalBlank,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
  data() {
    return {
      errors: {},
      formData: {
        vehicleType: "",
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
        carteGrise: null,
        licenseplateformat: null,
      },
      error: null,
      selectedSituation: null,
      selectedTab: "StepOne",
      hideImageField: false,
      caretCrise: false,
      quoteCreated: false,
      brands: [],
      selectedBrand: null,
      selectedModel: null,
      vehicle: null,
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
    const res = await fetch("/car-list.json");
    this.brands = await res.json();
    this.formData.brand = this.brands.length > 0 ? this.brands[0].brand : null;
    this.selectedModel =
      this.formData.brand.length > 0 ? this.formData.brand[0] : null;

    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const token = this.$store.getters["auth/token"];
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicles/` + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.errors = {};
      this.vehicle = response.data;

      console.log(this.vehicle.model);
      this.formData.vehicleType = this.vehicle.vehicleType;
      this.formData.brand = this.vehicle.brand;
      this.formData.model = this.vehicle.model;
      this.formData.horsepower = this.vehicle.horsepower;
      this.formData.licensePlate = this.vehicle.licensePlate;
      this.formData.licenseObtainedDate =
        this.vehicle.licenseObtainedDate + "T00:00";
      this.formData.annualMileage = this.vehicle.annualMileage;
      this.formData.vehicleCirculationDate =
        this.vehicle.vehicleCirculationDate + "T00:00";
      this.formData.registrationCardHolder =
        this.vehicle.registrationCardHolder;
      this.formData.registrationCardDate =
        this.vehicle.registrationCardDate + "T00:00";
      this.formData.purchaseMode = this.vehicle.purchaseMode;
      this.formData.parkingPostalCode = this.vehicle.parkingPostalCode;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async onQuoteEdited() {
      if (!licensePlateValidation(this.formData.licensePlate)) {
        this.errors["licenseplateformat"] = "license plate format incorrect";
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
        console.log(typeof num);
        this.formData.annualMileage = isNaN(num)
          ? this.formData.annualMileage
          : num;
        console.log(typeof this.formData.annualMileage);
      }

      if (this.formData.coverageDuration !== "") {
        let num = parseFloat(this.formData.coverageDuration);
        this.formData.coverageDuration = isNaN(num)
          ? this.formData.coverageDuration
          : num;
      }

      console.log(this.formData);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcxYzk1MDJkMGZjNDc4NDUwNTZjMjciLCJ1c2VybmFtZSI6Inpha2lAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImlhdCI6MTY4NTc2OTAyMCwiZXhwIjoxNjg1ODA1MDIwfQ.ojCocc5BvZ0MUS_QVAlzKGRi7CahnkKph_ix_hxVN2I";
      try {
        let response = await axios.put(
          "http://localhost:3000/vehicles/" + this.vehicle.id,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.errors = {};
        this.quoteCreated = true;
        this.formData.licenseObtainedDate =
          this.vehicle.licenseObtainedDate + "T00:00";
        this.formData.vehicleCirculationDate =
          this.vehicle.vehicleCirculationDate + "T00:00";
        this.formData.registrationCardDate =
          this.vehicle.registrationCardDate + "T00:00";
      } catch (error) {
        console.log(error);
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
      console.log(fieldErrors);
      if (!this.hideImageField)
        fieldErrors["filerequired"] = "carte Grise required";
      return fieldErrors;
    },
    handleFile(event) {
      this.file = event.target.files[0];
      this.caretCrise = this.file.name;
      this.formData.carteGrise = this.file;
      this.previewSrc = URL.createObjectURL(event.target.files[0]);
      this.hideImageField = true;
    },
  },
};
</script>
