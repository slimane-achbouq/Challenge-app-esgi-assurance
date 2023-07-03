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
          :open="claimReviewed"
          v-if="claimReviewed"
        >
          Claim reviewed successfully .
        </Banner>

        <Banner
          type="failure"
          class="mb-4"
          :open="generalError"
          v-if="generalError"
        >
          {{ generalError }}
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
                  <i class="fas fa-file-signature"></i> Claim decision ✨
                </h1>
                <p>Please review the information before deciding.</p>
              </header>

              <hr class="my-3 border-t border-slate-200" />

              <div v-if="claim">
                <form>
                  <div class="space-y-3">
                    <h2 class="mt-4 text-xl font-semibold text-slate-800">
                      Claim information
                    </h2>
                    <div class="flex-1">
                      <p>
                        <label class="font-medium mb-1" for="card-state"
                          >Title</label
                        >
                        : {{ claim.title }}
                      </p>
                    </div>

                    <div class="flex-1">
                      <p>
                        <label class="font-medium mb-1" for="card-state"
                          >Reason</label
                        >
                        : {{ claim.reason }}
                      </p>
                    </div>

                    <div class="flex-1">
                      <p>
                        <label class="font-medium mb-1" for="card-state"
                          >Description</label
                        >
                        : {{ claim.description }}
                      </p>
                    </div>

                    <div class="text-slate-400 italic mt-4">
                      <i
                        class="fas fa-download cursor-pointer"
                        @click="downloadFile(claim.proof)"
                      ></i>
                      Download proof
                    </div>

                    <hr />

                    <h2 class="mt-4 text-xl font-semibold text-slate-800">
                      Your decision
                    </h2>

                    <div class="flex-1">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="card-country"
                        >Decision <span class="text-rose-500">*</span></label
                      >
                      <select
                        id="card-country"
                        class="form-select w-full"
                        required
                        v-model="claim.decision"
                      >
                        <optgroup label="Accept claim">
                          <option>Money coverage</option>
                          <option>Car replacement</option>
                          <option>Other</option>
                        </optgroup>
                        <optgroup label=""></optgroup>
                        <optgroup label="Refuse claim">
                          <option>Not enough evidence</option>
                          <option>Other</option>
                        </optgroup>
                      </select>
                      <p class="text-xs mt-1 text-rose-500" v-if="errors">
                        {{ errors.decision }}
                      </p>
                    </div>

                    <div class="flex-1">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="card-state"
                        >Additional information</label
                      >
                      <textarea
                        id="message"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Explain here..."
                        v-model="claim.additionalInfo"
                      ></textarea>
                      <p class="text-xs mt-1 text-rose-500" v-if="errors">
                        {{ errors.additionalInfo }}
                      </p>
                    </div>

                    <div class="space-y-3">
                      <div class="text-right">
                        <button
                          type="submit"
                          class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                          @click.prevent="onReviewedClaim"
                          v-if="!claimReviewed"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Divider -->
              <hr class="my-6 border-t border-slate-200" />
            </div>
          </div>
        </div>

        <ModalBlank
          id="success-modal"
          :modalOpen="claimReviewed"
          v-if="claimReviewed"
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
                  Claim reviewed successfully
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>You gave a decision to the client for his claim</p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap">
                <button
                  class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                >
                  <router-link :to="{ name: 'claims' }">
                    Claims list
                  </router-link>
                </button>
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
import axios from "axios";
import Banner from "@/components/Banner.vue";
import ModalBlank from "@/components/ModalBlank.vue";
import { useStore } from "vuex";

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
      claim: null,
      errors: null,
      generalError: null,
      claimReviewed: false,
    };
  },
  methods: {
    checkStatus(decision) {
      if (decision == "Money coverage" || decision == "Car replacement") {
        return "1";
      } else {
        return "2";
      }
    },

    downloadFile(file) {
      const byteArray = new Uint8Array(file.data);

      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
    },

    async onReviewedClaim() {
      const token = this.$store.getters["auth/token"];
      let response = await axios
        .put(
          `${import.meta.env.VITE_API_URL}/claims/${this.claim._id}`,
          {
            decision: this.claim.decision,
            additionalInfo: this.claim.additionalInfo,
            status: this.checkStatus(this.claim.decision),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          this.claimReviewed = true;
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
    const store = useStore();

    const token = store.getters["auth/token"];
    if (!token) {
      this.$router.push({ name: "home" });
    }

    this.role = store.getters["auth/roles"];
    if (this.role != "Admin") {
      this.$router.push({ name: "claim", params: { id: id } });
    }

    const response = JSON.parse(localStorage.getItem("decide-claim-data")) ?? await axios.get(
      `${import.meta.env.VITE_API_URL}/claims/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      if (!localStorage.getItem("decide-claim-data")) {
        localStorage.setItem("decide-claim-data", JSON.stringify(response));
      }
      this.claim = response.data;
    }

    if (this.claim.status != 0) {
      this.$router.push({ name: "claim", params: { id: id } });
    }
  },
};
</script>
