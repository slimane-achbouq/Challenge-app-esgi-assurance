<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

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
            :open="claimCreated"
            v-if="claimCreated"
        >
          Claim created successfully .
        </Banner>

        <Banner
<<<<<<< HEAD
            type="failure"
            class="mb-4"
            :open="generalError"
            v-if="generalError"
=======
          type="error"
          class="mb-1"
          :open="formatIncorrect"
          v-if="formatIncorrect"
        >
          The format of the file must be PDF.
        </Banner>


        <Banner
          type="failure"
          class="mb-4"
          :open="generalError"
          v-if="generalError"
>>>>>>> develop
        >
          {{ generalError }}
        </Banner>

        <Banner type="success" class="mb-4" :open="true" v-if="ifProof">
          Proof image uploaded successfully.
        </Banner>

        <div class="px-4 sm:px-6 lg:px-8 w-full">
          <!-- Page content -->
          <div class="max-w-5xl mx-auto flex flex-col">
            <!-- Content -->
            <div>
              <div class="mb-3"></div>

              <header class="mb-4">
                <!-- Title -->
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
                  <i class="fas fa-file-signature"></i> Claim Informations ✨
                </h1>
                <p>
                  After creating your claim, the admin will review it before
                  giving a decision.
                </p>
              </header>

              <hr class="my-3 border-t border-slate-200"/>

              <div>
                <form>
                  <div class="space-y-3">
                    <div class="flex-1" v-if="contract">
                      <p>
                        Claim for the contract :
                        <router-link
                            :to="{
                            name: 'contract',
                            params: { id: contract._id },
                          }"
                            class="text-blue-500 hover:underline"
                        >
                          {{ contract.insuranceType }} - [{{ contract._id }}]
                        </router-link>
                      </p>
                    </div>

                    <div class="flex-1">
                      <label
                          class="block text-sm font-medium mb-1"
                          for="card-state"
                      >Title <span class="text-rose-500">*</span></label
                      >
                      <input
                          id="card-state"
                          class="form-input w-full placeholder-slate-300"
                          type="text"
                          v-model="formData.title"
                          placeholder=""
                      />
                      <p class="text-xs mt-1 text-rose-500" v-if="errors">
                        {{ errors.title }}
                      </p>
                    </div>

                    <div class="flex-1">
                      <label
                          class="block text-sm font-medium mb-1"
                          for="card-country"
                      >Reason <span class="text-rose-500">*</span></label
                      >
                      <select
                          id="card-country"
                          class="form-select w-full"
                          required
                          v-model="formData.reason"
                      >
                        <option>Vandalized vehicle</option>
                        <option>Theft</option>
                        <option>Animal accident</option>
                        <option>Material accident</option>
                        <option>Other</option>
                      </select>
                      <p class="text-xs mt-1 text-rose-500" v-if="errors">
                        {{ errors.reason }}
                      </p>
                    </div>

                    <div class="flex-1">
                      <label
                          class="block text-sm font-medium mb-1"
                          for="card-state"
                      >Description <span class="text-rose-500">*</span></label
                      >
                      <textarea
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Explain here..."
                          v-model="formData.description"
                      ></textarea>
                      <p class="text-xs mt-1 text-rose-500" v-if="errors">
                        {{ errors.description }}
                      </p>
                    </div>

                    <div class="space-y-3">
                      <label
                          class="block text-sm font-medium mb-1"
                          for="card-country"
                      >Your proof <span class="text-rose-500">*</span></label
                      >

                      <div
                          class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
                          v-if="hideProof"
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
                              Proof image :
                              <div class="text-sm">
                                {{ formData.proof.name }}
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

                      <div
                          class="flex items-center justify-center w-full"
                          v-if="!hideProof"
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
                              >Click to upload an image</span
                              >
                              or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              This action is required
                            </p>
                          </div>
                          <input
                              id="dropzone-file"
                              type="file"
                              class="hidden"
                              required
                              @change="handleProof"
                          />
                        </label>
                      </div>

                      <p class="text-xs mt-1 text-rose-500" v-if="errors">
                        Proof required
                      </p>

                      <div class="text-right">
                        <button
                            type="submit"
                            class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                            @click.prevent="onCreatedClaim"
                            v-if="!claimCreated"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Divider -->
              <hr class="my-6 border-t border-slate-200"/>
            </div>
          </div>
        </div>

        <ModalBlank
            id="success-modal"
            :modalOpen="claimCreated"
            v-if="claimCreated"
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
                  Claim created successfully
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    The claim has been created successfully.wait until the
                    review by the admin
                  </p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <router-link :to="{ name: 'claims' }">
                  <button
                      class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                  >
                    Claims list
                  </button>
                </router-link>
                <router-link
                    :to="{
                    name: 'contract',
                    params: { id: formData.insurance_id },
                  }"
                >
                  <button
                      class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    My Contract
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
import {ref} from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import axios from "axios";
import Banner from "@/components/Banner.vue";
import ModalBlank from "@/components/ModalBlank.vue";

export default {
  name: "NewClaim",
  components: {
    Sidebar,
    Header,
    Banner,
    ModalBlank,
  },
  data() {
    return {
      contract: null,
      errors: null,
      generalError: null,
      hideProof: null,
      ifProof: false,
      formData: {
        insurance_id: null,
        proof: null,
        reason: null,
        title: null,
        description: null,
        userMail: null,
      },
      claimCreated: false,
      formatIncorrect:false
    };
  },
  methods: {
    handleProof(event) {
      
      this.file = event.target.files[0];

      if (this.file.type != 'image/png') {
        this.formatIncorrect = true
      }

      else {
      this.formatIncorrect = false
      this.formData.proof = this.file;
      this.hideProof = true;
      }
    },
    async onCreatedClaim() {
      const token = this.$store.getters["auth/token"];
      let response = await axios
          .post(`${import.meta.env.VITE_API_URL}/claims`, this.formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.claimCreated = true;
            localStorage.removeItem("claims-list");
          })
          .catch((error) => {
            console.log(error);
            this.generalError = error.response.data.message[0];
          });
    },
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
  async created() {
    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const token = this.$store.getters["auth/token"];
    if (!token) {
      this.$router.push({name: "home"});
    }

    this.formData.userMail = this.$store.getters["auth/email"];

    let response = await axios
        .get(`${import.meta.env.VITE_API_URL}/insurance/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status != 200) {
            this.$router.push({name: "contracts"});
          }
        });

    this.contract = response.data;
    this.formData.insurance_id = id;
  },
};
</script>
